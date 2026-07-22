/**
 * Review calendar — the ratified review cadence as a deterministic generator.
 * Authority: docs/canonical/PERMANENT_STEWARD_POSTS_CHARTER.md §10 and
 * docs/stewardship/STEWARD_REVIEW_CADENCE_OPERATING_GUIDE.md.
 *
 * Cadence: weekly observation review; monthly cross-post continuity review;
 * quarterly authority review. Dates are computed from a supplied anchor date —
 * this module never reads the clock and never sends notifications (the
 * repository has no notification system, and none is invented here).
 *
 * A scheduled — or even completed — meeting is not proof of continuity.
 * Continuity certification follows CONTINUITY_CERTIFICATION_STANDARD.md and
 * requires evidence plus human review; this calendar only schedules.
 */

import type { StewardPostId } from './steward-posts.ts';
import { STEWARD_POST_IDS } from './steward-posts.ts';

export type ReviewType =
  | 'weekly-observation'
  | 'monthly-cross-post-continuity'
  | 'quarterly-authority';

export const REVIEW_TYPES: readonly ReviewType[] = [
  'weekly-observation',
  'monthly-cross-post-continuity',
  'quarterly-authority',
] as const;

/** Who convenes each review, per Charter §10. While posts are vacant this is a responsibility awaiting a human, not an empty claim. */
export const REVIEW_CONVENER: Readonly<Record<ReviewType, StewardPostId | 'founding-steward'>> = {
  'weekly-observation': 'continuity',
  'monthly-cross-post-continuity': 'continuity',
  'quarterly-authority': 'institutional',
};

export type ConvenerState = 'vacant-post-awaiting-human-decision' | 'human-designated';

const DAY_MS = 86_400_000;

function parseIsoDate(iso: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) throw new Error(`invalid ISO date "${iso}"`);
  const t = Date.parse(`${iso}T00:00:00Z`);
  if (Number.isNaN(t)) throw new Error(`unparseable ISO date "${iso}"`);
  return t;
}

function toIso(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/**
 * Deterministic review dates from an anchor date.
 *   weekly: every 7 days.
 *   monthly: same day-of-month each following month (clamped to month length).
 *   quarterly: every third month, same clamping.
 */
export function generateReviewDates(type: ReviewType, anchorIsoDate: string, count: number): string[] {
  if (!Number.isInteger(count) || count < 1 || count > 400)
    throw new Error(`count must be an integer 1..400, got ${count}`);
  const anchor = parseIsoDate(anchorIsoDate);
  const dates: string[] = [];
  if (type === 'weekly-observation') {
    for (let i = 0; i < count; i++) dates.push(toIso(anchor + i * 7 * DAY_MS));
    return dates;
  }
  const monthsStep = type === 'monthly-cross-post-continuity' ? 1 : 3;
  const d = new Date(anchor);
  const day = d.getUTCDate();
  for (let i = 0; i < count; i++) {
    const target = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + i * monthsStep, 1));
    const daysInMonth = new Date(
      Date.UTC(target.getUTCFullYear(), target.getUTCMonth() + 1, 0),
    ).getUTCDate();
    target.setUTCDate(Math.min(day, daysInMonth));
    dates.push(toIso(target.getTime()));
  }
  return dates;
}

/** The next scheduled date of a type strictly after `afterIsoDate`. */
export function nextReviewDate(type: ReviewType, anchorIsoDate: string, afterIsoDate: string): string {
  const after = parseIsoDate(afterIsoDate);
  // 400 steps cover > 7 years for every cadence.
  for (const date of generateReviewDates(type, anchorIsoDate, 400)) {
    if (parseIsoDate(date) > after) return date;
  }
  throw new Error('no next review date within the generated horizon');
}

export interface ReviewEvent {
  id: string;
  type: ReviewType;
  scheduledDate: string;
  convener: StewardPostId | 'founding-steward';
  convenerState: ConvenerState;
  requiredRecords: readonly string[];
  participatingPosts: readonly StewardPostId[];
  /** Unresolved items carried forward from the previous review. Nothing is dropped by the passage of a meeting. */
  carryforwardRecordIds: readonly string[];
  conflictAndRecusalDeclarations: readonly string[];
  evidenceReviewedRefs: readonly string[];
  /** Draft recommendations produced. Recommendations are not decisions. */
  recommendationRecordIds: readonly string[];
  /** References to decisions ADOPTED BY HUMANS during or after review. Never populated by automation. */
  adoptedDecisionRefs: readonly string[];
  nextReviewDate: string | null;
  /** A completed review never certifies continuity by itself. Always false here; certification lives in CONTINUITY_CERTIFICATION_STANDARD.md. */
  certifiesContinuity: false;
  status: 'scheduled' | 'held' | 'not-held';
}

export function validateReviewEvent(event: ReviewEvent): string[] {
  const errors: string[] = [];
  const at = `[${event.id || '?'}:${event.type}]`;

  if (!(REVIEW_TYPES as readonly string[]).includes(event.type))
    errors.push(`${at} unknown review type`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(event.scheduledDate))
    errors.push(`${at} malformed scheduled date`);
  if (event.certifiesContinuity !== false)
    errors.push(`${at} a review meeting is not proof of continuity — certification requires the continuity certification standard`);
  if (event.convener !== REVIEW_CONVENER[event.type])
    errors.push(`${at} convener contradicts Charter §10 ("${REVIEW_CONVENER[event.type]}")`);
  for (const p of event.participatingPosts) {
    if (!(STEWARD_POST_IDS as readonly string[]).includes(p))
      errors.push(`${at} unknown participating post "${p}"`);
  }
  if (event.status === 'held') {
    if (event.evidenceReviewedRefs.length === 0)
      errors.push(`${at} a held review must record the evidence it reviewed`);
    if (event.participatingPosts.length === 0)
      errors.push(`${at} a held review must record participating posts`);
  }
  if (event.adoptedDecisionRefs.some((r) => /sophia/i.test(r)))
    errors.push(`${at} SOPHIA can never be an adopting authority`);
  return errors;
}
