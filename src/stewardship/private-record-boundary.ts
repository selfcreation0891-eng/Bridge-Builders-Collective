/**
 * The private-record boundary: what may cross from private systems into this
 * public repository (answer: only privacy-safe pointers) and what may never
 * leave it (answer: everything else).
 * Authority: docs/stewardship/STEWARD_RECORD_CLASSIFICATION_STANDARD.md and
 * docs/stewardship/PRIVATE_CANDIDATE_RECORD_STORAGE_REQUIREMENTS.md.
 */

import type { OperationalRecord } from './operations-records.ts';
import { detectProhibitedFields } from './record-classification.ts';
import { CURRENT_PRIVATE_STORAGE, isPrivateRecordRef } from './private-storage-adapter.ts';

/**
 * Validate that a record honors the boundary:
 *   Private-class records may exist here only as pointer shells — their
 *   evidence must be private-record:// references, and their free-text fields
 *   must not carry personal content.
 *   Any record whose text or refs leak prohibited values fails, whatever its class.
 */
export function validatePrivateBoundary(record: OperationalRecord): string[] {
  const errors: string[] = [];
  const at = `[${record.id}]`;

  errors.push(...detectProhibitedFields(record, `record ${record.id}`));

  if (record.classification === 'private-candidate-or-participant') {
    for (const ref of record.evidenceRefs) {
      if (!isPrivateRecordRef(ref))
        errors.push(
          `${at} private-class evidence must be a private-record:// pointer, not inline content or a public path ("${ref}")`,
        );
    }
    if (record.evidenceRefs.length === 0)
      errors.push(`${at} a private-class record in this repository may only be a pointer shell — it must reference its private system`);
  }

  return errors;
}

/**
 * Whether private-record operations are possible at all right now. They are
 * not: no provider is designated. This function exists so callers ask the
 * boundary instead of assuming, and so tests can assert the honest state.
 */
export function privateStorageStatus(): {
  configured: boolean;
  providerName: string;
  candidacyBlockedReason: string | null;
} {
  return {
    configured: CURRENT_PRIVATE_STORAGE.configured,
    providerName: CURRENT_PRIVATE_STORAGE.providerName,
    candidacyBlockedReason: CURRENT_PRIVATE_STORAGE.configured
      ? null
      : 'Live candidacy is blocked: no private candidate-record storage provider has been designated by a recorded human decision.',
  };
}
