/**
 * Canonical operational registry of the five Permanent Steward Posts.
 * Authority: docs/canonical/PERMANENT_STEWARD_POSTS_CHARTER.md and
 * docs/stewardship/STEWARD_OPERATIONS_REGISTRY_STANDARD.md — subordinate to
 * the Constitution and CHANGE_AUTHORITY.md. Where they differ, canon governs.
 *
 * This registry is the single source of operational truth. Every operational
 * surface (pages, summaries, review packets) must consume it through this
 * module; operational state is never hard-coded elsewhere. It is derived from
 * the ratified post registry (steward-posts.ts) so structural truth cannot
 * fork, and it grants no authority: it records state established by recorded
 * human decisions, and only such decisions may change it.
 */

import type { PostOperatingMode, StewardPostId } from './steward-posts.ts';
import { CURRENT_POST_MODE, STEWARD_POSTS, STEWARD_POST_IDS } from './steward-posts.ts';
import type { VacancyCoverageRecord, VacancyCoverageState } from './vacancy-coverage.ts';
import { CURRENT_VACANCY_COVERAGE, validateVacancyCoverage } from './vacancy-coverage.ts';

/** A post is an active institutional responsibility from ratification onward. */
export type InstitutionalState = 'active';

/** Occupancy is binary and truthful: a post is vacant until a recorded human appointment exists. */
export type OccupancyState = 'vacant' | 'occupied';

export interface StewardOperationsEntry {
  postId: StewardPostId;
  canonicalName: string;
  institutionalState: InstitutionalState;
  occupancyState: OccupancyState;
  operatingMode: PostOperatingMode;
  /** All five posts are human posts. Always true; validated. */
  humanOnly: true;
  /** Privacy-safe reference to the recorded appointment of the current occupant. Null while vacant. */
  currentOccupantRef: string | null;
  /** Vacancy coverage for this post (routing, never occupancy). */
  vacancyCoverage: VacancyCoverageRecord;
  /** ISO date of the last completed human review of this post's domain, if any. */
  lastReviewDate: string | null;
  /** ISO date of the next scheduled review, if scheduled. */
  nextReviewDate: string | null;
  /** Where this post's structure and authority come from. */
  authoritySource: string;
  /** Current authority scope. Observation-only until a recorded human decision changes it. */
  currentAuthorityScope: 'observation-only';
  /** Authority expansion beyond the Charter. Always 'none'; validated. */
  authorityExpansion: 'none';
  /** SOPHIA remains advisory for this post. Always true; validated. */
  sophiaAdvisoryOnly: true;
  /** SOPHIA decision authority. Always false; validated. */
  sophiaDecisionAuthority: false;
}

/** Open-work counts for a post, always derived from records — never stored as truth. */
export interface StewardOperationsCounts {
  openObservationCount: number;
  openHandoffCount: number;
  openEscalationCount: number;
  unresolvedDecisionCount: number;
}

/** An entry joined with its derived counts, for surfaces and review packets. */
export interface StewardOperationsStatus extends StewardOperationsEntry, StewardOperationsCounts {}

/**
 * The current real-world operational registry, derived from the ratified post
 * registry: all five posts active, vacant, observation-only, human-only, with
 * no occupant, no authority expansion, and vacancy coverage awaiting a human
 * decision. Changing any of this requires a recorded adopted steward decision
 * per CHANGE_AUTHORITY.md and is a human act — never an automated one.
 */
export const STEWARD_OPERATIONS_REGISTRY: readonly StewardOperationsEntry[] = STEWARD_POSTS.map(
  (post) => ({
    postId: post.id,
    canonicalName: post.canonicalName,
    institutionalState: 'active' as const,
    occupancyState: 'vacant' as const,
    operatingMode: CURRENT_POST_MODE,
    humanOnly: true as const,
    currentOccupantRef: null,
    vacancyCoverage:
      CURRENT_VACANCY_COVERAGE.find((c) => c.post === post.id) ??
      (() => {
        throw new Error(`no vacancy coverage record for post "${post.id}"`);
      })(),
    lastReviewDate: null,
    nextReviewDate: null,
    authoritySource: post.authoritySource,
    currentAuthorityScope: 'observation-only' as const,
    authorityExpansion: 'none' as const,
    sophiaAdvisoryOnly: true as const,
    sophiaDecisionAuthority: false as const,
  }),
);

export function getOperationsEntry(postId: StewardPostId): StewardOperationsEntry {
  const entry = STEWARD_OPERATIONS_REGISTRY.find((e) => e.postId === postId);
  if (!entry) throw new Error(`Unknown steward post id: ${postId}`);
  return entry;
}

/** Coverage state shorthand used by surfaces. */
export function coverageStateFor(postId: StewardPostId): VacancyCoverageState {
  return getOperationsEntry(postId).vacancyCoverage.state;
}

/**
 * Registry invariants, machine-checked:
 *
 *   Exactly five entries, one per Charter post, no duplicates.
 *   Every post is human-only and institutionally active.
 *   Occupancy claims require a recorded appointment reference; vacancy carries none.
 *   Operating mode matches the Charter-derived current mode.
 *   Authority scope is observation-only with no expansion.
 *   SOPHIA is advisory only and holds no decision authority.
 *   Vacancy coverage records are themselves valid and never treat routing as occupancy.
 */
export function validateOperationsRegistry(entries: readonly StewardOperationsEntry[]): string[] {
  const errors: string[] = [];

  if (entries.length !== 5)
    errors.push(`exactly five operational entries are required; found ${entries.length}`);

  const seen = new Set<string>();
  for (const id of STEWARD_POST_IDS) {
    if (!entries.some((e) => e.postId === id)) errors.push(`missing operational entry "${id}"`);
  }

  for (const entry of entries) {
    const at = `[${entry.postId || '?'}]`;

    if (seen.has(entry.postId)) errors.push(`${at} duplicate operational entry`);
    seen.add(entry.postId);

    if (!(STEWARD_POST_IDS as readonly string[]).includes(entry.postId))
      errors.push(`${at} unknown post id`);

    const post = STEWARD_POSTS.find((p) => p.id === entry.postId);
    if (post && entry.canonicalName !== post.canonicalName)
      errors.push(`${at} canonical name diverges from the ratified post registry`);
    if (post && entry.authoritySource !== post.authoritySource)
      errors.push(`${at} authority source diverges from the ratified post registry`);

    if (entry.humanOnly !== true) errors.push(`${at} every post is human-only`);
    if (entry.institutionalState !== 'active')
      errors.push(`${at} every ratified post is an active institutional responsibility`);
    if (entry.operatingMode !== CURRENT_POST_MODE)
      errors.push(`${at} operating mode must match the Charter-derived mode ("${CURRENT_POST_MODE}")`);
    if (entry.currentAuthorityScope !== 'observation-only')
      errors.push(`${at} authority scope beyond observation-only requires a recorded human decision that does not exist`);
    if (entry.authorityExpansion !== 'none') errors.push(`${at} no authority expansion exists`);
    if (entry.sophiaAdvisoryOnly !== true) errors.push(`${at} SOPHIA is advisory only`);
    if (entry.sophiaDecisionAuthority !== false)
      errors.push(`${at} SOPHIA decision authority must always be false`);

    if (entry.occupancyState === 'occupied' && !entry.currentOccupantRef)
      errors.push(`${at} occupancy requires a recorded human appointment reference`);
    if (entry.occupancyState === 'vacant' && entry.currentOccupantRef)
      errors.push(`${at} a vacant post carries no occupant reference — vacancy is not occupancy`);
    if (entry.currentOccupantRef && /sophia/i.test(entry.currentOccupantRef))
      errors.push(`${at} SOPHIA may never occupy a post`);

    if (entry.vacancyCoverage.post !== entry.postId)
      errors.push(`${at} vacancy coverage record belongs to a different post`);
    errors.push(...validateVacancyCoverage(entry.vacancyCoverage));
    if (entry.occupancyState === 'vacant' && entry.vacancyCoverage.state === 'ended-by-appointment')
      errors.push(`${at} coverage cannot be ended-by-appointment while the post is vacant`);
  }

  return errors;
}
