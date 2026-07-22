/**
 * Deterministic, privacy-safe record identifiers.
 * Authority: docs/stewardship/STEWARD_RECORD_CLASSIFICATION_STANDARD.md.
 *
 * Identifiers are derived from record kind, originating post, an ISO date, and
 * a sequence number — never from names, contact details, or any personal data.
 * The same inputs always produce the same identifier, so lineage references
 * stay stable across systems without embedding identity.
 */

import type { OperationalRecordKind, RecordActor } from './operations-records.ts';

const KIND_PREFIX: Readonly<Record<OperationalRecordKind, string>> = {
  observation: 'OBS',
  evidence: 'EVD',
  finding: 'FND',
  uncertainty: 'UNC',
  recommendation: 'REC',
  handoff: 'HND',
  escalation: 'ESC',
  acknowledgment: 'ACK',
  disposition: 'DSP',
  'human-decision-reference': 'HDR',
  'continuity-update': 'CTU',
  'review-event': 'REV',
};

const ACTOR_SEGMENT: Readonly<Record<RecordActor, string>> = {
  orientation: 'ORI',
  continuity: 'CON',
  vocabulary: 'VOC',
  product: 'PRD',
  institutional: 'INS',
  'founding-steward': 'FST',
  'sophia-advisory': 'SOA',
};

/** e.g. formatRecordId('observation', 'orientation', '2026-07-22', 1) → "OBS-ORI-2026-07-22-0001" */
export function formatRecordId(
  kind: OperationalRecordKind,
  origin: RecordActor,
  isoDate: string,
  sequence: number,
): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) throw new Error(`invalid ISO date "${isoDate}"`);
  if (!Number.isInteger(sequence) || sequence < 1 || sequence > 9999)
    throw new Error(`sequence must be an integer 1..9999, got ${sequence}`);
  return `${KIND_PREFIX[kind]}-${ACTOR_SEGMENT[origin]}-${isoDate}-${String(sequence).padStart(4, '0')}`;
}

const ID_PATTERN = /^(OBS|EVD|FND|UNC|REC|HND|ESC|ACK|DSP|HDR|CTU|REV)-(ORI|CON|VOC|PRD|INS|FST|SOA)-\d{4}-\d{2}-\d{2}-\d{4}$/;

/** True when a string is a well-formed record identifier. */
export function isValidRecordId(id: string): boolean {
  return ID_PATTERN.test(id);
}

/**
 * Privacy guard for identifiers and references: no email addresses, no
 * phone-number-length digit runs, no whitespace-separated prose that could
 * carry a personal name. Returns human-readable violations.
 */
export function validateReferencePrivacy(ref: string): string[] {
  const errors: string[] = [];
  if (/@/.test(ref)) errors.push(`reference "${ref}" may not contain an email address`);
  if (/\d{7,}/.test(ref.replace(/-/g, ''))) {
    // Long digit runs are allowed only as ISO-date + sequence segments of well-formed ids.
    if (!isValidRecordId(ref) && !/^private-record:\/\//.test(ref))
      errors.push(`reference "${ref}" contains a long digit run that could be a phone number`);
  }
  if (/\s/.test(ref)) errors.push(`reference "${ref}" may not contain whitespace (no prose, no names)`);
  return errors;
}
