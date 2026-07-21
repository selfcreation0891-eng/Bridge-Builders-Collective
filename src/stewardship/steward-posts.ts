/**
 * Typed registry of the five Permanent Steward Posts.
 * Authority: docs/canonical/PERMANENT_STEWARD_POSTS_CHARTER.md (ratified 2026-07-20, SD-2026-07-20-01),
 * subordinate to the Bridge Builders Constitution and docs/canonical/CHANGE_AUTHORITY.md.
 *
 * This module encodes the Charter's structural invariants so contradictory role
 * definitions fail validation. It grants no authority: it is a machine-checkable
 * mirror of the Charter, and where they differ the Charter (and above it, the
 * Constitution) governs.
 */

export type StewardPostId =
  | 'orientation'
  | 'continuity'
  | 'vocabulary'
  | 'product'
  | 'institutional';

export const STEWARD_POST_IDS: readonly StewardPostId[] = [
  'orientation',
  'continuity',
  'vocabulary',
  'product',
  'institutional',
] as const;

/** Charter lifecycle state. Pre-ratification, the Charter is inactive. */
export type CharterStatus = 'pending-ratification' | 'ratified-observation-only';

/** Operating mode of a post. Observation-only is the sole initial mode. */
export type PostOperatingMode = 'inactive' | 'observation-only';

export interface StewardPost {
  id: StewardPostId;
  canonicalName: string;
  /** All five posts are human posts. Always true; validated. */
  humanOnly: true;
  purpose: string;
  /** Initial mode after ratification. Always 'observation-only'; validated. */
  initialMode: 'observation-only';
  observationResponsibilities: readonly string[];
  permittedActions: readonly string[];
  prohibitedActions: readonly string[];
  /** Posts this post hands off to. Every post has at least one route; validated. */
  handoffTargets: readonly (StewardPostId | 'founding-steward')[];
  authoritySource: string;
  /** SOPHIA may support every post. */
  sophiaSupportAllowed: true;
  /** SOPHIA holds no decision authority. Always false; validated. */
  sophiaDecisionAuthority: false;
}

/**
 * Current Charter status. Ratified — observation-only activation: adopted by
 * recorded human steward decision SD-2026-07-20-01 (Maurice Jackson, founding
 * steward, July 20, 2026 — see docs/stewardship/decisions/). All five posts are
 * active as institutional responsibilities, observation-only, and vacant.
 * Changing this value requires a recorded adopted steward decision per
 * CHANGE_AUTHORITY.md and is a human act — never an automated one.
 */
export const CHARTER_STATUS: CharterStatus = 'ratified-observation-only';

/** Derives the posts' operating mode from a Charter status. */
export function postModeFor(status: CharterStatus): PostOperatingMode {
  return status === 'pending-ratification' ? 'inactive' : 'observation-only';
}

/** Post-ratification, every post operates observation-only (vacant until appointed). */
export const CURRENT_POST_MODE: PostOperatingMode = postModeFor(CHARTER_STATUS);

const SHARED_PERMITTED: readonly string[] = [
  'observe',
  'record',
  'classify',
  'preserve-context',
  'request-information',
  'draft-recommendations',
  'initiate-handoff',
  'initiate-escalation',
  'prepare-review-packets',
] as const;

const SHARED_PROHIBITED: readonly string[] = [
  'publish',
  'approve',
  'reject',
  'merge',
  'deploy',
  'alter-participant-access',
  'change-permissions',
  'change-canonical-definitions',
  'change-public-status',
  'remove-content',
  'discipline',
  'appoint-steward',
  'remove-steward',
  'self-certify',
  'close-own-serious-escalation',
  'represent-recommendation-as-decision',
] as const;

export const STEWARD_POSTS: readonly StewardPost[] = [
  {
    id: 'orientation',
    canonicalName: 'Orientation Steward',
    humanOnly: true,
    purpose:
      'Protect informed orientation: identify where people lack the context to understand what Bridge Builders is, what exists, what does not yet exist, what participation means, and what authority they do or do not have.',
    initialMode: 'observation-only',
    observationResponsibilities: [
      'detect-missing-context',
      'review-newcomer-understanding',
      'identify-confusing-entry-points',
      'review-onboarding-language',
      'identify-misleading-participation-expectations',
      'review-cognitive-emotional-accessibility',
      'distinguish-orientation-from-persuasion',
      'create-vocabulary-candidates',
    ],
    permittedActions: SHARED_PERMITTED,
    prohibitedActions: [
      ...SHARED_PROHIBITED,
      'manipulate-participation',
      'promise-outcomes',
      'pressure-continuation',
      'conceal-incomplete-states',
      'rewrite-canonical-vocabulary',
      'approve-public-claims',
      'override-accessibility-concerns',
      'diagnose-participant',
      'convert-uncertainty-into-false-certainty',
    ],
    handoffTargets: ['vocabulary', 'product', 'continuity', 'institutional'],
    authoritySource: 'docs/canonical/PERMANENT_STEWARD_POSTS_CHARTER.md §4.1',
    sophiaSupportAllowed: true,
    sophiaDecisionAuthority: false,
  },
  {
    id: 'continuity',
    canonicalName: 'Continuity Steward',
    humanOnly: true,
    purpose:
      'Protect relationships, records, institutional memory, handoffs, archival integrity, and operational continuity across sessions, releases, people, and generations.',
    initialMode: 'observation-only',
    observationResponsibilities: [
      'preserve-relationships-and-context',
      'maintain-continuity-notes',
      'identify-abandoned-decisions',
      'review-handoff-completeness',
      'protect-archive-lineage',
      'track-succession-readiness',
      'identify-single-person-dependencies',
      'protect-consent-history',
      'coordinate-continuity-certification-review',
    ],
    permittedActions: SHARED_PERMITTED,
    prohibitedActions: [
      ...SHARED_PROHIBITED,
      'change-prior-decision-without-authority',
      'rewrite-historical-records',
      'conceal-disagreement',
      'treat-engagement-metrics-as-continuity',
      'retain-information-beyond-consent-or-policy',
      'publish-archive-material',
      'reinterpret-contributor-permissions',
      'certify-continuity-without-evidence-and-human-review',
    ],
    handoffTargets: ['institutional', 'vocabulary', 'product'],
    authoritySource: 'docs/canonical/PERMANENT_STEWARD_POSTS_CHARTER.md §4.2',
    sophiaSupportAllowed: true,
    sophiaDecisionAuthority: false,
  },
  {
    id: 'vocabulary',
    canonicalName: 'Vocabulary Steward',
    humanOnly: true,
    purpose:
      'Protect canonical meaning, naming consistency, System Rosetta Stone alignment, public-language clarity, and faithful translation between human meaning and implementation language.',
    initialMode: 'observation-only',
    observationResponsibilities: [
      'identify-noncanonical-language',
      'detect-vocabulary-drift',
      'collect-proposed-terms',
      'record-rosetta-candidates',
      'preserve-protected-user-created-terms',
      'flag-authority-implying-language',
      'maintain-term-lineage',
      'prepare-vocabulary-change-proposals',
    ],
    permittedActions: SHARED_PERMITTED,
    prohibitedActions: [
      ...SHARED_PROHIBITED,
      'silently-rename-canonical-terms',
      'correct-protected-user-created-terms',
      'approve-vocabulary-without-authority',
      'change-definitions-for-implementation-shortcuts',
      'exaggerate-readiness-or-outcomes',
      'allow-sophia-vocabulary-approval',
    ],
    handoffTargets: ['institutional', 'orientation', 'product', 'continuity'],
    authoritySource: 'docs/canonical/PERMANENT_STEWARD_POSTS_CHARTER.md §4.3',
    sophiaSupportAllowed: true,
    sophiaDecisionAuthority: false,
  },
  {
    id: 'product',
    canonicalName: 'Product Steward',
    humanOnly: true,
    purpose:
      'Protect coherence between constitutional intent, public experience, product behavior, navigation, accessibility, status declarations, trust notices, and participation pathways.',
    initialMode: 'observation-only',
    observationResponsibilities: [
      'review-ux-coherence',
      'identify-broken-or-misleading-pathways',
      'compare-implementation-against-registry-truth',
      'review-accessibility-evidence',
      'verify-honest-status-labels',
      'detect-dead-ends-and-missing-handoffs',
      'identify-manipulative-product-behavior',
      'preserve-release-evidence',
    ],
    permittedActions: SHARED_PERMITTED,
    prohibitedActions: [
      ...SHARED_PROHIBITED,
      'merge-or-deploy-from-own-concern',
      'change-canonical-truth-to-match-downstream-error',
      'approve-own-consequential-change',
      'bypass-ci-accessibility-security-or-human-review',
      'represent-preview-as-complete',
      'use-engagement-optimization-against-principles',
      'authorize-sophia-production-changes',
    ],
    handoffTargets: ['orientation', 'vocabulary', 'continuity', 'institutional'],
    authoritySource: 'docs/canonical/PERMANENT_STEWARD_POSTS_CHARTER.md §4.4',
    sophiaSupportAllowed: true,
    sophiaDecisionAuthority: false,
  },
  {
    id: 'institutional',
    canonicalName: 'Institutional Steward',
    humanOnly: true,
    purpose:
      'Protect constitutional integrity, accountable governance, authority boundaries, institutional claims, documented decisions, escalation fairness, and the proper exercise of human stewardship. A human stewardship post; SOPHIA must never occupy it.',
    initialMode: 'observation-only',
    observationResponsibilities: [
      'review-governance-conformity',
      'preserve-authority-boundaries',
      'confirm-decision-records-exist',
      'review-escalated-cross-post-concerns',
      'identify-constitutional-conflicts',
      'review-institutional-and-partnership-claims',
      'verify-appointments-and-removals-follow-charter',
      'maintain-conflict-of-interest-disclosures',
      'route-constitutional-matters-to-founding-stewards',
    ],
    permittedActions: SHARED_PERMITTED,
    prohibitedActions: [
      ...SHARED_PROHIBITED,
      'override-constitution',
      'approve-constitutional-amendments-without-founding-authority',
      'grant-self-unlimited-authority',
      'use-sophia-as-proxy-decision-maker',
      'conceal-dissent',
      'combine-separated-roles',
      'discipline-or-remove-without-documented-process',
      'convert-interest-into-partnership-claim-without-evidence',
    ],
    handoffTargets: ['founding-steward', 'continuity', 'vocabulary'],
    authoritySource: 'docs/canonical/PERMANENT_STEWARD_POSTS_CHARTER.md §4.5',
    sophiaSupportAllowed: true,
    sophiaDecisionAuthority: false,
  },
] as const;

/**
 * Charter invariants, machine-checked:
 *
 *   All five posts are human-only.
 *   All five begin observation-only.
 *   SOPHIA decision authority is always false.
 *   No post may override constitutional authority.
 *   Institutional Steward is not SOPHIA.
 *   Every post has at least one handoff route.
 *   Every consequential action requires recorded human authority.
 *
 * Returns human-readable violations; an empty list means the registry honors the Charter.
 */
export function validateStewardPosts(posts: readonly StewardPost[]): string[] {
  const errors: string[] = [];

  if (posts.length !== 5) {
    errors.push(`exactly five Permanent Steward Posts are established; found ${posts.length}`);
  }

  const seen = new Set<string>();
  for (const id of STEWARD_POST_IDS) {
    if (!posts.some((p) => p.id === id)) errors.push(`missing post "${id}"`);
  }

  for (const post of posts) {
    const at = `[${post.id || '?'}]`;

    if (seen.has(post.id)) errors.push(`${at} duplicate post id`);
    seen.add(post.id);

    if (!(STEWARD_POST_IDS as readonly string[]).includes(post.id))
      errors.push(`${at} unknown post id — the Charter establishes five and only five posts`);

    if (post.humanOnly !== true) errors.push(`${at} every post must be human-only`);

    if (post.initialMode !== 'observation-only')
      errors.push(`${at} every post must begin in observation-only mode`);

    if (post.sophiaDecisionAuthority !== false)
      errors.push(`${at} SOPHIA decision authority must always be false`);

    if (post.sophiaSupportAllowed !== true)
      errors.push(`${at} SOPHIA advisory support extends to all five posts`);

    if (post.handoffTargets.length < 1)
      errors.push(`${at} every post must have at least one handoff route`);

    for (const target of post.handoffTargets) {
      if (target === post.id) errors.push(`${at} handoff self-reference`);
      if (target !== 'founding-steward' && !(STEWARD_POST_IDS as readonly string[]).includes(target))
        errors.push(`${at} invalid handoff target "${target}"`);
    }

    if (!post.purpose) errors.push(`${at} missing purpose`);
    if (!post.authoritySource) errors.push(`${at} missing authority source`);
    if (post.observationResponsibilities.length === 0)
      errors.push(`${at} missing observation responsibilities`);

    // No post may override constitutional authority; consequential actions require
    // recorded human authority. Structurally: every shared consequential action
    // must appear in the post's prohibited list (posts may not execute them
    // unilaterally), and none may appear as permitted.
    for (const consequential of SHARED_PROHIBITED) {
      if (!post.prohibitedActions.includes(consequential))
        errors.push(`${at} consequential action "${consequential}" must be prohibited without recorded human authority`);
      if (post.permittedActions.includes(consequential))
        errors.push(`${at} consequential action "${consequential}" may not be a permitted unilateral action`);
    }

    if (post.id === 'institutional') {
      if (!post.prohibitedActions.includes('override-constitution'))
        errors.push(`${at} must explicitly prohibit overriding the Constitution`);
      if (!/SOPHIA must never occupy/.test(post.purpose))
        errors.push(`${at} must state that SOPHIA never occupies this post`);
      if (!post.handoffTargets.includes('founding-steward'))
        errors.push(`${at} must route to founding steward(s)`);
    }
  }

  return errors;
}
