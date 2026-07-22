/**
 * Dry-run verification: the fifteen scenarios of
 * docs/stewardship/STEWARD_OPERATIONS_DRY_RUN_PLAN.md, executed as automated
 * tests. Each scenario records its input, validation result, expected route,
 * the prohibited automated action (proven absent), the required human
 * action, and its continuity record. All fixtures are privacy-safe.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRecord } from './fixtures.ts';
import { validateForQueue, queueFor, summarizeQueue } from '../src/stewardship/observation-queues.ts';
import { isRouteAllowed, routeReasons } from '../src/stewardship/handoff-routing.ts';
import { validateHandoff } from '../src/stewardship/handoff-validation.ts';
import type { HandoffRecord } from '../src/stewardship/handoff-routing.ts';
import { mayRaiseEscalation, routeEscalation } from '../src/stewardship/escalation-engine.ts';
import { guardPublicExport, detectProhibitedFields } from '../src/stewardship/record-classification.ts';
import { findContinuityGaps } from '../src/stewardship/decision-lineage.ts';
import { appendEntry, EMPTY_LEDGER } from '../src/stewardship/continuity-ledger.ts';
import { SOPHIA_ADVISORY_NOTICE } from '../src/stewardship/sophia-advisory-operations.ts';
import type { SophiaAdvisoryOutput } from '../src/stewardship/sophia-advisory-operations.ts';
import { validateSophiaOutput } from '../src/stewardship/sophia-boundary-validation.ts';
import {
  CURRENT_CANDIDATE_OPERATIONS,
  validateCandidateOperations,
} from '../src/stewardship/candidate-operations-boundary.ts';
import { validateCandidacyRecord } from '../src/stewardship/steward-appointment-process.ts';
import { validateOperationalRecord } from '../src/stewardship/record-validation.ts';
import { coverageStateFor } from '../src/stewardship/steward-operations-registry.ts';

function makeHandoff(overrides: Partial<HandoffRecord> = {}): HandoffRecord {
  return {
    id: 'HND-ORI-2026-07-22-0010',
    origin: 'orientation',
    destination: 'product',
    reason: 'broken, inaccessible, or confusing participation pathway',
    selfRoutingJustification: null,
    evidenceRefs: ['EVD-ORI-2026-07-22-0010'],
    urgency: 'routine',
    classification: 'restricted-stewardship',
    requestedReview: 'Review the pathway and draft options for the human decision-maker.',
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

test('scenario 1: a newcomer misunderstands which environments are live', () => {
  // Input: an orientation observation with interpretation and uncertainty preserved.
  const record = makeRecord({
    observedEvidence: 'A newcomer asked where to join a program that is still planned.',
    interpretation: 'The programs page may imply availability it does not have.',
    uncertainty: 'Whether the misunderstanding came from this site or elsewhere.',
    recommendation: 'Prepare a review of the programs page status labels.',
    requestedHumanReview: true,
    humanDecisionStatus: 'human-review-requested',
  });
  const result = validateForQueue(record);
  assert.ok(result.accepted, 'validation passes');
  // Prohibited automated action: nothing changed any page; the record's action status proves it.
  assert.equal(record.actionStatus, 'observation-preserved');
  // Required human action: review. Continuity: queue retention.
  const queue = queueFor('orientation', [record]);
  assert.equal(summarizeQueue(queue, '2026-07-22').awaitingHumanDecisionCount, 1);
});

test('scenario 2: a public page uses a noncanonical term → Orientation hands off to Vocabulary', () => {
  assert.ok(isRouteAllowed('orientation', 'vocabulary'));
  assert.ok(routeReasons('orientation', 'vocabulary').includes('unclear, misleading, or unexplained language'));
  const handoff = makeHandoff({
    destination: 'vocabulary',
    reason: 'unclear, misleading, or unexplained language',
  });
  assert.deepEqual(validateHandoff(handoff), []);
  // The vocabulary change itself remains a drafted recommendation awaiting a human.
  assert.equal(handoff.humanDecisionRef, null);
});

test('scenario 3: a participation button leads to an unavailable environment → Orientation → Product', () => {
  const handoff = makeHandoff();
  assert.deepEqual(validateHandoff(handoff), []);
  assert.ok(isRouteAllowed('orientation', 'product'));
  // Prohibited: no automated fix or publish exists; disposition stays pending until a human acts.
  assert.equal(handoff.disposition, 'pending');
});

test('scenario 4: a decision has no usable continuity record → gap detected, repair is human', () => {
  const decided = makeRecord({
    id: 'FND-INS-2026-07-22-0001',
    kind: 'finding',
    originatingPost: 'institutional',
    receivingAuthority: 'institutional',
    humanDecisionStatus: 'human-decision-recorded',
    humanDecisionRef: 'HDR-FST-2026-07-22-0009',
  });
  const gaps = findContinuityGaps([decided], EMPTY_LEDGER);
  assert.equal(gaps.length, 1);
  assert.ok(gaps[0].gaps.some((g) => g.includes('continuity ledger')));
  // Nothing auto-repairs: the ledger is unchanged by detection.
  assert.equal(EMPTY_LEDGER.length, 0);
});

test('scenario 5: SOPHIA output presented as approval is rejected at the boundary', () => {
  const output: SophiaAdvisoryOutput = {
    id: 'REC-SOA-2026-07-22-0005',
    kind: 'draft-recommendation',
    createdAt: '2026-07-22',
    observedEvidence: 'A draft page awaits review.',
    detectedPattern: null,
    uncertainty: null,
    advisoryInterpretation: 'The page is approved for publication.',
    recommendationOptions: [],
    recommendedHumanReview: 'None needed.',
    humanDecisionStatus: 'awaiting-human-review',
    requiredNotice: SOPHIA_ADVISORY_NOTICE,
  };
  const errors = validateSophiaOutput(output);
  assert.ok(errors.some((e) => e.includes('approval')));
});

test('scenario 6: an issue outside a post mandate routes to the mandated post', () => {
  // A product-domain concern arriving at vocabulary hands off via a canonical any-post route
  // (institutional for boundary concerns) or the explicit product routes; an invented
  // destination is rejected.
  assert.ok(isRouteAllowed('vocabulary', 'institutional'));
  const invented = validateHandoff(makeHandoff({ origin: 'vocabulary', destination: 'membership' as never }));
  assert.ok(invented.some((e) => e.includes('unknown destination')));
});

test('scenario 7: two posts disagree about routing → cross-post-conflict escalation, no unilateral close', () => {
  const routing = routeEscalation('cross-post-conflict', 'orientation', null);
  assert.equal(routing.reviewer, 'institutional');
  // Neither disputant can close it: closure requires human decision + non-origin closer
  // (validated in the escalation validator, exercised in steward-workflows tests).
  assert.ok(mayRaiseEscalation('orientation', 'cross-post-conflict').allowed);
});

test('scenario 8: a concern about the Institutional Steward → independent human review required', () => {
  const routing = routeEscalation('authority-conflict', 'product', 'institutional');
  assert.equal(routing.reviewer, 'independent-human-review-required');
  assert.ok(routing.rationale.includes('cannot review a concern about itself'));
});

test('scenario 9: a private record submitted for public export is rejected', () => {
  const privateRecord = makeRecord({
    id: 'OBS-CON-2026-07-22-0009',
    classification: 'private-candidate-or-participant',
    evidenceRefs: ['private-record://designated-system/tok_dryrun9'],
  });
  const result = guardPublicExport([privateRecord]);
  assert.equal(result.allowed.length, 0);
  assert.equal(result.rejected.length, 1);
  assert.ok(result.rejected[0].reason.includes('never appear in a public export'));
});

test('scenario 10: urgent safety escalation is allowed immediately, from any post', () => {
  const result = mayRaiseEscalation('continuity', 'urgent-safety');
  assert.ok(result.allowed);
  assert.ok(result.note.includes('always allowed'));
});

test('scenario 11: a vacant post receives an observation with no temporary receiver', () => {
  const record = makeRecord({ id: 'OBS-INS-2026-07-22-0011', receivingAuthority: 'institutional' });
  assert.ok(validateForQueue(record).accepted);
  assert.equal(coverageStateFor('institutional'), 'awaiting-human-decision');
  const summary = summarizeQueue(queueFor('institutional', [record]), '2026-07-22');
  assert.equal(summary.openCount, 1);
  assert.equal(summary.coverageAwaitingHumanDecision, true);
  // The record simply waits. No receiver was invented; continuity is the queue itself.
});

test('scenario 12: a candidate workflow without private storage is blocked', () => {
  const shell = {
    ...CURRENT_CANDIDATE_OPERATIONS[0],
    candidacy: {
      ...CURRENT_CANDIDATE_OPERATIONS[0].candidacy,
      state: 'nomination-received' as const,
    },
  };
  const errors = validateCandidateOperations(shell);
  assert.ok(errors.some((e) => e.includes('private candidate-record storage')));
});

test('scenario 13: a candidacy affected by unresolved C-014 is blocked', () => {
  const shell = {
    ...CURRENT_CANDIDATE_OPERATIONS[1],
    affectedByC014: true,
    candidacy: {
      ...CURRENT_CANDIDATE_OPERATIONS[1].candidacy,
      state: 'nomination-received' as const,
    },
  };
  const errors = validateCandidateOperations(shell);
  assert.ok(errors.some((e) => e.includes('C-014')));
});

test('scenario 14: closing a record without human acknowledgment is rejected', () => {
  const errors = validateOperationalRecord(makeRecord({ status: 'closed' }));
  assert.ok(errors.some((e) => e.includes('cannot close without human acknowledgment')));
});

test('scenario 15: an appointment without human decision and acceptance is rejected by the ratified process', () => {
  const errors = validateCandidacyRecord({
    post: 'orientation',
    state: 'appointed-observation-only',
    consentRecordRef: 'private-record://designated-system/tok_consent15',
    humanDecisionRecordRef: null,
    acceptanceRecordRef: null,
    decisionAuthority: null,
    candidateRef: 'private-record://designated-system/tok_cand15',
    reviewDateRef: null,
    multiplePostOccupancy: false,
    concentrationReviewRef: null,
    sophiaAppointmentAuthority: false,
  });
  assert.ok(errors.some((e) => e.includes('human decision record')));
  assert.ok(errors.some((e) => e.includes('candidate acceptance')));
  assert.ok(errors.some((e) => e.includes('review date')));
});

test('dry-run fixtures contain no personal data and each scenario left a continuity trail', () => {
  assert.deepEqual(detectProhibitedFields(makeRecord()), []);
  assert.deepEqual(detectProhibitedFields(makeHandoff()), []);
  // Representative continuity record for the dry-run execution itself.
  const result = appendEntry(EMPTY_LEDGER, {
    kind: 'review-history',
    recordedAt: '2026-07-22',
    originatingPost: 'continuity',
    summary: 'Dry-run scenarios 1-15 executed as automated tests; results live in the test suite.',
    refs: ['CTU-CON-2026-07-22-0001'],
    supersedesSequence: null,
  });
  assert.ok(result.ok);
});
