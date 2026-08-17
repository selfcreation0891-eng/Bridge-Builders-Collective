/**
 * Escalation validation.
 * Authority: STEWARD_ESCALATION_MATRIX.md and
 * docs/stewardship/STEWARD_HANDOFF_AND_ESCALATION_PROTOCOL.md.
 */

import { STEWARD_POST_IDS } from './steward-posts.ts';
import type { EscalationRecord } from './escalation-engine.ts';
import { ESCALATION_CATEGORIES, SERIOUS_OR_ABOVE, routeEscalation } from './escalation-engine.ts';
import { isValidRecordId, validateReferencePrivacy } from './record-identifiers.ts';

export function validateEscalation(record: EscalationRecord): string[] {
  const errors: string[] = [];
  const at = `[${record.id || '?'}:${record.category}]`;

  if (!isValidRecordId(record.id)) errors.push(`${at} malformed escalation id`);
  if (!(ESCALATION_CATEGORIES as readonly string[]).includes(record.category))
    errors.push(`${at} unknown escalation category`);
  if (!(STEWARD_POST_IDS as readonly string[]).includes(record.originPost))
    errors.push(`${at} unknown origin post`);
  if (!record.summary.trim()) errors.push(`${at} an escalation must state its concern`);
  if (record.evidenceRefs.length === 0)
    errors.push(`${at} an escalation must carry evidence references`);
  for (const ref of record.evidenceRefs)
    errors.push(...validateReferencePrivacy(ref).map((e) => `${at} ${e}`));
  if (record.updatedAt < record.createdAt) errors.push(`${at} updatedAt precedes createdAt`);

  // Reviewer must match canonical routing.
  const expected = routeEscalation(record.category, record.originPost, record.concernsPost);
  if (record.reviewer !== expected.reviewer)
    errors.push(
      `${at} reviewer "${String(record.reviewer)}" contradicts canonical routing "${String(expected.reviewer)}" (${expected.rationale})`,
    );

  if (/sophia/i.test(String(record.reviewer)))
    errors.push(`${at} SOPHIA can never review an escalation`);

  // Concerns about the Institutional Steward must sit in the independent-review state, not be absorbed.
  if (
    record.concernsPost === 'institutional' &&
    record.state !== 'independent-human-review-required' &&
    record.state !== 'closed-by-human'
  )
    errors.push(`${at} a concern about the Institutional Steward must enter independent-human-review-required`);

  // Concerns about the founding steward — including in the capacity of temporary
  // receiver of record (SD-2026-07-22-02) — likewise cannot be absorbed or
  // self-reviewed; they wait for an independent human.
  if (
    record.concernsPost === 'founding-steward' &&
    record.state !== 'independent-human-review-required' &&
    record.state !== 'closed-by-human'
  )
    errors.push(`${at} a concern about the founding steward must enter independent-human-review-required`);

  // Closure discipline.
  const serious = (SERIOUS_OR_ABOVE as readonly string[]).includes(record.category);
  if (record.state === 'closed-by-human') {
    if (!record.closedByRef)
      errors.push(`${at} closure requires the closing human's reference — escalations never auto-close`);
    if (record.closedByRef && /sophia/i.test(record.closedByRef))
      errors.push(`${at} SOPHIA cannot close an escalation`);
    if (!record.humanDecisionRef)
      errors.push(`${at} closure requires a recorded human decision reference`);
    if (record.acknowledgment !== 'acknowledged-by-human')
      errors.push(`${at} closure requires prior human acknowledgment`);
    if (serious && record.closedByRef && record.closedByRef.toLowerCase().includes(record.originPost))
      errors.push(`${at} the origin post cannot unilaterally close its own serious escalation`);
    if (
      record.concernsPost === 'institutional' &&
      record.closedByRef &&
      record.closedByRef.toLowerCase().includes('institutional')
    )
      errors.push(`${at} the Institutional Steward cannot close a concern about itself`);
    if (
      record.concernsPost === 'founding-steward' &&
      record.closedByRef &&
      /founding-steward|maurice/i.test(record.closedByRef)
    )
      errors.push(`${at} the receiver of record cannot finally review or close a matter concerning themself — independent human review is required`);
  } else if (record.closedByRef || (serious === false && record.state === ('auto-closed' as string))) {
    errors.push(`${at} only closed-by-human may carry a closer reference`);
  }

  if (record.acknowledgment === 'acknowledged-by-human' && !record.acknowledgedByRef)
    errors.push(`${at} human acknowledgment requires the acknowledging human's reference`);
  if (record.acknowledgedByRef && /sophia/i.test(record.acknowledgedByRef))
    errors.push(`${at} SOPHIA cannot acknowledge an escalation`);

  return errors;
}
