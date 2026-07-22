/**
 * Vacancy coverage model for the five Permanent Steward Posts.
 * Authority: docs/canonical/PERMANENT_STEWARD_POSTS_CHARTER.md §9,
 * docs/stewardship/STEWARD_HANDOFF_AND_ESCALATION_PROTOCOL.md, and
 * docs/stewardship/VACANCY_COVERAGE_OPERATING_PLAN.md — subordinate to the
 * Constitution and CHANGE_AUTHORITY.md.
 *
 * Vacancy coverage answers one narrow question: while a post is vacant, who —
 * if anyone — temporarily receives matters addressed to it. It confers no
 * occupancy and no authority. Designating a temporary receiver is a recorded
 * human decision; until that decision exists, coverage truthfully reads
 * `awaiting-human-decision` and this module refuses to invent an answer.
 */

import type { StewardPostId } from './steward-posts.ts';
import { STEWARD_POST_IDS } from './steward-posts.ts';

/** Coverage states. `temporarily-routed` is the only state naming a receiver. */
export type VacancyCoverageState =
  | 'unassigned'
  | 'awaiting-human-decision'
  | 'temporarily-routed'
  | 'conflict-restricted'
  | 'suspended'
  | 'ended-by-appointment';

export const VACANCY_COVERAGE_STATES: readonly VacancyCoverageState[] = [
  'unassigned',
  'awaiting-human-decision',
  'temporarily-routed',
  'conflict-restricted',
  'suspended',
  'ended-by-appointment',
] as const;

/** Plain-language meaning of each state, for public surfaces (status is never a bare code). */
export const VACANCY_COVERAGE_MEANING: Readonly<Record<VacancyCoverageState, string>> = {
  unassigned: 'No temporary receiver exists and none has been proposed yet.',
  'awaiting-human-decision':
    'A human decision about temporary routing has been requested but not made. The system will not invent an answer or proceed automatically.',
  'temporarily-routed':
    'A recorded human decision designated a temporary receiver for incoming matters. This is routing, not occupancy: the post remains vacant and no authority is conferred.',
  'conflict-restricted':
    'The proposed or designated receiver has a declared conflict for this matter or post; routing is restricted until a human resolves the conflict.',
  suspended: 'Temporary routing was suspended by a recorded human decision.',
  'ended-by-appointment':
    'A recorded human appointment ended temporary routing; the appointed steward now receives matters.',
};

export interface VacancyCoverageRecord {
  post: StewardPostId;
  state: VacancyCoverageState;
  /** Privacy-safe reference to the designated temporary receiver. Only in `temporarily-routed`. Never SOPHIA. */
  temporaryReceiverRef: string | null;
  /** Reference to the recorded human decision establishing this state (required for routed/suspended/ended states). */
  humanDecisionRef: string | null;
  /** Explicit scope boundaries of any routing (what the receiver may receive — never what they may decide). */
  scopeBoundaries: readonly string[];
  /** Recusal requirements attached to the routing. */
  recusalRequirements: readonly string[];
  /** ISO date the current state took effect, if a recorded decision established it. */
  effectiveDate: string | null;
  /** ISO date by which a human must review the routing. Required while `temporarily-routed`. */
  reviewDate: string | null;
  /** Routing terminates automatically upon appointment — structurally always true. */
  terminatesUponAppointment: true;
}

/**
 * Invariants:
 *   Temporary routing exists only with a recorded human decision, a named
 *   receiver reference, and a review date.
 *   SOPHIA is never a receiver.
 *   Routing is not occupancy: no state may claim the post is occupied.
 *   `ended-by-appointment` requires the appointment decision reference.
 *   Every other state carries no receiver.
 */
export function validateVacancyCoverage(record: VacancyCoverageRecord): string[] {
  const errors: string[] = [];
  const at = `[${record.post}:${record.state}]`;

  if (!(STEWARD_POST_IDS as readonly string[]).includes(record.post))
    errors.push(`${at} unknown post — the Charter establishes five and only five posts`);

  if (!(VACANCY_COVERAGE_STATES as readonly string[]).includes(record.state))
    errors.push(`${at} unknown vacancy coverage state`);

  if (record.terminatesUponAppointment !== true)
    errors.push(`${at} temporary routing must terminate upon appointment`);

  if (record.temporaryReceiverRef && /sophia/i.test(record.temporaryReceiverRef))
    errors.push(`${at} SOPHIA may never be a temporary receiver — all five posts are human posts`);

  if (record.state === 'temporarily-routed') {
    if (!record.humanDecisionRef)
      errors.push(`${at} temporary routing requires a recorded human decision`);
    if (!record.temporaryReceiverRef)
      errors.push(`${at} temporary routing requires a receiver reference`);
    if (!record.reviewDate)
      errors.push(`${at} temporary routing requires a review date`);
    if (record.scopeBoundaries.length === 0)
      errors.push(`${at} temporary routing requires explicit scope boundaries`);
  } else if (record.temporaryReceiverRef) {
    errors.push(`${at} only "temporarily-routed" may carry a receiver reference`);
  }

  if (
    (record.state === 'suspended' || record.state === 'ended-by-appointment') &&
    !record.humanDecisionRef
  )
    errors.push(`${at} "${record.state}" requires the recorded human decision reference that caused it`);

  if (
    (record.state === 'unassigned' || record.state === 'awaiting-human-decision') &&
    record.humanDecisionRef
  )
    errors.push(`${at} "${record.state}" must not carry a decision reference — no decision has been made`);

  return errors;
}

/**
 * Documented review cadence for open vacancy-routed matters (SD-2026-07-22-02).
 * The cadence is a human obligation the calendar can display; missing a
 * scheduled review never closes, approves, rejects, or otherwise changes an
 * open matter.
 */
export const VACANCY_ROUTED_MATTER_REVIEW_CADENCE = 'weekly';

/**
 * True when the temporary receiver of record is the subject of (or materially
 * conflicted on) a matter. Such a matter can never be finally reviewed or
 * closed by the receiver; it enters independent-human-review-required
 * (escalation engine) until a human designates an independent reviewer.
 */
export function receiverSelfConflict(
  coverage: VacancyCoverageRecord,
  subjectRef: string | null,
): boolean {
  if (!coverage.temporaryReceiverRef || !subjectRef) return false;
  const receiver = coverage.temporaryReceiverRef.toLowerCase();
  const subject = subjectRef.toLowerCase();
  return (
    receiver === subject ||
    receiver.includes(subject) ||
    subject.includes(receiver) ||
    (receiver.includes('founding-steward') && subject.includes('founding-steward'))
  );
}

/**
 * The current real-world coverage: adopted by recorded human steward decision
 * SD-2026-07-22-02 (Maurice Jackson, founding steward, July 22, 2026 — see
 * docs/stewardship/decisions/). Maurice Jackson, founding steward, is the
 * temporary receiver of record for all five vacant posts. This is routing,
 * not occupancy: every post remains vacant, human-only, observation-only,
 * with no occupant and no expanded authority; routing ends per post upon
 * appointment or a later adopted decision. This array changes only alongside
 * recorded human decisions.
 */
export const CURRENT_VACANCY_COVERAGE: readonly VacancyCoverageRecord[] = STEWARD_POST_IDS.map(
  (post) => ({
    post,
    state: 'temporarily-routed' as const,
    temporaryReceiverRef: 'founding-steward:maurice-jackson',
    humanDecisionRef: 'SD-2026-07-22-02',
    scopeBoundaries: [
      'receive',
      'acknowledge',
      'preserve',
      'classify',
      'request-clarification',
      'identify-human-review-route',
      'initiate-handoff',
      'initiate-escalation',
      'place-on-review-agenda',
      'preserve-continuity',
      'record-decision-pending',
    ],
    recusalRequirements: [
      'self-conflict-matters-enter-independent-human-review-required',
      'no-final-review-or-closure-of-matters-concerning-the-receiver',
    ],
    effectiveDate: '2026-07-22',
    reviewDate: '2026-10-20',
    terminatesUponAppointment: true,
  }),
);
