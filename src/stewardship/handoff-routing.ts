/**
 * Canonical handoff routing between the Permanent Steward Posts.
 * Authority: docs/stewardship/STEWARD_HANDOFF_AND_ESCALATION_PROTOCOL.md
 * ("Required handoff routes") — this module is its machine-checkable mirror
 * and alters no authority.
 */

import type { StewardPostId } from './steward-posts.ts';
import { STEWARD_POST_IDS } from './steward-posts.ts';
import type {
  AcknowledgmentState,
  RecordClassification,
  RecordUrgency,
} from './operations-records.ts';

export type HandoffDestination = StewardPostId | 'founding-steward';

export interface CanonicalRoute {
  from: StewardPostId | 'any-post';
  to: HandoffDestination;
  reason: string;
}

/** The protocol's named routes. `any-post` routes are open to all five posts. */
export const CANONICAL_HANDOFF_ROUTES: readonly CanonicalRoute[] = [
  { from: 'orientation', to: 'vocabulary', reason: 'unclear, misleading, or unexplained language' },
  { from: 'orientation', to: 'product', reason: 'broken, inaccessible, or confusing participation pathway' },
  { from: 'product', to: 'orientation', reason: 'interface or product experience lacks understandable human meaning' },
  { from: 'product', to: 'vocabulary', reason: 'interface labels conflict with canonical vocabulary' },
  { from: 'vocabulary', to: 'institutional', reason: 'language change implicates authority, consent, or governance' },
  { from: 'continuity', to: 'institutional', reason: 'continuity risk implicates authority or governance' },
  {
    from: 'any-post',
    to: 'continuity',
    reason: 'context, evidence, decisions, relationships, permissions, or succession material must be preserved',
  },
  {
    from: 'any-post',
    to: 'institutional',
    reason: 'authority, consent, safety, governance, institutional claim, conflict, or consequential-boundary concern',
  },
  { from: 'institutional', to: 'founding-steward', reason: 'issue exceeds delegated authority' },
] as const;

/** Whether a route is canonically allowed (self-routing is handled by validation, not here). */
export function isRouteAllowed(from: StewardPostId, to: HandoffDestination): boolean {
  if (!(STEWARD_POST_IDS as readonly string[]).includes(from)) return false;
  if (to !== 'founding-steward' && !(STEWARD_POST_IDS as readonly string[]).includes(to)) return false;
  return CANONICAL_HANDOFF_ROUTES.some(
    (r) => (r.from === from || r.from === 'any-post') && r.to === to,
  );
}

/** The canonical reasons available for a given route. */
export function routeReasons(from: StewardPostId, to: HandoffDestination): readonly string[] {
  return CANONICAL_HANDOFF_ROUTES.filter(
    (r) => (r.from === from || r.from === 'any-post') && r.to === to,
  ).map((r) => r.reason);
}

export type HandoffDisposition =
  | 'pending'
  | 'accepted-for-review'
  | 'returned-with-questions'
  | 'recommendation-drafted'
  | 'closed-by-human';

export interface HandoffRecord {
  id: string;
  origin: StewardPostId;
  destination: HandoffDestination;
  /** Why this handoff exists — a canonical route reason, or a documented reason for exceptional routing. */
  reason: string;
  /** Required documented justification when origin === destination. */
  selfRoutingJustification: string | null;
  evidenceRefs: readonly string[];
  urgency: RecordUrgency;
  classification: RecordClassification;
  requestedReview: string;
  acknowledgment: AcknowledgmentState;
  acknowledgedByRef: string | null;
  unresolvedQuestions: readonly string[];
  disposition: HandoffDisposition;
  /** Reference to the recorded human decision, required if the disposition claims closure. */
  humanDecisionRef: string | null;
  /** Continuity ledger reference preserving this handoff's lineage. */
  continuityRef: string | null;
  createdAt: string;
  updatedAt: string;
}
