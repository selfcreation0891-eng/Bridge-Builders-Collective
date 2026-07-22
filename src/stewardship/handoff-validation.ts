/**
 * Handoff validation.
 * Authority: docs/stewardship/STEWARD_HANDOFF_AND_ESCALATION_PROTOCOL.md.
 *
 * Rejected, always:
 *   self-routing without a documented reason;
 *   routing to an unknown post;
 *   routing a private record into a public export;
 *   routing to SOPHIA as a decision authority;
 *   closing a handoff without human acknowledgment;
 *   converting a recommendation into a decision.
 */

import { STEWARD_POST_IDS } from './steward-posts.ts';
import type { HandoffRecord } from './handoff-routing.ts';
import { isRouteAllowed } from './handoff-routing.ts';
import { isValidRecordId, validateReferencePrivacy } from './record-identifiers.ts';
import { DECISION_CLAIM_PATTERN } from './record-validation.ts';

export function validateHandoff(record: HandoffRecord): string[] {
  const errors: string[] = [];
  const at = `[${record.id || '?'}:${record.origin}→${String(record.destination)}]`;

  if (!isValidRecordId(record.id)) errors.push(`${at} malformed handoff id`);

  if (!(STEWARD_POST_IDS as readonly string[]).includes(record.origin))
    errors.push(`${at} unknown origin post — the Charter establishes five and only five posts`);

  const destinationIsPost = (STEWARD_POST_IDS as readonly string[]).includes(
    record.destination as string,
  );
  if (!destinationIsPost && record.destination !== 'founding-steward')
    errors.push(`${at} unknown destination "${String(record.destination)}" — handoffs route to posts or the founding steward, never elsewhere`);

  if (/sophia/i.test(String(record.destination)))
    errors.push(`${at} SOPHIA can never be a handoff destination — it holds no decision authority`);

  if ((record.origin as string) === (record.destination as string)) {
    if (!record.selfRoutingJustification?.trim())
      errors.push(`${at} self-routing requires a documented reason`);
  } else if (destinationIsPost || record.destination === 'founding-steward') {
    if (
      !isRouteAllowed(record.origin, record.destination) &&
      !record.selfRoutingJustification?.trim()
    )
      errors.push(
        `${at} route is not canonical — use a canonical route or document why exceptional routing is needed`,
      );
  }

  if (!record.reason.trim()) errors.push(`${at} a handoff must state its reason`);
  if (!record.requestedReview.trim())
    errors.push(`${at} a handoff must state what review it requests from the destination`);
  if (record.evidenceRefs.length === 0)
    errors.push(`${at} a handoff must carry evidence references`);
  for (const ref of record.evidenceRefs)
    errors.push(...validateReferencePrivacy(ref).map((e) => `${at} ${e}`));

  if (record.classification === 'private-candidate-or-participant')
    errors.push(`${at} private records never travel through public handoff surfaces — hand off a privacy-safe pointer instead`);

  if (record.disposition === 'closed-by-human') {
    if (record.acknowledgment !== 'acknowledged-by-human')
      errors.push(`${at} a handoff cannot close without human acknowledgment`);
    if (!record.humanDecisionRef)
      errors.push(`${at} closure requires the recorded human decision reference`);
  }
  if (record.acknowledgment === 'acknowledged-by-human') {
    if (!record.acknowledgedByRef)
      errors.push(`${at} human acknowledgment requires the acknowledging human's reference`);
    if (record.acknowledgedByRef && /sophia/i.test(record.acknowledgedByRef))
      errors.push(`${at} SOPHIA cannot acknowledge a handoff`);
  }

  // A drafted recommendation stays a recommendation.
  if (record.disposition === 'recommendation-drafted' && record.humanDecisionRef)
    errors.push(`${at} a drafted recommendation carries no decision reference — a recommendation is not a decision`);
  if (DECISION_CLAIM_PATTERN.test(record.requestedReview) || DECISION_CLAIM_PATTERN.test(record.reason))
    errors.push(`${at} handoff text contains decision language — handoffs request review; they never announce decisions`);

  if (record.updatedAt < record.createdAt) errors.push(`${at} updatedAt precedes createdAt`);

  return errors;
}
