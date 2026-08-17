import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  STEWARD_OPERATIONS_REGISTRY,
  getOperationsEntry,
  validateOperationsRegistry,
} from '../src/stewardship/steward-operations-registry.ts';
import type { StewardOperationsEntry } from '../src/stewardship/steward-operations-registry.ts';
import {
  CURRENT_VACANCY_COVERAGE,
  validateVacancyCoverage,
} from '../src/stewardship/vacancy-coverage.ts';
import type { VacancyCoverageRecord } from '../src/stewardship/vacancy-coverage.ts';
import { STEWARD_POST_IDS } from '../src/stewardship/steward-posts.ts';
import type { OperationalRecord } from '../src/stewardship/operations-records.ts';
import { NEW_RECORD_DEFAULTS } from '../src/stewardship/operations-records.ts';
import { formatRecordId, isValidRecordId, validateReferencePrivacy } from '../src/stewardship/record-identifiers.ts';
import { validateOperationalRecord } from '../src/stewardship/record-validation.ts';
import {
  detectProhibitedFields,
  guardPublicExport,
} from '../src/stewardship/record-classification.ts';
import { validatePrivateBoundary, privateStorageStatus } from '../src/stewardship/private-record-boundary.ts';
import { CURRENT_PRIVATE_STORAGE } from '../src/stewardship/private-storage-adapter.ts';
import { renderStewardshipOperationsPages, OPERATIONS_PATH } from '../src/site/stewardship-pages.ts';
import { makeRecord } from './fixtures.ts';

test('operations registry honors all invariants', () => {
  assert.deepEqual(validateOperationsRegistry(STEWARD_OPERATIONS_REGISTRY), []);
});

test('exactly five operational entries, one per Charter post', () => {
  assert.equal(STEWARD_OPERATIONS_REGISTRY.length, 5);
  for (const id of STEWARD_POST_IDS) assert.ok(getOperationsEntry(id));
});

test('all posts are human-only, active, vacant, observation-only, with no occupant reference', () => {
  for (const entry of STEWARD_OPERATIONS_REGISTRY) {
    assert.equal(entry.humanOnly, true, entry.postId);
    assert.equal(entry.institutionalState, 'active', entry.postId);
    assert.equal(entry.occupancyState, 'vacant', entry.postId);
    assert.equal(entry.operatingMode, 'observation-only', entry.postId);
    assert.equal(entry.currentOccupantRef, null, entry.postId);
  }
});

test('no authority expansion anywhere; SOPHIA decision authority always false', () => {
  for (const entry of STEWARD_OPERATIONS_REGISTRY) {
    assert.equal(entry.authorityExpansion, 'none', entry.postId);
    assert.equal(entry.currentAuthorityScope, 'observation-only', entry.postId);
    assert.equal(entry.sophiaAdvisoryOnly, true, entry.postId);
    assert.equal(entry.sophiaDecisionAuthority, false, entry.postId);
  }
});

test('registry validation rejects a hard-coded alternate steward state', () => {
  const forged: StewardOperationsEntry = {
    ...getOperationsEntry('orientation'),
    occupancyState: 'occupied',
  };
  const errors = validateOperationsRegistry([
    forged,
    ...STEWARD_OPERATIONS_REGISTRY.filter((e) => e.postId !== 'orientation'),
  ]);
  assert.ok(errors.some((e) => e.includes('recorded human appointment reference')));
});

test('registry validation rejects an occupant reference on a vacant post, and SOPHIA as occupant', () => {
  const vacantWithRef = { ...getOperationsEntry('product'), currentOccupantRef: 'HDR-FST-2026-07-22-0001' };
  const errors = validateOperationsRegistry([
    vacantWithRef,
    ...STEWARD_OPERATIONS_REGISTRY.filter((e) => e.postId !== 'product'),
  ]);
  assert.ok(errors.some((e) => e.includes('vacancy is not occupancy')));

  const sophiaOccupant: StewardOperationsEntry = {
    ...getOperationsEntry('product'),
    occupancyState: 'occupied',
    currentOccupantRef: 'sophia',
  };
  const errors2 = validateOperationsRegistry([
    sophiaOccupant,
    ...STEWARD_OPERATIONS_REGISTRY.filter((e) => e.postId !== 'product'),
  ]);
  assert.ok(errors2.some((e) => e.includes('SOPHIA may never occupy')));
});

test('vacancy coverage: temporarily-routed for all five posts per SD-2026-07-22-02, validly', () => {
  assert.equal(CURRENT_VACANCY_COVERAGE.length, 5);
  for (const record of CURRENT_VACANCY_COVERAGE) {
    assert.equal(record.state, 'temporarily-routed', record.post);
    assert.equal(record.temporaryReceiverRef, 'founding-steward:maurice-jackson', record.post);
    assert.equal(record.humanDecisionRef, 'SD-2026-07-22-02', record.post);
    assert.equal(record.effectiveDate, '2026-07-22', record.post);
    assert.ok(record.reviewDate, record.post);
    assert.ok(record.scopeBoundaries.length > 0, record.post);
    assert.equal(record.terminatesUponAppointment, true, record.post);
    assert.deepEqual(validateVacancyCoverage(record), [], record.post);
  }
});

test('vacancy coverage rejects routing without decision, receiver, review date, or scope', () => {
  const bare: VacancyCoverageRecord = {
    post: 'continuity',
    state: 'temporarily-routed',
    temporaryReceiverRef: null,
    humanDecisionRef: null,
    scopeBoundaries: [],
    recusalRequirements: [],
    effectiveDate: null,
    reviewDate: null,
    terminatesUponAppointment: true,
  };
  const errors = validateVacancyCoverage(bare);
  assert.ok(errors.some((e) => e.includes('recorded human decision')));
  assert.ok(errors.some((e) => e.includes('receiver reference')));
  assert.ok(errors.some((e) => e.includes('review date')));
  assert.ok(errors.some((e) => e.includes('scope boundaries')));
});

test('vacancy coverage rejects SOPHIA as temporary receiver', () => {
  const errors = validateVacancyCoverage({
    post: 'continuity',
    state: 'temporarily-routed',
    temporaryReceiverRef: 'sophia-agent',
    humanDecisionRef: 'HDR-FST-2026-07-22-0001',
    scopeBoundaries: ['receive-and-acknowledge-only'],
    recusalRequirements: [],
    effectiveDate: '2026-07-22',
    reviewDate: '2026-10-01',
    terminatesUponAppointment: true,
  });
  assert.ok(errors.some((e) => e.includes('SOPHIA may never be a temporary receiver')));
});

test('record identifiers are deterministic and privacy-safe', () => {
  assert.equal(formatRecordId('observation', 'orientation', '2026-07-22', 1), 'OBS-ORI-2026-07-22-0001');
  assert.equal(
    formatRecordId('observation', 'orientation', '2026-07-22', 1),
    formatRecordId('observation', 'orientation', '2026-07-22', 1),
  );
  assert.ok(isValidRecordId('ESC-INS-2026-07-22-0002'));
  assert.ok(!isValidRecordId('ESC-INS-0002'));
  assert.ok(validateReferencePrivacy('someone@example.org').length > 0);
  assert.ok(validateReferencePrivacy('a reference with prose').length > 0);
  assert.deepEqual(validateReferencePrivacy('OBS-ORI-2026-07-22-0001'), []);
  assert.deepEqual(validateReferencePrivacy('private-record://designated-system/tok_abc123'), []);
});

test('a well-formed record validates; closure without human acknowledgment is rejected', () => {
  assert.deepEqual(validateOperationalRecord(makeRecord()), []);
  const errors = validateOperationalRecord(makeRecord({ status: 'closed' }));
  assert.ok(errors.some((e) => e.includes('cannot close without human acknowledgment')));
  assert.ok(errors.some((e) => e.includes('closure authority')));
});

test('records reject decision language inside recommendations — recommendation is not approval', () => {
  const errors = validateOperationalRecord(
    makeRecord({ recommendation: 'This change is hereby approved and adopted.' }),
  );
  assert.ok(errors.some((e) => e.includes('recommendation is not an approval')));
});

test('records reject SOPHIA as acknowledger, closer, or decision reference', () => {
  const ackErrors = validateOperationalRecord(
    makeRecord({ acknowledgment: 'acknowledged-by-human', acknowledgedByRef: 'sophia-1' }),
  );
  assert.ok(ackErrors.some((e) => e.includes('SOPHIA cannot acknowledge')));
  const decErrors = validateOperationalRecord(
    makeRecord({ humanDecisionStatus: 'human-decision-recorded', humanDecisionRef: 'sophia-decision-1' }),
  );
  assert.ok(decErrors.some((e) => e.includes('never point at SOPHIA')));
});

test('action requires a recorded human decision reference', () => {
  const errors = validateOperationalRecord(makeRecord({ actionStatus: 'human-authorized-action-referenced' }));
  assert.ok(errors.some((e) => e.includes('no recorded human decision')));
});

test('prohibited-field detection catches private data by key and by value', () => {
  assert.ok(detectProhibitedFields({ candidateName: 'x' }).length > 0);
  assert.ok(detectProhibitedFields({ contactEmail: 'x' }).length > 0);
  assert.ok(detectProhibitedFields({ accommodationNeeds: 'x' }).length > 0);
  assert.ok(detectProhibitedFields({ legalCapacityStatus: 'x' }).length > 0);
  assert.ok(detectProhibitedFields({ note: 'reach me at person@example.org' }).length > 0);
  assert.ok(detectProhibitedFields({ apiKeyValue: 'x' }).length > 0);
  assert.deepEqual(detectProhibitedFields({ summary: 'a page lacks its status label' }), []);
});

test('public export guard rejects restricted and private records', () => {
  const publicRecord = makeRecord({ classification: 'public-governance' });
  const restricted = makeRecord({ id: 'OBS-ORI-2026-07-22-0002' });
  const privateRecord = makeRecord({
    id: 'OBS-ORI-2026-07-22-0003',
    classification: 'private-candidate-or-participant',
    evidenceRefs: ['private-record://designated-system/tok_abc123'],
  });
  const result = guardPublicExport([publicRecord, restricted, privateRecord]);
  assert.equal(result.allowed.length, 1);
  assert.equal(result.allowed[0].id, publicRecord.id);
  assert.equal(result.rejected.length, 2);
  for (const r of result.rejected) assert.ok(r.reason.includes('never appear in a public export'));
});

test('private boundary: private-class records must be pointer shells', () => {
  const inline = makeRecord({
    classification: 'private-candidate-or-participant',
    evidenceRefs: ['EVD-ORI-2026-07-22-0001'],
  });
  assert.ok(validatePrivateBoundary(inline).some((e) => e.includes('private-record:// pointer')));
});

test('private storage is honestly unconfigured and blocks candidacy', () => {
  assert.equal(CURRENT_PRIVATE_STORAGE.configured, false);
  const status = privateStorageStatus();
  assert.equal(status.configured, false);
  assert.ok(status.candidacyBlockedReason);
  const attempt = CURRENT_PRIVATE_STORAGE.store('private-candidate-or-participant', 'tok');
  assert.equal(attempt.ok, false);
});

test('operational surfaces consume the registry — no duplicate operational truth', async () => {
  const source = await readFile(new URL('../src/site/stewardship-pages.ts', import.meta.url), 'utf8');
  assert.ok(source.includes('STEWARD_OPERATIONS_REGISTRY'), 'surface must import the operations registry');
  assert.ok(!/'occupied'/.test(source) && !/"occupied"/.test(source), 'surface must not hard-code occupancy');
  assert.ok(!/occupancyState\s*:/.test(source), 'surface must not construct operational entries');

  const pages = renderStewardshipOperationsPages();
  assert.equal(pages.size, 6);
  const overview = pages.get(OPERATIONS_PATH) as string;
  for (const entry of STEWARD_OPERATIONS_REGISTRY) {
    assert.ok(overview.includes(entry.canonicalName), `overview missing ${entry.postId}`);
    const detail = pages.get(`${OPERATIONS_PATH}${entry.postId}/`) as string;
    assert.ok(detail.includes(`${entry.institutionalState} · ${entry.occupancyState} · ${entry.operatingMode}`));
    assert.ok(detail.includes('temporarily-routed'), `${entry.postId} detail must show coverage state`);
  }
});

test('every operations page shows the boundary and SOPHIA advisory notices', () => {
  for (const [path, html] of renderStewardshipOperationsPages()) {
    assert.ok(html.includes('Vacancy is not occupancy'), path);
    assert.ok(html.includes('Observation is not authority'), path);
    assert.ok(html.includes('Recommendation is not approval'), path);
    assert.ok(html.includes('SOPHIA cannot become a steward'), path);
    assert.ok(
      html.includes('SOPHIA advisory output is not an adopted steward decision'),
      path,
    );
  }
});

test('fixtures in this suite contain no real personal data', () => {
  assert.deepEqual(detectProhibitedFields(makeRecord()), []);
  assert.deepEqual(detectProhibitedFields(CURRENT_VACANCY_COVERAGE), []);
  assert.deepEqual(detectProhibitedFields(STEWARD_OPERATIONS_REGISTRY), []);
});
