/**
 * Shared privacy-safe test fixtures. No personal information appears here —
 * asserted by the prohibited-field scan in the test suites.
 */
import type { OperationalRecord } from '../src/stewardship/operations-records.ts';
import { NEW_RECORD_DEFAULTS } from '../src/stewardship/operations-records.ts';
import { formatRecordId } from '../src/stewardship/record-identifiers.ts';

/** A valid baseline operational record fixture. */
export function makeRecord(overrides: Partial<OperationalRecord> = {}): OperationalRecord {
  return {
    id: formatRecordId('observation', 'orientation', '2026-07-22', 1),
    kind: 'observation',
    createdAt: '2026-07-22',
    updatedAt: '2026-07-22',
    originatingPost: 'orientation',
    receivingAuthority: 'orientation',
    urgency: 'routine',
    sensitivity: 'low',
    classification: 'restricted-stewardship',
    consentBoundary: 'none-required',
    ...NEW_RECORD_DEFAULTS,
    observedEvidence: 'A public page describes a planned environment without its status label.',
    evidenceRefs: ['EVD-ORI-2026-07-22-0001'],
    ...overrides,
  };
}
