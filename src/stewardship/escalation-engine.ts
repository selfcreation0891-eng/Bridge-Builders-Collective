/**
 * Escalation engine — the existing escalation matrix as machine-checkable
 * rules, altering no authority.
 * Authority: STEWARD_ESCALATION_MATRIX.md (root),
 * docs/stewardship/STEWARD_ESCALATION_MATRIX reference in
 * docs/stewardship/STEWARD_HANDOFF_AND_ESCALATION_PROTOCOL.md §"Escalation rules".
 *
 * Two rules anchor everything:
 *   Raising an alarm is always allowed. Observation-Only Mode restricts
 *   consequential action, never the act of escalating — urgent safety
 *   escalation is permitted from any post at any time.
 *   Closing is a human act. Serious and above never auto-close, SOPHIA closes
 *   nothing, and no post closes its own serious escalation.
 */

import type { StewardPostId } from './steward-posts.ts';
import { STEWARD_POST_IDS } from './steward-posts.ts';

export type EscalationCategory =
  | 'routine'
  | 'time-sensitive'
  | 'serious'
  | 'urgent-safety'
  | 'constitutional'
  | 'authority-conflict'
  | 'privacy-or-consent-breach'
  | 'public-claim-concern'
  | 'cross-post-conflict';

export const ESCALATION_CATEGORIES: readonly EscalationCategory[] = [
  'routine',
  'time-sensitive',
  'serious',
  'urgent-safety',
  'constitutional',
  'authority-conflict',
  'privacy-or-consent-breach',
  'public-claim-concern',
  'cross-post-conflict',
] as const;

/** Categories whose closure discipline is "serious": human closure, never origin-post, never auto. */
export const SERIOUS_OR_ABOVE: readonly EscalationCategory[] = [
  'serious',
  'urgent-safety',
  'constitutional',
  'authority-conflict',
  'privacy-or-consent-breach',
  'cross-post-conflict',
] as const;

export type EscalationReviewer =
  | StewardPostId
  | 'founding-steward'
  | 'independent-human-review-required';

export interface EscalationRouting {
  reviewer: EscalationReviewer;
  rationale: string;
}

/**
 * Route an escalation to its reviewer.
 *
 *   Constitutional matters and matters exceeding delegated authority go to the
 *   founding steward.
 *   Concerns about the Institutional Steward cannot be reviewed by the
 *   Institutional Steward: they enter independent-human-review-required rather
 *   than inventing an authority.
 *   Everything else routes to the Institutional Steward post (vacant today —
 *   which means the matter waits for a human, not that it disappears).
 */
export function routeEscalation(
  category: EscalationCategory,
  originPost: StewardPostId,
  concernsPost: StewardPostId | 'founding-steward' | null = null,
): EscalationRouting {
  if (category === 'constitutional')
    return { reviewer: 'founding-steward', rationale: 'constitutional matters exceed delegated post authority' };

  if (concernsPost === 'institutional' || originPost === 'institutional' && concernsPost === null && category === 'authority-conflict')
    return {
      reviewer: 'independent-human-review-required',
      rationale:
        'the Institutional Steward cannot review a concern about itself; no impartial post authority exists, so independent human review is required rather than inventing one',
    };

  if (concernsPost === 'founding-steward')
    return {
      reviewer: 'independent-human-review-required',
      rationale: 'a concern about the founding steward cannot be impartially reviewed inside the post structure',
    };

  return {
    reviewer: 'institutional',
    rationale: 'cross-post and governance-boundary concerns route to the Institutional Steward post',
  };
}

/**
 * Raising an escalation is always allowed — most emphatically for urgent
 * safety. This function exists so callers (and tests) ask the rule instead of
 * assuming; it never returns false for a known post and category.
 */
export function mayRaiseEscalation(
  originPost: StewardPostId,
  category: EscalationCategory,
): { allowed: boolean; note: string } {
  const known =
    (STEWARD_POST_IDS as readonly string[]).includes(originPost) &&
    (ESCALATION_CATEGORIES as readonly string[]).includes(category);
  if (!known) return { allowed: false, note: 'unknown post or category' };
  return {
    allowed: true,
    note:
      category === 'urgent-safety'
        ? 'urgent safety escalation is always allowed; Observation-Only Mode never prevents raising an alarm'
        : 'raising an escalation is an observation-mode activity and is always permitted',
  };
}

export type EscalationState =
  | 'raised'
  | 'acknowledged'
  | 'under-human-review'
  | 'independent-human-review-required'
  | 'closed-by-human';

export interface EscalationRecord {
  id: string;
  category: EscalationCategory;
  originPost: StewardPostId;
  /** The post or authority the concern is about, when the concern is about one. */
  concernsPost: StewardPostId | 'founding-steward' | null;
  reviewer: EscalationReviewer;
  state: EscalationState;
  evidenceRefs: readonly string[];
  summary: string;
  acknowledgment: 'not-required' | 'required-pending' | 'acknowledged-by-human';
  acknowledgedByRef: string | null;
  /** Privacy-safe reference to the human who closed it; required for closure; never SOPHIA, never the origin post for serious matters. */
  closedByRef: string | null;
  humanDecisionRef: string | null;
  continuityRef: string | null;
  createdAt: string;
  updatedAt: string;
}
