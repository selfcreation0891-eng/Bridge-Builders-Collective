/**
 * Continuity ledger — append-only lineage of observations, handoffs,
 * escalations, decisions, commitments, and risks.
 * Authority: docs/stewardship/CONTINUITY_CERTIFICATION_STANDARD.md and the
 * Continuity Steward's Charter responsibilities (§4.2).
 *
 * The ledger never rewrites a prior entry. Corrections append a new entry that
 * names what it supersedes; the superseded entry remains readable forever.
 * Every reference is privacy-safe: the ledger preserves lineage, not personal
 * data.
 */

import type { StewardPostId } from './steward-posts.ts';
import { validateReferencePrivacy } from './record-identifiers.ts';

export type LedgerEntryKind =
  | 'observation-lineage'
  | 'handoff-lineage'
  | 'escalation-lineage'
  | 'decision-reference'
  | 'unresolved-commitment'
  | 'consent-reference'
  | 'succession-risk'
  | 'single-person-dependency'
  | 'record-location-reference'
  | 'review-history'
  | 'correction';

export const LEDGER_ENTRY_KINDS: readonly LedgerEntryKind[] = [
  'observation-lineage',
  'handoff-lineage',
  'escalation-lineage',
  'decision-reference',
  'unresolved-commitment',
  'consent-reference',
  'succession-risk',
  'single-person-dependency',
  'record-location-reference',
  'review-history',
  'correction',
] as const;

export interface ContinuityLedgerEntry {
  /** Monotonic sequence within the ledger; assigned at append. */
  sequence: number;
  kind: LedgerEntryKind;
  recordedAt: string;
  originatingPost: StewardPostId | 'founding-steward' | 'sophia-advisory';
  /** What this entry preserves, in privacy-safe terms. */
  summary: string;
  /** Privacy-safe references (record ids, decision ids, private-record:// pointers, doc paths). */
  refs: readonly string[];
  /** For corrections: the sequence number of the entry being superseded. The old entry is never altered. */
  supersedesSequence: number | null;
}

export type ContinuityLedger = readonly ContinuityLedgerEntry[];

/** The empty ledger — operations begin with nothing claimed. */
export const EMPTY_LEDGER: ContinuityLedger = [] as const;

export type AppendResult =
  | { ok: true; ledger: ContinuityLedger }
  | { ok: false; errors: readonly string[] };

/**
 * Append an entry. Returns a NEW ledger; the input is never mutated. Sequence
 * is assigned here so callers cannot renumber history.
 */
export function appendEntry(
  ledger: ContinuityLedger,
  entry: Omit<ContinuityLedgerEntry, 'sequence'>,
): AppendResult {
  const errors: string[] = [];
  if (!(LEDGER_ENTRY_KINDS as readonly string[]).includes(entry.kind))
    errors.push(`unknown ledger entry kind "${entry.kind}"`);
  if (!entry.summary.trim()) errors.push('a ledger entry must state what it preserves');
  if (!/^\d{4}-\d{2}-\d{2}/.test(entry.recordedAt)) errors.push('malformed recordedAt');
  for (const ref of entry.refs) errors.push(...validateReferencePrivacy(ref));
  if (entry.kind === 'correction' && entry.supersedesSequence === null)
    errors.push('a correction must name the sequence it supersedes');
  if (entry.supersedesSequence !== null) {
    if (entry.kind !== 'correction')
      errors.push('only corrections may supersede a prior entry');
    else if (!ledger.some((e) => e.sequence === entry.supersedesSequence))
      errors.push(`correction supersedes unknown sequence ${entry.supersedesSequence}`);
  }
  if (errors.length) return { ok: false, errors };
  const sequence = ledger.length === 0 ? 1 : ledger[ledger.length - 1].sequence + 1;
  return { ok: true, ledger: [...ledger, { ...entry, sequence }] };
}

/**
 * Validate a whole ledger's append-only integrity: strictly increasing
 * sequences, non-decreasing timestamps, valid corrections, privacy-safe refs.
 */
export function validateLedger(ledger: ContinuityLedger): string[] {
  const errors: string[] = [];
  let prevSeq = 0;
  let prevAt = '';
  for (const entry of ledger) {
    const at = `[seq ${entry.sequence}]`;
    if (entry.sequence <= prevSeq)
      errors.push(`${at} sequence must strictly increase (prior was ${prevSeq}) — history is never renumbered`);
    if (prevAt && entry.recordedAt < prevAt)
      errors.push(`${at} recordedAt precedes the prior entry — the ledger is chronological`);
    if (!(LEDGER_ENTRY_KINDS as readonly string[]).includes(entry.kind))
      errors.push(`${at} unknown entry kind`);
    if (!entry.summary.trim()) errors.push(`${at} empty summary`);
    for (const ref of entry.refs) errors.push(...validateReferencePrivacy(ref).map((e) => `${at} ${e}`));
    if (entry.supersedesSequence !== null) {
      if (entry.kind !== 'correction') errors.push(`${at} only corrections supersede`);
      if (entry.supersedesSequence >= entry.sequence)
        errors.push(`${at} an entry can only supersede an earlier entry`);
    }
    prevSeq = entry.sequence;
    prevAt = entry.recordedAt;
  }
  return errors;
}

/** The effective (non-superseded) view. Superseded entries remain in the ledger; they are simply not current. */
export function effectiveEntries(ledger: ContinuityLedger): ContinuityLedgerEntry[] {
  const superseded = new Set(
    ledger.filter((e) => e.supersedesSequence !== null).map((e) => e.supersedesSequence as number),
  );
  return ledger.filter((e) => !superseded.has(e.sequence));
}
