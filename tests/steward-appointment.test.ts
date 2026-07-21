import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  APPOINTMENT_PROCESS_STATUS,
  CURRENT_CANDIDACY_RECORDS,
  CANDIDACY_STATES,
  APPOINTED_STATES,
  isTransitionAllowed,
  validateCandidacyRecord,
  validateProcessStatus,
} from '../src/stewardship/steward-appointment-process.ts';
import type { CandidacyRecord } from '../src/stewardship/steward-appointment-process.ts';
import { STEWARD_POST_IDS } from '../src/stewardship/steward-posts.ts';

const base: CandidacyRecord = {
  post: 'orientation',
  state: 'vacant',
  consentRecordRef: null,
  humanDecisionRecordRef: null,
  acceptanceRecordRef: null,
  decisionAuthority: null,
  candidateRef: null,
  reviewDateRef: null,
  multiplePostOccupancy: false,
  concentrationReviewRef: null,
  sophiaAppointmentAuthority: false,
};

test('post-ratification: process ratified (SD-2026-07-21-01), all five posts still vacant, no candidacies', () => {
  // Ratification activated the process only. No candidacy was opened and no
  // person was appointed; posts stay vacant until separate recorded human
  // appointment decisions exist.
  assert.equal(APPOINTMENT_PROCESS_STATUS, 'ratified');
  assert.equal(CURRENT_CANDIDACY_RECORDS.length, 5);
  for (const post of STEWARD_POST_IDS) {
    const rec = CURRENT_CANDIDACY_RECORDS.find((r) => r.post === post);
    assert.ok(rec, `missing record for ${post}`);
    assert.equal(rec.state, 'vacant', `${post} must remain vacant until a recorded appointment decision exists`);
  }
  assert.deepEqual(validateProcessStatus(APPOINTMENT_PROCESS_STATUS, CURRENT_CANDIDACY_RECORDS), []);
});

test('current records honor all invariants', () => {
  for (const rec of CURRENT_CANDIDACY_RECORDS) {
    assert.deepEqual(validateCandidacyRecord(rec), [], rec.post);
  }
});

test('pre-ratification guard rejects any opened candidacy', () => {
  const opened = [{ ...base, state: 'nomination-received' as const }];
  assert.ok(validateProcessStatus('pending-ratification', opened).length > 0);
  assert.deepEqual(validateProcessStatus('ratified', opened), []);
});

test('no appointment without human decision record, acceptance, authority, and review date', () => {
  const appointed: CandidacyRecord = {
    ...base,
    state: 'appointed-observation-only',
    consentRecordRef: 'consent-1',
    candidateRef: 'candidate-a',
  };
  const errors = validateCandidacyRecord(appointed);
  assert.ok(errors.some((e) => e.includes('human decision record')));
  assert.ok(errors.some((e) => e.includes('candidate acceptance')));
  assert.ok(errors.some((e) => e.includes('decision authority')));
  assert.ok(errors.some((e) => e.includes('review date')));

  const complete: CandidacyRecord = {
    ...appointed,
    humanDecisionRecordRef: 'decision-1',
    acceptanceRecordRef: 'acceptance-1',
    decisionAuthority: 'founding-steward-record-1',
    reviewDateRef: 'review-1',
  };
  assert.deepEqual(validateCandidacyRecord(complete), []);
});

test('SOPHIA can never be decision authority and appointment authority is always false', () => {
  const viaSophia: CandidacyRecord = {
    ...base,
    state: 'appointed-observation-only',
    consentRecordRef: 'c',
    humanDecisionRecordRef: 'd',
    acceptanceRecordRef: 'a',
    decisionAuthority: 'SOPHIA',
    candidateRef: 'candidate-a',
    reviewDateRef: 'r',
  };
  assert.ok(validateCandidacyRecord(viaSophia).some((e) => e.includes('SOPHIA')));
});

test('no person approves their own appointment', () => {
  const selfApproved: CandidacyRecord = {
    ...base,
    state: 'appointed-observation-only',
    consentRecordRef: 'c',
    humanDecisionRecordRef: 'd',
    acceptanceRecordRef: 'a',
    decisionAuthority: 'person-x',
    candidateRef: 'person-x',
    reviewDateRef: 'r',
  };
  assert.ok(validateCandidacyRecord(selfApproved).some((e) => e.includes('own appointment')));
});

test('orientation completion and eligibility are not appointment', () => {
  for (const state of ['orientation-complete', 'eligible-for-appointment-consideration'] as const) {
    const withDecision: CandidacyRecord = {
      ...base, state, consentRecordRef: 'c', humanDecisionRecordRef: 'd',
    };
    assert.ok(
      validateCandidacyRecord(withDecision).some((e) => e.includes('not appointment')),
      state,
    );
    assert.ok(!isTransitionAllowed(state, 'appointed-observation-only') || state !== 'orientation-complete',
      'orientation-complete must not transition directly to appointed');
  }
  // The only path to appointment runs through the human decision stage.
  assert.equal(isTransitionAllowed('orientation-complete', 'appointed-observation-only'), false);
  assert.equal(isTransitionAllowed('eligible-for-appointment-consideration', 'appointed-observation-only'), false);
  assert.equal(isTransitionAllowed('appointment-decision-pending', 'appointed-observation-only'), true);
});

test('the only appointed state is observation-only; no expanded-authority state exists', () => {
  assert.deepEqual(APPOINTED_STATES, ['appointed-observation-only']);
  assert.ok(!CANDIDACY_STATES.some((s) => s.includes('expanded')));
});

test('withdrawal is permitted from every active pre-appointment state', () => {
  for (const state of [
    'nomination-received', 'candidate-consent-pending', 'eligibility-review',
    'orientation-in-progress', 'orientation-complete', 'readiness-review',
    'eligible-for-appointment-consideration', 'appointment-decision-pending',
    'appointment-deferred',
  ] as const) {
    assert.ok(isTransitionAllowed(state, 'candidate-withdrew'), `${state} must allow withdrawal`);
  }
});

test('a vacant post carries no candidate or appointment artifacts', () => {
  const dirty: CandidacyRecord = { ...base, candidateRef: 'someone' };
  assert.ok(validateCandidacyRecord(dirty).some((e) => e.includes('vacant')));
});

test('multiple-post occupancy requires concentration review', () => {
  const multi: CandidacyRecord = {
    ...base,
    state: 'appointed-observation-only',
    consentRecordRef: 'c',
    humanDecisionRecordRef: 'd',
    acceptanceRecordRef: 'a',
    decisionAuthority: 'founding-steward-record-1',
    candidateRef: 'candidate-a',
    reviewDateRef: 'r',
    multiplePostOccupancy: true,
    concentrationReviewRef: null,
  };
  assert.ok(validateCandidacyRecord(multi).some((e) => e.includes('concentration')));
  assert.deepEqual(validateCandidacyRecord({ ...multi, concentrationReviewRef: 'car-1' }), []);
});
