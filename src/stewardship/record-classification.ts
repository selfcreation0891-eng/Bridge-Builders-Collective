/**
 * Record classification and the public-export privacy boundary.
 * Authority: docs/stewardship/STEWARD_RECORD_CLASSIFICATION_STANDARD.md,
 * PRIVACY_POLICY.md, and the Constitution's consent protections.
 *
 * Three classes exist. This public repository may contain only
 * public-governance records, schemas, empty templates, and personal-data-free
 * fixtures. Restricted and private material lives elsewhere; here we keep only
 * privacy-safe pointers. The export guard makes that boundary machine-checked.
 */

import type { OperationalRecord, RecordClassification } from './operations-records.ts';

export const RECORD_CLASSIFICATIONS: readonly RecordClassification[] = [
  'public-governance',
  'restricted-stewardship',
  'private-candidate-or-participant',
] as const;

/** Plain-language meaning of each class, for surfaces and documentation. */
export const CLASSIFICATION_MEANING: Readonly<Record<RecordClassification, string>> = {
  'public-governance':
    'Ratified standards, vacancy status, adopted decisions, operating mode, and public review summaries. May appear in this public repository.',
  'restricted-stewardship':
    'Internal observations, unresolved escalations, continuity packets, product-risk findings, and institutional review notes. Never published; referenced here only by privacy-safe pointer.',
  'private-candidate-or-participant':
    'Applications, contact details, accommodations, legal-capacity information, private conflict disclosures, and private facilitator notes. Never stored in this repository in any form; held only in a human-designated private system.',
};

/**
 * Field-name fragments that signal private candidate or participant data.
 * Checked case-insensitively against object keys.
 */
export const PROHIBITED_PRIVATE_FIELD_FRAGMENTS: readonly string[] = [
  'candidatename',
  'fullname',
  'legalname',
  'email',
  'phone',
  'homeaddress',
  'streetaddress',
  'birthdate',
  'dateofbirth',
  'disability',
  'accommodation',
  'legalcapacity',
  'guardianship',
  'medical',
  'diagnosis',
  'safeguardingdetail',
  'conflictdisclosuredetail',
  'facilitatornote',
  'password',
  'apikey',
  'secret',
  'credential',
] as const;

const EMAIL_VALUE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
const PHONE_VALUE = /(?:\+?\d[\s().-]*){9,}/;

/**
 * Detect prohibited private fields or values on any plain object (record,
 * fixture, or export payload). Returns human-readable violations.
 */
export function detectProhibitedFields(value: unknown, path = 'record'): string[] {
  const errors: string[] = [];
  if (value === null || value === undefined) return errors;
  if (typeof value === 'string') {
    if (EMAIL_VALUE.test(value)) errors.push(`${path}: contains an email address`);
    else if (PHONE_VALUE.test(value)) errors.push(`${path}: contains a phone-number-like value`);
    return errors;
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => errors.push(...detectProhibitedFields(v, `${path}[${i}]`)));
    return errors;
  }
  if (typeof value === 'object') {
    for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
      const normalized = key.toLowerCase().replace(/[^a-z]/g, '');
      for (const fragment of PROHIBITED_PRIVATE_FIELD_FRAGMENTS) {
        if (normalized.includes(fragment)) {
          errors.push(`${path}.${key}: prohibited private field (matches "${fragment}")`);
          break;
        }
      }
      errors.push(...detectProhibitedFields(v, `${path}.${key}`));
    }
  }
  return errors;
}

export interface PublicExportResult {
  allowed: readonly OperationalRecord[];
  rejected: readonly { record: OperationalRecord; reason: string }[];
}

/**
 * The public-export guard. Only public-governance records with no prohibited
 * content pass. Restricted and private records are rejected — rejection is the
 * boundary working, not an error to route around.
 */
export function guardPublicExport(records: readonly OperationalRecord[]): PublicExportResult {
  const allowed: OperationalRecord[] = [];
  const rejected: { record: OperationalRecord; reason: string }[] = [];
  for (const record of records) {
    if (record.classification !== 'public-governance') {
      rejected.push({
        record,
        reason: `classification "${record.classification}" may never appear in a public export`,
      });
      continue;
    }
    const leaks = detectProhibitedFields(record);
    if (leaks.length) {
      rejected.push({ record, reason: `prohibited content detected: ${leaks.join('; ')}` });
      continue;
    }
    allowed.push(record);
  }
  return { allowed, rejected };
}
