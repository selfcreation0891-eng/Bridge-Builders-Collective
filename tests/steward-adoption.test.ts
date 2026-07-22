/**
 * Adoption and receiver-of-record boundary verification.
 * Decisions under test: SD-2026-07-22-01 (infrastructure adoption) and
 * SD-2026-07-22-02 (temporary vacancy coverage — receiver of record).
 *
 * Negative tests deliberately construct prohibited states (receiver treated
 * as occupant, SOPHIA as receiver, self-conflict closure) as REJECTED INPUTS
 * and prove the validators refuse them.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  INFRASTRUCTURE_STATUS,
  INFRASTRUCTURE_ADOPTION_DECISION_REF,
  STEWARD_OPERATIONS_REGISTRY,
  getOperationsEntry,
  validateOperationsRegistry,
} from '../src/stewardship/steward-operations-registry.ts';
import {
  CURRENT_VACANCY_COVERAGE,
  VACANCY_ROUTED_MATTER_REVIEW_CADENCE,
  receiverSelfConflict,
  validateVacancyCoverage,
} from '../src/stewardship/vacancy-coverage.ts';
import { STEWARD_POST_IDS } from '../src/stewardship/steward-posts.ts';
import { routeEscalation, mayRaiseEscalation } from '../src/stewardship/escalation-engine.ts';
import type { EscalationRecord } from '../src/stewardship/escalation-engine.ts';
import { validateEscalation } from '../src/stewardship/escalation-validation.ts';
import { queueFor, summarizeQueue, validateForQueue } from '../src/stewardship/observation-queues.ts';
import { isOverdue } from '../src/stewardship/record-validation.ts';
import {
  CURRENT_CANDIDATE_OPERATIONS,
  validateCandidateOperations,
  C014_STATUS,
} from '../src/stewardship/candidate-operations-boundary.ts';
import { privateStorageStatus } from '../src/stewardship/private-record-boundary.ts';
import { renderStewardshipOperationsPages, OPERATIONS_PATH } from '../src/site/stewardship-pages.ts';
import { makeRecord } from './fixtures.ts';

const RECEIVER_REF = 'founding-steward:maurice-jackson';
const COVERAGE_DECISION = 'SD-2026-07-22-02';

// ---------- Adoption (SD-2026-07-22-01) ----------

test('operational infrastructure is adopted and active, by recorded human decision', () => {
  assert.equal(INFRASTRUCTURE_STATUS, 'adopted-active');
  assert.equal(INFRASTRUCTURE_ADOPTION_DECISION_REF, 'SD-2026-07-22-01');
});

test('both decision records exist on disk with adopted status and required confirmations', async () => {
  const d1 = await readFile(
    new URL(
      '../docs/stewardship/decisions/SD-2026-07-22-01-permanent-steward-operational-infrastructure-v1.md',
      import.meta.url,
    ),
    'utf8',
  );
  assert.match(d1, /Status: ADOPTED/);
  assert.match(d1, /No appointment is made by this\s+decision/);
  assert.match(d1, /No access is granted by this\s+decision/);
  assert.match(d1, /No authority is expanded by this\s+decision/);
  const d2 = await readFile(
    new URL(
      '../docs/stewardship/decisions/SD-2026-07-22-02-vacancy-coverage-receiver-of-record.md',
      import.meta.url,
    ),
    'utf8',
  );
  assert.match(d2, /Status: ADOPTED/);
  assert.match(d2, /does not appoint Maurice Jackson to any Permanent Steward Post/);
  assert.match(d2, /independent-human-review-required/);
});

test('adoption changed nothing about the posts: five, vacant, human-only, observation-only', () => {
  assert.equal(STEWARD_OPERATIONS_REGISTRY.length, 5);
  for (const entry of STEWARD_OPERATIONS_REGISTRY) {
    assert.equal(entry.occupancyState, 'vacant', entry.postId);
    assert.equal(entry.humanOnly, true, entry.postId);
    assert.equal(entry.operatingMode, 'observation-only', entry.postId);
    assert.equal(entry.currentOccupantRef, null, entry.postId);
    assert.equal(entry.authorityExpansion, 'none', entry.postId);
    assert.equal(entry.currentAuthorityScope, 'observation-only', entry.postId);
  }
  assert.deepEqual(validateOperationsRegistry(STEWARD_OPERATIONS_REGISTRY), []);
});

// ---------- Receiver of record (SD-2026-07-22-02) ----------

test('all five posts have temporary vacancy routing to the founding steward as receiver of record', () => {
  for (const id of STEWARD_POST_IDS) {
    const coverage = getOperationsEntry(id).vacancyCoverage;
    assert.equal(coverage.state, 'temporarily-routed', id);
    assert.equal(coverage.temporaryReceiverRef, RECEIVER_REF, id);
    assert.equal(coverage.humanDecisionRef, COVERAGE_DECISION, id);
  }
});

test('Maurice Jackson is receiver of record, not occupant — occupancy stays vacant with null occupant', () => {
  for (const entry of STEWARD_OPERATIONS_REGISTRY) {
    assert.equal(entry.vacancyCoverage.temporaryReceiverRef, RECEIVER_REF, entry.postId);
    assert.equal(entry.occupancyState, 'vacant', entry.postId);
    assert.equal(entry.currentOccupantRef, null, entry.postId);
  }
});

test('negative: treating the receiver as occupant is rejected by registry validation', () => {
  const forged = {
    ...getOperationsEntry('orientation'),
    occupancyState: 'occupied' as const,
    currentOccupantRef: RECEIVER_REF,
  };
  // REJECTED INPUT: the receiver reference is not an appointment record; occupancy
  // requires a recorded appointment. The forged entry also contradicts vacancy truth.
  const errors = validateOperationsRegistry([
    forged,
    ...STEWARD_OPERATIONS_REGISTRY.filter((e) => e.postId !== 'orientation'),
  ]);
  assert.ok(errors.length > 0, 'forged occupancy must not validate cleanly');
});

test('negative: receiver-of-record status grants no post authority — scope is routing verbs only', () => {
  const authorityVerbs = ['approve', 'reject', 'publish', 'merge', 'deploy', 'certify', 'appoint', 'remove', 'close-serious-escalation', 'determine-eligibility'];
  for (const coverage of CURRENT_VACANCY_COVERAGE) {
    for (const verb of authorityVerbs) {
      assert.ok(
        !coverage.scopeBoundaries.some((s) => s === verb || s.startsWith(`${verb}-`)),
        `${coverage.post}: scope must not contain authority verb "${verb}"`,
      );
    }
    assert.ok(coverage.scopeBoundaries.includes('receive'));
    assert.ok(coverage.scopeBoundaries.includes('preserve'));
  }
});

test('negative: SOPHIA as receiver is rejected', () => {
  const errors = validateVacancyCoverage({
    ...CURRENT_VACANCY_COVERAGE[0],
    temporaryReceiverRef: 'sophia-advisory',
  });
  assert.ok(errors.some((e) => e.includes('SOPHIA may never be a temporary receiver')));
});

test('vacancy coverage can end only by human decision or appointment — states require decision refs', () => {
  // Ending states demand the causing human decision reference.
  for (const state of ['suspended', 'ended-by-appointment'] as const) {
    const errors = validateVacancyCoverage({
      ...CURRENT_VACANCY_COVERAGE[0],
      state,
      temporaryReceiverRef: null,
      humanDecisionRef: null,
      scopeBoundaries: [],
    });
    assert.ok(
      errors.some((e) => e.includes('recorded human decision')),
      `${state} without a decision reference must be invalid`,
    );
  }
});

test('appointment to one post ends routing for that post only; the others keep routing', () => {
  // Model the future: continuity appointed, its routing ended by that appointment.
  const afterOneAppointment = CURRENT_VACANCY_COVERAGE.map((c) =>
    c.post === 'continuity'
      ? {
          ...c,
          state: 'ended-by-appointment' as const,
          temporaryReceiverRef: null,
          humanDecisionRef: 'SD-FUTURE-APPOINTMENT-REF',
        }
      : c,
  );
  for (const c of afterOneAppointment) assert.deepEqual(validateVacancyCoverage(c), [], c.post);
  const stillRouted = afterOneAppointment.filter((c) => c.state === 'temporarily-routed');
  assert.equal(stillRouted.length, 4);
  assert.ok(afterOneAppointment.every((c) => c.terminatesUponAppointment === true));
});

// ---------- Weekly review cadence ----------

test('weekly review cadence is represented; a missed review changes no decision status', () => {
  assert.equal(VACANCY_ROUTED_MATTER_REVIEW_CADENCE, 'weekly');
  const routed = makeRecord({
    id: 'OBS-VOC-2026-07-01-0001',
    receivingAuthority: 'vocabulary',
    createdAt: '2026-07-01',
    updatedAt: '2026-07-01',
    dueDate: '2026-07-08', // one week; the review did not happen
    humanDecisionStatus: 'awaiting-human-decision',
    requestedHumanReview: true,
  });
  assert.ok(validateForQueue(routed).accepted);
  assert.ok(isOverdue(routed, '2026-07-22'));
  const summary = summarizeQueue(queueFor('vocabulary', [routed]), '2026-07-22');
  assert.equal(summary.overdueCount, 1);
  // Overdue is display truth only: still open, still awaiting its human.
  assert.equal(routed.status, 'open');
  assert.equal(routed.humanDecisionStatus, 'awaiting-human-decision');
});

// ---------- Independent review safeguard (Phase 6 scenario) ----------

test('a concern about the receiver of record enters independent-human-review-required', () => {
  // 1. A concern about Maurice Jackson (founding steward, receiver of record) is
  //    submitted toward the Institutional Steward queue while that post is vacant.
  const record = makeRecord({
    id: 'OBS-INS-2026-07-22-0021',
    receivingAuthority: 'institutional',
    observedEvidence:
      'A participant raised a concern about a routing choice made by the temporary receiver of record.',
  });
  assert.ok(validateForQueue(record).accepted, 'the record is preserved');
  // 2. The system identifies the receiver as the subject of the concern.
  const coverage = getOperationsEntry('institutional').vacancyCoverage;
  assert.ok(receiverSelfConflict(coverage, 'founding-steward:maurice-jackson'));
  assert.ok(receiverSelfConflict(coverage, 'founding-steward'));
  assert.ok(!receiverSelfConflict(coverage, 'ORI-COMMUNITY-MEMBER-REF'));
  // 3-6. Routing does not assign final review to the receiver or SOPHIA; the matter
  //      enters independent-human-review-required.
  const routing = routeEscalation('authority-conflict', 'institutional', 'founding-steward');
  assert.equal(routing.reviewer, 'independent-human-review-required');
  assert.ok(!/sophia/i.test(routing.reviewer));
  assert.ok(mayRaiseEscalation('institutional', 'authority-conflict').allowed);
  // 7. The matter remains open until an authorized human reviewer is designated.
  const escalation: EscalationRecord = {
    id: 'ESC-INS-2026-07-22-0021',
    category: 'authority-conflict',
    originPost: 'institutional',
    concernsPost: 'founding-steward',
    reviewer: 'independent-human-review-required',
    state: 'independent-human-review-required',
    evidenceRefs: ['OBS-INS-2026-07-22-0021'],
    summary: 'Concern involving the temporary receiver of record.',
    acknowledgment: 'required-pending',
    acknowledgedByRef: null,
    closedByRef: null,
    humanDecisionRef: null,
    continuityRef: null,
    createdAt: '2026-07-22',
    updatedAt: '2026-07-22',
  };
  assert.deepEqual(validateEscalation(escalation), []);
});

test('negative: the receiver cannot close a matter concerning themself', () => {
  // REJECTED INPUT: self-closure of a self-conflict escalation.
  const selfClosed: EscalationRecord = {
    id: 'ESC-INS-2026-07-22-0022',
    category: 'authority-conflict',
    originPost: 'institutional',
    concernsPost: 'founding-steward',
    reviewer: 'independent-human-review-required',
    state: 'closed-by-human',
    evidenceRefs: ['OBS-INS-2026-07-22-0021'],
    summary: 'Concern involving the temporary receiver of record.',
    acknowledgment: 'acknowledged-by-human',
    acknowledgedByRef: 'IND-REVIEW-CANDIDATE-REF',
    closedByRef: 'founding-steward:maurice-jackson',
    humanDecisionRef: 'HDR-FST-2026-07-22-0002',
    continuityRef: null,
    createdAt: '2026-07-22',
    updatedAt: '2026-07-22',
  };
  const errors = validateEscalation(selfClosed);
  assert.ok(errors.some((e) => e.includes('cannot finally review or close a matter concerning themself')));
});

test('no independent reviewer is fabricated — the designation packet remains a draft', async () => {
  const packet = await readFile(
    new URL(
      '../docs/stewardship/decision-packets/INDEPENDENT_REVIEWER_DESIGNATION_DECISION_PACKET.md',
      import.meta.url,
    ),
    'utf8',
  );
  assert.match(packet, /DRAFT — HUMAN DECISION REQUIRED — NOT ADOPTED/);
  assert.match(packet, /No independent reviewer is\ndesignated|No independent reviewer is designated/);
});

// ---------- Unchanged blockers ----------

test('no appointment, no candidacy, no access grant, storage unconfigured, C-014 open', () => {
  for (const shell of CURRENT_CANDIDATE_OPERATIONS) {
    assert.equal(shell.candidacy.state, 'vacant', shell.post);
    assert.equal(shell.accessGrantState, 'no-access-granted', shell.post);
    assert.deepEqual(validateCandidateOperations(shell), [], shell.post);
  }
  assert.equal(privateStorageStatus().configured, false);
  assert.equal(C014_STATUS, 'unresolved');
});

test('negative: vacancy routing cannot open a candidacy — storage prerequisite still blocks', () => {
  // REJECTED INPUT: an active candidacy attempted while routing exists but storage does not.
  const errors = validateCandidateOperations({
    ...CURRENT_CANDIDATE_OPERATIONS[0],
    candidacy: { ...CURRENT_CANDIDATE_OPERATIONS[0].candidacy, state: 'nomination-received' },
  });
  assert.ok(errors.some((e) => e.includes('private candidate-record storage')));
});

// ---------- Public surface truthfulness ----------

test('public status language: routed, never staffed; receiver meaning stated; no contact info', () => {
  const pages = renderStewardshipOperationsPages();
  const overview = pages.get(OPERATIONS_PATH) as string;
  assert.ok(overview.includes('temporarily-routed'));
  assert.ok(
    overview.includes(
      'It does not mean that person occupies the post or may exercise its authority.',
    ),
  );
  assert.ok(overview.includes('SD-2026-07-22-01'));
  assert.ok(overview.includes('SD-2026-07-22-02'));
  for (const [path, html] of pages) {
    assert.ok(!/fully staffed|is staffed|now staffed/i.test(html), path);
    assert.ok(html.includes('vacant'), path);
    assert.ok(!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(html), `${path} must expose no email`);
    assert.ok(!/\+?\d[\d\s().-]{8,}\d/.test(html.replace(/\d{4}-\d{2}-\d{2}/g, '')), `${path} must expose no phone number`);
  }
});

test('observation-only mode is unchanged by vacancy routing — mode never derives from coverage', () => {
  for (const entry of STEWARD_OPERATIONS_REGISTRY) {
    assert.equal(entry.operatingMode, 'observation-only', entry.postId);
  }
  // Negative: an entry claiming a different mode is rejected regardless of coverage.
  const forged = { ...getOperationsEntry('product'), operatingMode: 'inactive' as const };
  const errors = validateOperationsRegistry([
    forged,
    ...STEWARD_OPERATIONS_REGISTRY.filter((e) => e.postId !== 'product'),
  ]);
  assert.ok(errors.some((e) => e.includes('operating mode')));
});
