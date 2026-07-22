import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRecord } from './fixtures.ts';
import {
  queueFor,
  validateForQueue,
  summarizeQueue,
  acknowledgeRecord,
  prepareQueueReviewPacket,
} from '../src/stewardship/observation-queues.ts';
import { isRouteAllowed, CANONICAL_HANDOFF_ROUTES } from '../src/stewardship/handoff-routing.ts';
import type { HandoffRecord } from '../src/stewardship/handoff-routing.ts';
import { validateHandoff } from '../src/stewardship/handoff-validation.ts';
import { mayRaiseEscalation, routeEscalation } from '../src/stewardship/escalation-engine.ts';
import type { EscalationRecord } from '../src/stewardship/escalation-engine.ts';
import { validateEscalation } from '../src/stewardship/escalation-validation.ts';
import {
  generateReviewDates,
  nextReviewDate,
  validateReviewEvent,
  REVIEW_CONVENER,
} from '../src/stewardship/review-calendar.ts';
import type { ReviewEvent } from '../src/stewardship/review-calendar.ts';
import { appendEntry, validateLedger, effectiveEntries, EMPTY_LEDGER } from '../src/stewardship/continuity-ledger.ts';
import { traceLineage, findContinuityGaps } from '../src/stewardship/decision-lineage.ts';
import {
  SOPHIA_ADVISORY_NOTICE,
} from '../src/stewardship/sophia-advisory-operations.ts';
import type { SophiaAdvisoryOutput } from '../src/stewardship/sophia-advisory-operations.ts';
import { validateSophiaOutput } from '../src/stewardship/sophia-boundary-validation.ts';
import {
  CURRENT_CANDIDATE_OPERATIONS,
  validateCandidateOperations,
} from '../src/stewardship/candidate-operations-boundary.ts';
import { isTransitionAllowed } from '../src/stewardship/steward-appointment-process.ts';

function makeHandoff(overrides: Partial<HandoffRecord> = {}): HandoffRecord {
  return {
    id: 'HND-ORI-2026-07-22-0001',
    origin: 'orientation',
    destination: 'vocabulary',
    reason: 'unclear, misleading, or unexplained language',
    selfRoutingJustification: null,
    evidenceRefs: ['EVD-ORI-2026-07-22-0001'],
    urgency: 'routine',
    classification: 'restricted-stewardship',
    requestedReview: 'Review the term against the canonical vocabulary and draft options.',
    acknowledgment: 'required-pending',
    acknowledgedByRef: null,
    unresolvedQuestions: [],
    disposition: 'pending',
    humanDecisionRef: null,
    continuityRef: null,
    createdAt: '2026-07-22',
    updatedAt: '2026-07-22',
    ...overrides,
  };
}

function makeEscalation(overrides: Partial<EscalationRecord> = {}): EscalationRecord {
  return {
    id: 'ESC-PRD-2026-07-22-0001',
    category: 'serious',
    originPost: 'product',
    concernsPost: null,
    reviewer: 'institutional',
    state: 'raised',
    evidenceRefs: ['EVD-PRD-2026-07-22-0001'],
    summary: 'A public pathway may misrepresent an environment status.',
    acknowledgment: 'required-pending',
    acknowledgedByRef: null,
    closedByRef: null,
    humanDecisionRef: null,
    continuityRef: null,
    createdAt: '2026-07-22',
    updatedAt: '2026-07-22',
    ...overrides,
  };
}

// ---------- Observation queues ----------

test('queues accept valid records and reject unknown posts', () => {
  const ok = validateForQueue(makeRecord());
  assert.ok(ok.accepted);
  const bad = validateForQueue(
    makeRecord({ receivingAuthority: 'membership' as never }),
  );
  assert.ok(!bad.accepted && bad.errors.some((e) => e.includes('unknown receiving authority') || e.includes('not a post queue')));
});

test('queue selection is per post, oldest first, and excludes closed records', () => {
  const a = makeRecord({ id: 'OBS-ORI-2026-07-20-0001', createdAt: '2026-07-20' });
  const b = makeRecord({ id: 'OBS-ORI-2026-07-21-0001', createdAt: '2026-07-21' });
  const other = makeRecord({ id: 'OBS-PRD-2026-07-19-0001', receivingAuthority: 'product' });
  const queue = queueFor('orientation', [b, a, other]);
  assert.deepEqual(queue.items.map((r) => r.id), [a.id, b.id]);
});

test('queues never auto-close: no code path closes a record; acknowledgment keeps it open', () => {
  const record = makeRecord({ dueDate: '2026-07-01' });
  const acked = acknowledgeRecord(record, 'FST-REF-A', '2026-07-22');
  assert.equal(acked.status, 'acknowledged');
  assert.notEqual(acked.status, 'closed');
  assert.throws(() => acknowledgeRecord(record, 'sophia', '2026-07-22'), /human act/);
});

test('overdue items are surfaced without modifying their decision status', () => {
  const overdue = makeRecord({
    dueDate: '2026-07-01',
    humanDecisionStatus: 'awaiting-human-decision',
    requestedHumanReview: true,
  });
  const queue = queueFor('orientation', [overdue]);
  const summary = summarizeQueue(queue, '2026-07-22');
  assert.equal(summary.overdueCount, 1);
  assert.equal(summary.awaitingHumanDecisionCount, 1);
  const packet = prepareQueueReviewPacket(queue, '2026-07-22');
  assert.equal(packet.overdueItems[0].humanDecisionStatus, 'awaiting-human-decision');
  assert.ok(packet.note.includes('None is a decision'));
});

test('vacant-post queue items remain unresolved; temporary routing resolves nothing by itself', () => {
  const queue = queueFor('vocabulary', [
    makeRecord({ id: 'OBS-VOC-2026-07-22-0001', receivingAuthority: 'vocabulary' }),
  ]);
  const summary = summarizeQueue(queue, '2026-07-22');
  // Coverage is temporarily-routed (SD-2026-07-22-02), so it no longer awaits a decision —
  // but routing is receipt, not resolution: the item stays open awaiting its human.
  assert.equal(summary.coverageAwaitingHumanDecision, false);
  assert.equal(summary.openCount, 1);
});

// ---------- Handoff routing ----------

test('canonical routes are allowed; unknown routes and posts are rejected', () => {
  assert.ok(isRouteAllowed('orientation', 'vocabulary'));
  assert.ok(isRouteAllowed('orientation', 'product'));
  assert.ok(isRouteAllowed('product', 'orientation'));
  assert.ok(isRouteAllowed('product', 'vocabulary'));
  assert.ok(isRouteAllowed('vocabulary', 'continuity'), 'any post → continuity');
  assert.ok(isRouteAllowed('orientation', 'institutional'), 'any post → institutional');
  assert.ok(isRouteAllowed('institutional', 'founding-steward'));
  assert.ok(!isRouteAllowed('membership' as never, 'vocabulary'));
  assert.equal(CANONICAL_HANDOFF_ROUTES.length, 9);
});

test('handoff validation rejects unknown destination, SOPHIA, and undocumented self-routing', () => {
  const unknown = validateHandoff(makeHandoff({ destination: 'membership' as never }));
  assert.ok(unknown.some((e) => e.includes('unknown destination')));
  const sophia = validateHandoff(makeHandoff({ destination: 'sophia' as never }));
  assert.ok(sophia.some((e) => e.includes('SOPHIA can never be a handoff destination')));
  const self = validateHandoff(makeHandoff({ destination: 'orientation' }));
  assert.ok(self.some((e) => e.includes('self-routing requires a documented reason')));
  const documentedSelf = validateHandoff(
    makeHandoff({ destination: 'orientation', selfRoutingJustification: 'splitting one observation into two tracked reviews' }),
  );
  assert.deepEqual(documentedSelf, []);
});

test('handoffs cannot close without human acknowledgment, and recommendations stay recommendations', () => {
  const closed = validateHandoff(makeHandoff({ disposition: 'closed-by-human' }));
  assert.ok(closed.some((e) => e.includes('cannot close without human acknowledgment')));
  const converted = validateHandoff(
    makeHandoff({ disposition: 'recommendation-drafted', humanDecisionRef: 'HDR-FST-2026-07-22-0001' }),
  );
  assert.ok(converted.some((e) => e.includes('a recommendation is not a decision')));
  const decisionLanguage = validateHandoff(
    makeHandoff({ requestedReview: 'This handoff is approved and ratified.' }),
  );
  assert.ok(decisionLanguage.some((e) => e.includes('never announce decisions')));
});

test('private records never travel through public handoff surfaces', () => {
  const errors = validateHandoff(
    makeHandoff({ classification: 'private-candidate-or-participant' }),
  );
  assert.ok(errors.some((e) => e.includes('privacy-safe pointer')));
});

// ---------- Escalation ----------

test('urgent safety escalation is always allowed from every post', () => {
  for (const post of ['orientation', 'continuity', 'vocabulary', 'product', 'institutional'] as const) {
    const result = mayRaiseEscalation(post, 'urgent-safety');
    assert.ok(result.allowed, post);
    assert.ok(result.note.includes('never prevents raising an alarm'));
  }
});

test('serious escalations cannot auto-close and origin posts cannot close their own', () => {
  const autoClosed = validateEscalation(
    makeEscalation({ state: 'closed-by-human', closedByRef: null }),
  );
  assert.ok(autoClosed.some((e) => e.includes('never auto-close')));
  const selfClosed = validateEscalation(
    makeEscalation({
      state: 'closed-by-human',
      acknowledgment: 'acknowledged-by-human',
      acknowledgedByRef: 'FST-REF-A',
      closedByRef: 'product-steward-ref',
      humanDecisionRef: 'HDR-FST-2026-07-22-0001',
    }),
  );
  assert.ok(selfClosed.some((e) => e.includes('cannot unilaterally close its own serious escalation')));
  const sophiaClosed = validateEscalation(
    makeEscalation({
      state: 'closed-by-human',
      acknowledgment: 'acknowledged-by-human',
      acknowledgedByRef: 'FST-REF-A',
      closedByRef: 'sophia',
      humanDecisionRef: 'HDR-FST-2026-07-22-0001',
    }),
  );
  assert.ok(sophiaClosed.some((e) => e.includes('SOPHIA cannot close an escalation')));
});

test('a concern about the Institutional Steward requires independent human review', () => {
  const routing = routeEscalation('authority-conflict', 'orientation', 'institutional');
  assert.equal(routing.reviewer, 'independent-human-review-required');
  const record = makeEscalation({
    id: 'ESC-ORI-2026-07-22-0002',
    category: 'authority-conflict',
    originPost: 'orientation',
    concernsPost: 'institutional',
    reviewer: 'independent-human-review-required',
    state: 'independent-human-review-required',
  });
  assert.deepEqual(validateEscalation(record), []);
  const absorbed = validateEscalation({ ...record, reviewer: 'institutional', state: 'under-human-review' });
  assert.ok(absorbed.some((e) => e.includes('contradicts canonical routing')));
});

test('constitutional matters route to the founding steward', () => {
  assert.equal(routeEscalation('constitutional', 'vocabulary').reviewer, 'founding-steward');
});

// ---------- Review calendar ----------

test('review cadence calculations are deterministic and correct', () => {
  assert.deepEqual(generateReviewDates('weekly-observation', '2026-07-27', 3), [
    '2026-07-27',
    '2026-08-03',
    '2026-08-10',
  ]);
  assert.deepEqual(generateReviewDates('monthly-cross-post-continuity', '2026-01-31', 3), [
    '2026-01-31',
    '2026-02-28',
    '2026-03-31',
  ]);
  assert.deepEqual(generateReviewDates('quarterly-authority', '2026-07-22', 2), [
    '2026-07-22',
    '2026-10-22',
  ]);
  assert.equal(nextReviewDate('weekly-observation', '2026-07-27', '2026-08-03'), '2026-08-10');
});

test('a review event never certifies continuity and conveners follow Charter §10', () => {
  const event: ReviewEvent = {
    id: 'REV-CON-2026-07-27-0001',
    type: 'weekly-observation',
    scheduledDate: '2026-07-27',
    convener: REVIEW_CONVENER['weekly-observation'],
    convenerState: 'vacant-post-awaiting-human-decision',
    requiredRecords: [],
    participatingPosts: ['continuity'],
    carryforwardRecordIds: [],
    conflictAndRecusalDeclarations: [],
    evidenceReviewedRefs: ['EVD-CON-2026-07-27-0001'],
    recommendationRecordIds: [],
    adoptedDecisionRefs: [],
    nextReviewDate: '2026-08-03',
    certifiesContinuity: false,
    status: 'held',
  };
  assert.deepEqual(validateReviewEvent(event), []);
  const certifying = { ...event, certifiesContinuity: true as never };
  assert.ok(validateReviewEvent(certifying).some((e) => e.includes('not proof of continuity')));
  const wrongConvener = { ...event, convener: 'product' as const };
  assert.ok(validateReviewEvent(wrongConvener).some((e) => e.includes('Charter §10')));
});

// ---------- Continuity ledger and lineage ----------

test('the continuity ledger is append-only with correction-by-supersession', () => {
  const first = appendEntry(EMPTY_LEDGER, {
    kind: 'observation-lineage',
    recordedAt: '2026-07-22',
    originatingPost: 'orientation',
    summary: 'Preserved lineage of the first orientation observation.',
    refs: ['OBS-ORI-2026-07-22-0001'],
    supersedesSequence: null,
  });
  assert.ok(first.ok);
  const second = appendEntry(first.ledger, {
    kind: 'correction',
    recordedAt: '2026-07-23',
    originatingPost: 'orientation',
    summary: 'Corrects the record reference of sequence 1.',
    refs: ['OBS-ORI-2026-07-22-0002'],
    supersedesSequence: 1,
  });
  assert.ok(second.ok);
  assert.deepEqual(validateLedger(second.ledger), []);
  // The original entry still exists, unrewritten.
  assert.equal(second.ledger[0].refs[0], 'OBS-ORI-2026-07-22-0001');
  assert.equal(effectiveEntries(second.ledger).length, 1);
  // Non-corrections may not supersede; corrections must name a real sequence.
  const bad = appendEntry(second.ledger, {
    kind: 'review-history',
    recordedAt: '2026-07-24',
    originatingPost: 'continuity',
    summary: 'Attempts to supersede without being a correction.',
    refs: [],
    supersedesSequence: 1,
  });
  assert.ok(!bad.ok && bad.errors.some((e) => e.includes('only corrections')));
  const renumbered = validateLedger([second.ledger[1], second.ledger[0]]);
  assert.ok(renumbered.some((e) => e.includes('never renumbered') || e.includes('strictly increase')));
});

test('decision lineage traces ancestry and flags records awaiting human decisions', () => {
  const evidence = makeRecord({ id: 'OBS-ORI-2026-07-22-0011' });
  const finding = makeRecord({
    id: 'FND-ORI-2026-07-22-0001',
    kind: 'finding',
    relatedRecordIds: [evidence.id],
    humanDecisionStatus: 'human-decision-recorded',
    humanDecisionRef: 'HDR-FST-2026-07-22-0001',
    actionStatus: 'human-authorized-action-referenced',
  });
  const ledgerResult = appendEntry(EMPTY_LEDGER, {
    kind: 'decision-reference',
    recordedAt: '2026-07-22',
    originatingPost: 'orientation',
    summary: 'Preserves the finding decision lineage.',
    refs: [finding.id, 'HDR-FST-2026-07-22-0001'],
    supersedesSequence: null,
  });
  assert.ok(ledgerResult.ok);
  const trace = traceLineage(finding.id, [evidence, finding], ledgerResult.ledger);
  assert.deepEqual(trace.ancestry, [evidence.id]);
  assert.deepEqual(trace.humanDecisionRefs, ['HDR-FST-2026-07-22-0001']);
  assert.equal(trace.awaitingHumanDecision, false);
  const orphanTrace = traceLineage(evidence.id, [evidence], EMPTY_LEDGER);
  assert.equal(orphanTrace.awaitingHumanDecision, true);
  const gaps = findContinuityGaps([finding], EMPTY_LEDGER);
  assert.ok(gaps[0].gaps.includes('not preserved in the continuity ledger'));
});

// ---------- SOPHIA bounds ----------

function makeSophiaOutput(overrides: Partial<SophiaAdvisoryOutput> = {}): SophiaAdvisoryOutput {
  return {
    id: 'REC-SOA-2026-07-22-0001',
    kind: 'draft-recommendation',
    createdAt: '2026-07-22',
    observedEvidence: 'Two pages describe the same environment with different status labels.',
    detectedPattern: 'Status labels drift when pages are edited separately.',
    uncertainty: 'Whether either label matches the canonical vocabulary.',
    advisoryInterpretation: 'The vocabulary post may wish to review both labels.',
    recommendationOptions: ['Prepare a vocabulary review packet.', 'Request information from the page editors.'],
    recommendedHumanReview: 'Vocabulary post review at the next weekly observation review.',
    humanDecisionStatus: 'awaiting-human-review',
    requiredNotice: SOPHIA_ADVISORY_NOTICE,
    ...overrides,
  };
}

test('valid SOPHIA advisory output passes; the required notice must be verbatim', () => {
  assert.deepEqual(validateSophiaOutput(makeSophiaOutput()), []);
  const altered = validateSophiaOutput(
    makeSophiaOutput({ requiredNotice: 'SOPHIA output needs review.' }),
  );
  assert.ok(altered.some((e) => e.includes('verbatim')));
});

test('SOPHIA output claiming authority is rejected, claim by claim', () => {
  const claims: [string, Partial<SophiaAdvisoryOutput>][] = [
    ['approval', { advisoryInterpretation: 'This change is approved.' }],
    ['ratification', { advisoryInterpretation: 'Consider this ratified.' }],
    ['appointment', { recommendationOptions: ['SOPHIA appoints the candidate.'] }],
    ['final determination', { advisoryInterpretation: 'This is the final determination.' }],
    ['certification', { advisoryInterpretation: 'Continuity is hereby certified.' }],
    ['escalation closure', { advisoryInterpretation: 'The escalation is closed.' }],
    ['deployment authorization', { advisoryInterpretation: 'Deployment is authorized.' }],
    ['publication authorization', { advisoryInterpretation: 'Publication is authorized.' }],
    ['adopted decision', { advisoryInterpretation: 'Treat this as an adopted decision.' }],
  ];
  for (const [act, overrides] of claims) {
    const errors = validateSophiaOutput(makeSophiaOutput(overrides));
    assert.ok(errors.length > 0, `claim of ${act} must be rejected`);
  }
});

// ---------- Candidate operations boundary ----------

test('current candidate operations: all vacant, all refs null, no access granted, all valid', () => {
  assert.equal(CURRENT_CANDIDATE_OPERATIONS.length, 5);
  for (const shell of CURRENT_CANDIDATE_OPERATIONS) {
    assert.equal(shell.candidacy.state, 'vacant', shell.post);
    assert.equal(shell.privateCandidateRef, null, shell.post);
    assert.equal(shell.accessGrantState, 'no-access-granted', shell.post);
    assert.deepEqual(validateCandidateOperations(shell), [], shell.post);
  }
});

test('the ratified state machine is reused, not forked: transitions still govern', () => {
  assert.ok(isTransitionAllowed('vacant', 'nomination-received'));
  assert.ok(!isTransitionAllowed('vacant', 'appointed-observation-only'));
  assert.ok(!isTransitionAllowed('orientation-complete', 'appointed-observation-only'));
});

test('no automatic access grant: access before appointment is rejected', () => {
  const shell = {
    ...CURRENT_CANDIDATE_OPERATIONS[0],
    accessGrantState: 'human-granted-access-recorded' as const,
  };
  const errors = validateCandidateOperations(shell);
  assert.ok(errors.some((e) => e.includes('never automatically') || e.includes('only after appointment')));
});
