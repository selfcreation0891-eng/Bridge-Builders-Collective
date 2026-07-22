/**
 * Validation of operational records.
 * Authority: docs/stewardship/OBSERVATION_ONLY_OPERATING_PROTOCOL.md and
 * docs/stewardship/STEWARD_RECORD_CLASSIFICATION_STANDARD.md.
 *
 * Invariants, machine-checked:
 *   Observed evidence is always present and never collapsed into interpretation.
 *   A recommendation is not a decision; action requires a recorded human decision.
 *   Closure requires human acknowledgment and a human closure authority — never SOPHIA.
 *   Urgency and dates are well-formed; overdue is a display fact, not a state change.
 */

import type { OperationalRecord } from './operations-records.ts';
import { OPERATIONAL_RECORD_KINDS, RECORD_URGENCIES } from './operations-records.ts';
import { STEWARD_POST_IDS } from './steward-posts.ts';
import { isValidRecordId, validateReferencePrivacy } from './record-identifiers.ts';

const VALID_ACTORS: readonly string[] = [...STEWARD_POST_IDS, 'founding-steward', 'sophia-advisory'];
const VALID_AUTHORITIES: readonly string[] = [...STEWARD_POST_IDS, 'founding-steward', 'independent-human-review'];

const ISO_TIMESTAMP = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/;

/** Language that would convert a recommendation into a claimed decision. */
export const DECISION_CLAIM_PATTERN =
  /\b(approved|approves|ratified|ratifies|adopted decision|hereby adopt|appointed|appoints|authorized for deployment|authorizes deployment|final determination|certified as|escalation closed|closes? this escalation|publication authorized)\b/i;

export function validateOperationalRecord(record: OperationalRecord): string[] {
  const errors: string[] = [];
  const at = `[${record.id || '?'}:${record.kind || '?'}]`;

  if (!isValidRecordId(record.id)) errors.push(`${at} malformed record id`);
  if (!(OPERATIONAL_RECORD_KINDS as readonly string[]).includes(record.kind))
    errors.push(`${at} unknown record kind`);
  if (!VALID_ACTORS.includes(record.originatingPost))
    errors.push(`${at} unknown originating post "${record.originatingPost}"`);
  if (!VALID_AUTHORITIES.includes(record.receivingAuthority))
    errors.push(`${at} unknown receiving authority "${record.receivingAuthority}" — records route to posts or human authority, never to SOPHIA`);
  if (!(RECORD_URGENCIES as readonly string[]).includes(record.urgency))
    errors.push(`${at} unknown urgency`);

  if (!ISO_TIMESTAMP.test(record.createdAt)) errors.push(`${at} malformed createdAt`);
  if (!ISO_TIMESTAMP.test(record.updatedAt)) errors.push(`${at} malformed updatedAt`);
  if (record.dueDate && !ISO_TIMESTAMP.test(record.dueDate)) errors.push(`${at} malformed dueDate`);
  if (record.updatedAt < record.createdAt) errors.push(`${at} updatedAt precedes createdAt`);

  if (!record.observedEvidence.trim())
    errors.push(`${at} observed evidence is required — a record without evidence preserves nothing`);
  if (!record.consentBoundary.trim())
    errors.push(`${at} consent boundary must be stated ('none-required' when no personal material is involved)`);

  for (const ref of [...record.evidenceRefs, ...record.relatedRecordIds])
    errors.push(...validateReferencePrivacy(ref).map((e) => `${at} ${e}`));
  if (record.acknowledgedByRef)
    errors.push(...validateReferencePrivacy(record.acknowledgedByRef).map((e) => `${at} ${e}`));

  // A recommendation is a recommendation. It may not claim decision language.
  if (record.recommendation && DECISION_CLAIM_PATTERN.test(record.recommendation))
    errors.push(`${at} recommendation contains decision language — a recommendation is not an approval, appointment, certification, or closure`);
  if (record.interpretation && DECISION_CLAIM_PATTERN.test(record.interpretation))
    errors.push(`${at} interpretation contains decision language — interpretation is not authority`);

  // Action requires a recorded human decision.
  if (record.actionStatus === 'human-authorized-action-referenced') {
    if (record.humanDecisionStatus !== 'human-decision-recorded')
      errors.push(`${at} action claims human authorization but no recorded human decision status`);
    if (!record.humanDecisionRef)
      errors.push(`${at} action claims human authorization but carries no decision reference`);
  }
  if (record.humanDecisionStatus === 'human-decision-recorded' && !record.humanDecisionRef)
    errors.push(`${at} a recorded human decision requires its reference`);
  if (record.humanDecisionRef && /sophia/i.test(record.humanDecisionRef))
    errors.push(`${at} a human decision reference may never point at SOPHIA`);

  // Closure discipline: no closure without human acknowledgment and human authority.
  if (record.status === 'closed') {
    if (record.acknowledgment !== 'acknowledged-by-human')
      errors.push(`${at} a record cannot close without human acknowledgment`);
    if (!record.closureAuthority)
      errors.push(`${at} a closed record must name its human closure authority`);
  }
  if (record.acknowledgment === 'acknowledged-by-human') {
    if (!record.acknowledgedByRef)
      errors.push(`${at} human acknowledgment requires the acknowledging human's reference`);
    if (record.acknowledgedByRef && /sophia/i.test(record.acknowledgedByRef))
      errors.push(`${at} SOPHIA cannot acknowledge a record — acknowledgment is a human act`);
  }
  if (record.closureAuthority && /sophia/i.test(record.closureAuthority))
    errors.push(`${at} SOPHIA may never be a closure authority`);

  // SOPHIA-originated records are advisory: they may never carry a decided/actioned state.
  if (record.originatingPost === 'sophia-advisory') {
    if (record.actionStatus === 'human-authorized-action-referenced' && !record.humanDecisionRef)
      errors.push(`${at} SOPHIA-originated record cannot reference action without a recorded human decision`);
    if (record.kind === 'human-decision-reference')
      errors.push(`${at} SOPHIA cannot originate a human decision reference`);
    if (record.kind === 'acknowledgment')
      errors.push(`${at} SOPHIA cannot originate an acknowledgment — acknowledgment is a human act`);
  }

  return errors;
}

/**
 * Overdue is derived for display and review packets only. It never changes a
 * record's decision status: a late record is still awaiting its human.
 */
export function isOverdue(record: OperationalRecord, asOfIsoDate: string): boolean {
  return record.status !== 'closed' && !!record.dueDate && record.dueDate < asOfIsoDate;
}

/** Age in whole days, derived from supplied dates (records never invent time). */
export function ageInDays(record: OperationalRecord, asOfIsoDate: string): number {
  const created = Date.parse(record.createdAt.slice(0, 10) + 'T00:00:00Z');
  const asOf = Date.parse(asOfIsoDate.slice(0, 10) + 'T00:00:00Z');
  if (Number.isNaN(created) || Number.isNaN(asOf)) return 0;
  return Math.max(0, Math.round((asOf - created) / 86_400_000));
}
