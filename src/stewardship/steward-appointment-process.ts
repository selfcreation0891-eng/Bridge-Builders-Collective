/**
 * Typed state model for the Steward Eligibility, Orientation, and Appointment
 * Process v1 (Pending Ratification).
 * Authority: docs/stewardship/STEWARD_ELIGIBILITY_ORIENTATION_AND_APPOINTMENT_PROCESS.md,
 * subordinate to the Constitution, CHANGE_AUTHORITY.md, and the Permanent
 * Steward Posts Charter.
 *
 * This module exists to prevent contradictory candidacy states, not to
 * duplicate the Markdown standards. It grants no authority and automates no
 * decision: every consequential transition it models requires a recorded human
 * decision outside this code. Where code and canon differ, canon governs.
 */

import type { StewardPostId } from './steward-posts.ts';
import { STEWARD_POST_IDS } from './steward-posts.ts';

/** Ratification state of the appointment process itself. */
export type AppointmentProcessStatus = 'pending-ratification' | 'ratified';

/**
 * Pending ratification: no candidacy may be opened, no orientation completion
 * recorded, no appointment made under this process. Changing this value
 * requires a recorded adopted steward decision per CHANGE_AUTHORITY.md and is
 * a human act — never an automated one.
 */
export const APPOINTMENT_PROCESS_STATUS: AppointmentProcessStatus = 'pending-ratification';

/** Candidacy states, per the process standard's stages and outcomes. */
export type CandidacyState =
  | 'vacant'
  | 'nomination-received'
  | 'candidate-consent-pending'
  | 'eligibility-review'
  | 'orientation-in-progress'
  | 'orientation-complete'
  | 'readiness-review'
  | 'eligible-for-appointment-consideration'
  | 'appointment-decision-pending'
  | 'appointed-observation-only'
  | 'appointment-deferred'
  | 'candidate-withdrew'
  | 'candidacy-closed';

export const CANDIDACY_STATES: readonly CandidacyState[] = [
  'vacant',
  'nomination-received',
  'candidate-consent-pending',
  'eligibility-review',
  'orientation-in-progress',
  'orientation-complete',
  'readiness-review',
  'eligible-for-appointment-consideration',
  'appointment-decision-pending',
  'appointed-observation-only',
  'appointment-deferred',
  'candidate-withdrew',
  'candidacy-closed',
] as const;

/**
 * The only appointed state is observation-only. There is intentionally no
 * 'appointed-expanded-authority' state: appointment never changes a post's
 * mode or authority (process standard; Charter; observation-only protocol).
 */
export const APPOINTED_STATES: readonly CandidacyState[] = ['appointed-observation-only'] as const;

/** Forward transitions of the ordinary path plus exits. Withdrawal is allowed from every active state. */
const ALLOWED_TRANSITIONS: Readonly<Record<CandidacyState, readonly CandidacyState[]>> = {
  vacant: ['nomination-received'],
  'nomination-received': ['candidate-consent-pending', 'candidacy-closed', 'candidate-withdrew'],
  'candidate-consent-pending': ['eligibility-review', 'candidacy-closed', 'candidate-withdrew'],
  'eligibility-review': ['orientation-in-progress', 'candidacy-closed', 'candidate-withdrew'],
  'orientation-in-progress': ['orientation-complete', 'candidacy-closed', 'candidate-withdrew'],
  'orientation-complete': ['readiness-review', 'candidacy-closed', 'candidate-withdrew'],
  'readiness-review': [
    'eligible-for-appointment-consideration',
    'orientation-in-progress', // additional orientation recommended
    'candidacy-closed',
    'candidate-withdrew',
  ],
  'eligible-for-appointment-consideration': [
    'appointment-decision-pending',
    'appointment-deferred',
    'candidacy-closed',
    'candidate-withdrew',
  ],
  'appointment-decision-pending': [
    'appointed-observation-only',
    'appointment-deferred',
    'candidacy-closed',
    'candidate-withdrew',
  ],
  'appointed-observation-only': [], // occupancy changes are governed by Charter §9 (rotation, absence, removal), not by this candidacy model
  'appointment-deferred': ['appointment-decision-pending', 'candidacy-closed', 'candidate-withdrew'],
  'candidate-withdrew': [],
  'candidacy-closed': [],
};

export interface CandidacyRecord {
  post: StewardPostId;
  state: CandidacyState;
  /** Reference to the recorded candidate consent. Required beyond nomination. */
  consentRecordRef: string | null;
  /** Reference to the recorded human appointment decision. Required for appointment. */
  humanDecisionRecordRef: string | null;
  /** Reference to the appointee's recorded acceptance. Required for appointment. */
  acceptanceRecordRef: string | null;
  /** Named human decision authority. Never SOPHIA. Never the candidate. */
  decisionAuthority: string | null;
  /** Candidate identity reference (private-record pointer, not personal data). */
  candidateRef: string | null;
  /** Scheduled review date for an appointment. Required for appointment. */
  reviewDateRef: string | null;
  /** True when this person may occupy more than one post. */
  multiplePostOccupancy: boolean;
  /** Reference to the concentration-of-authority review. Required when multiplePostOccupancy. */
  concentrationReviewRef: string | null;
  /** SOPHIA appointment authority. Always false; validated. */
  sophiaAppointmentAuthority: false;
}

export function isTransitionAllowed(from: CandidacyState, to: CandidacyState): boolean {
  return ALLOWED_TRANSITIONS[from]?.includes(to) ?? false;
}

/**
 * Process invariants, machine-checked:
 *
 *   No candidate becomes appointed without a human decision record.
 *   No appointment may exist without candidate acceptance.
 *   No appointed occupant receives a mode beyond observation-only.
 *   SOPHIA appointment authority is always false.
 *   Orientation completion does not equal appointment.
 *   Eligibility does not equal appointment.
 *   Unoccupied posts exercise no authority (vacant state carries no occupant fields).
 *   Appointment does not change the post's authority (no expanded-authority state exists).
 *   Each appointment has a review date.
 *   Multiple-post occupancy requires concentration review.
 *   No person approves their own appointment.
 *
 * Returns human-readable violations; an empty list means the record honors the process.
 */
export function validateCandidacyRecord(record: CandidacyRecord): string[] {
  const errors: string[] = [];
  const at = `[${record.post}:${record.state}]`;

  if (!(STEWARD_POST_IDS as readonly string[]).includes(record.post))
    errors.push(`${at} unknown post — the Charter establishes five and only five posts`);

  if (!(CANDIDACY_STATES as readonly string[]).includes(record.state))
    errors.push(`${at} unknown candidacy state`);

  if (record.sophiaAppointmentAuthority !== false)
    errors.push(`${at} SOPHIA appointment authority must always be false`);

  const activeStates: readonly CandidacyState[] = [
    'eligibility-review', 'orientation-in-progress', 'orientation-complete',
    'readiness-review', 'eligible-for-appointment-consideration',
    'appointment-decision-pending', 'appointed-observation-only',
  ];
  if (activeStates.includes(record.state) && !record.consentRecordRef)
    errors.push(`${at} active candidacy requires recorded candidate consent`);

  if (record.state === 'appointed-observation-only') {
    if (!record.humanDecisionRecordRef)
      errors.push(`${at} no candidate becomes appointed without a human decision record`);
    if (!record.acceptanceRecordRef)
      errors.push(`${at} no appointment may exist without candidate acceptance`);
    if (!record.decisionAuthority)
      errors.push(`${at} appointment requires a named human decision authority`);
    if (record.decisionAuthority && /sophia/i.test(record.decisionAuthority))
      errors.push(`${at} SOPHIA may never be the decision authority`);
    if (
      record.decisionAuthority && record.candidateRef &&
      record.decisionAuthority.trim().toLowerCase() === record.candidateRef.trim().toLowerCase()
    )
      errors.push(`${at} no person approves their own appointment`);
    if (!record.reviewDateRef)
      errors.push(`${at} each appointment must have a review date`);
  }

  // Orientation completion / eligibility are not appointment: those states must
  // not carry appointment artifacts as if the decision had happened.
  if (
    (record.state === 'orientation-complete' || record.state === 'eligible-for-appointment-consideration') &&
    (record.humanDecisionRecordRef || record.acceptanceRecordRef)
  )
    errors.push(`${at} orientation completion and eligibility are not appointment — no decision/acceptance may be attached to this state`);

  if (record.state === 'vacant' && (record.candidateRef || record.humanDecisionRecordRef || record.acceptanceRecordRef))
    errors.push(`${at} a vacant post has no candidate or appointment artifacts — an unoccupied post exercises no authority`);

  if (record.multiplePostOccupancy && !record.concentrationReviewRef)
    errors.push(`${at} multiple-post occupancy requires a recorded concentration-of-authority review`);

  return errors;
}

/**
 * Pre-ratification guard: while the process is pending ratification, the only
 * valid persistent state for every post is 'vacant' (no candidacy opened, no
 * orientation recorded, no appointment made).
 */
export function validateProcessStatus(
  status: AppointmentProcessStatus,
  records: readonly CandidacyRecord[],
): string[] {
  const errors: string[] = [];
  if (status === 'pending-ratification') {
    for (const r of records) {
      if (r.state !== 'vacant')
        errors.push(`[${r.post}] process is pending ratification: no candidacy may exist (found "${r.state}")`);
    }
  }
  return errors;
}

/**
 * The current real-world records: all five posts vacant, no candidacies.
 * This array changes only alongside recorded human decisions.
 */
export const CURRENT_CANDIDACY_RECORDS: readonly CandidacyRecord[] = STEWARD_POST_IDS.map(
  (post) => ({
    post,
    state: 'vacant' as const,
    consentRecordRef: null,
    humanDecisionRecordRef: null,
    acceptanceRecordRef: null,
    decisionAuthority: null,
    candidateRef: null,
    reviewDateRef: null,
    multiplePostOccupancy: false,
    concentrationReviewRef: null,
    sophiaAppointmentAuthority: false,
  }),
);
