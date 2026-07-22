/**
 * Candidate operations boundary — the privacy-safe operational shell around
 * the ratified appointment process.
 * Authority: docs/stewardship/STEWARD_ELIGIBILITY_ORIENTATION_AND_APPOINTMENT_PROCESS.md
 * (ratified SD-2026-07-21-01), the Charter, and
 * docs/stewardship/PRIVATE_CANDIDATE_RECORD_STORAGE_REQUIREMENTS.md.
 *
 * This module opens no candidacy and creates no candidate. It reuses the
 * ratified process state machine (steward-appointment-process.ts) — it does
 * not fork it — and adds only the operational connective tissue: privacy-safe
 * reference slots and the preconditions that keep candidate operations
 * inactive until humans decide otherwise. Current records remain vacant and
 * null.
 */

import type { StewardPostId } from './steward-posts.ts';
import { STEWARD_POST_IDS } from './steward-posts.ts';
import type { CandidacyRecord, CandidacyState } from './steward-appointment-process.ts';
import {
  CURRENT_CANDIDACY_RECORDS,
  validateCandidacyRecord,
} from './steward-appointment-process.ts';
import { privateStorageStatus } from './private-record-boundary.ts';
import { isPrivateRecordRef } from './private-storage-adapter.ts';

export interface CandidateOperationsShell {
  post: StewardPostId;
  /** The ratified process's candidacy record — the single state machine; never forked. */
  candidacy: CandidacyRecord;
  /** Privacy-safe references into the (future, human-designated) private system. All null today. */
  privateCandidateRef: string | null;
  consentRecordRef: string | null;
  orientationCompletionRef: string | null;
  readinessFindingRef: string | null;
  appointmentDecisionRef: string | null;
  acceptanceRef: string | null;
  reviewDateRef: string | null;
  /** Access is granted by humans after appointment, never automatically. */
  accessGrantState: 'no-access-granted' | 'human-granted-access-recorded';
  accessGrantRef: string | null;
  /** True when this candidacy involves age, safeguarding, or questioned legal capacity — blocked while C-014 is unresolved. */
  affectedByC014: boolean;
}

/** C-014 status. Changes only when docs/CANONICAL_CONFLICT_REGISTER.md records a human resolution. */
export const C014_STATUS: 'unresolved' | 'resolved' = 'unresolved';

/**
 * Boundary invariants, machine-checked (in addition to the ratified process's
 * own validation, which is reused, not duplicated):
 *
 *   No active candidacy without designated private storage.
 *   No active candidacy without consent (process rule, reused).
 *   No appointment without human decision, acceptance, and review date (process rules, reused).
 *   No self-appointment (process rule, reused).
 *   No SOPHIA appointment authority (process rule, reused).
 *   No automatic access grant; access requires its own recorded human grant.
 *   No authority expansion through appointment (structural: no such state exists).
 *   No C-014-affected candidacy while C-014 is unresolved.
 *   All references are private-record:// pointers — personal data never appears here.
 */
export function validateCandidateOperations(shell: CandidateOperationsShell): string[] {
  const errors: string[] = [...validateCandidacyRecord(shell.candidacy)];
  const at = `[${shell.post}:${shell.candidacy.state}]`;

  if (!(STEWARD_POST_IDS as readonly string[]).includes(shell.post))
    errors.push(`${at} unknown post`);
  if (shell.candidacy.post !== shell.post)
    errors.push(`${at} shell and candidacy record disagree about the post`);

  const active = shell.candidacy.state !== 'vacant';
  const storage = privateStorageStatus();
  if (active && !storage.configured)
    errors.push(
      `${at} no candidacy may be active without designated private candidate-record storage — ${storage.candidacyBlockedReason ?? ''}`,
    );

  if (active && C014_STATUS === 'unresolved' && shell.affectedByC014)
    errors.push(
      `${at} C-014 is unresolved: candidacies involving age, safeguarding, or questioned legal capacity remain blocked until an adopted steward decision resolves it`,
    );

  const refs: readonly [string, string | null][] = [
    ['privateCandidateRef', shell.privateCandidateRef],
    ['consentRecordRef', shell.consentRecordRef],
    ['orientationCompletionRef', shell.orientationCompletionRef],
    ['readinessFindingRef', shell.readinessFindingRef],
    ['appointmentDecisionRef', shell.appointmentDecisionRef],
    ['acceptanceRef', shell.acceptanceRef],
    ['reviewDateRef', shell.reviewDateRef],
    ['accessGrantRef', shell.accessGrantRef],
  ];
  for (const [field, ref] of refs) {
    if (ref !== null && !isPrivateRecordRef(ref) && field !== 'reviewDateRef')
      errors.push(`${at} ${field} must be a private-record:// pointer, never inline personal data`);
  }

  if (shell.candidacy.state === 'vacant') {
    for (const [field, ref] of refs) {
      if (ref !== null) errors.push(`${at} a vacant post carries no candidate reference (${field})`);
    }
    if (shell.accessGrantState !== 'no-access-granted')
      errors.push(`${at} a vacant post has no access grant`);
  }

  if (shell.accessGrantState === 'human-granted-access-recorded') {
    if (shell.candidacy.state !== 'appointed-observation-only')
      errors.push(`${at} access exists only after appointment — never before, never automatically`);
    if (!shell.accessGrantRef)
      errors.push(`${at} a recorded access grant requires its reference`);
    if (!shell.appointmentDecisionRef)
      errors.push(`${at} access requires the recorded human appointment decision`);
  }
  if (shell.candidacy.state === 'appointed-observation-only' && shell.accessGrantState === 'no-access-granted') {
    // Valid: appointment does not auto-grant access. Stated here so readers see it is deliberate.
  }

  return errors;
}

/**
 * The current real-world shells: every post vacant, every reference null, no
 * access granted, nothing affected by C-014 because no candidacy exists. This
 * array changes only alongside recorded human decisions.
 */
export const CURRENT_CANDIDATE_OPERATIONS: readonly CandidateOperationsShell[] =
  CURRENT_CANDIDACY_RECORDS.map((candidacy) => ({
    post: candidacy.post,
    candidacy,
    privateCandidateRef: null,
    consentRecordRef: null,
    orientationCompletionRef: null,
    readinessFindingRef: null,
    appointmentDecisionRef: null,
    acceptanceRef: null,
    reviewDateRef: null,
    accessGrantState: 'no-access-granted' as const,
    accessGrantRef: null,
    affectedByC014: false,
  }));

/** Convenience: the candidacy states in which any post currently sits (all 'vacant'). */
export function currentCandidacyStates(): Readonly<Record<StewardPostId, CandidacyState>> {
  const out = {} as Record<StewardPostId, CandidacyState>;
  for (const shell of CURRENT_CANDIDATE_OPERATIONS) out[shell.post] = shell.candidacy.state;
  return out;
}
