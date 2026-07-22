/**
 * Decision lineage — tracing any operational record back to the evidence,
 * handoffs, escalations, and recorded human decisions it descends from.
 * Authority: docs/stewardship/CONTINUITY_CERTIFICATION_STANDARD.md ("a
 * decision without a usable continuity record is a continuity failure").
 *
 * Lineage is read-only derivation over the ledger and record set. It changes
 * nothing; it exists so a human can always answer: what led to this, what was
 * decided by whom, and what is still unresolved.
 */

import type { OperationalRecord } from './operations-records.ts';
import type { ContinuityLedger } from './continuity-ledger.ts';
import { effectiveEntries } from './continuity-ledger.ts';

export interface LineageTrace {
  recordId: string;
  /** Records this record references, transitively, that exist in the given set. */
  ancestry: readonly string[];
  /** Recorded human decision references found along the ancestry. */
  humanDecisionRefs: readonly string[];
  /** Unresolved questions accumulated along the ancestry. */
  unresolvedQuestions: readonly string[];
  /** Ledger sequences whose refs mention this record or its ancestry. */
  ledgerSequences: readonly number[];
  /** True when no recorded human decision exists anywhere in the ancestry. */
  awaitingHumanDecision: boolean;
}

export function traceLineage(
  recordId: string,
  records: readonly OperationalRecord[],
  ledger: ContinuityLedger,
): LineageTrace {
  const byId = new Map(records.map((r) => [r.id, r]));
  const visited = new Set<string>();
  const decisionRefs = new Set<string>();
  const questions: string[] = [];

  const walk = (id: string): void => {
    if (visited.has(id)) return;
    visited.add(id);
    const record = byId.get(id);
    if (!record) return;
    if (record.humanDecisionRef) decisionRefs.add(record.humanDecisionRef);
    questions.push(...record.unresolvedQuestions);
    for (const rel of record.relatedRecordIds) walk(rel);
  };
  walk(recordId);

  const ancestry = [...visited].filter((id) => id !== recordId && byId.has(id));
  const family = new Set([recordId, ...ancestry]);
  const ledgerSequences = effectiveEntries(ledger)
    .filter((e) => e.refs.some((ref) => family.has(ref)))
    .map((e) => e.sequence);

  return {
    recordId,
    ancestry,
    humanDecisionRefs: [...decisionRefs],
    unresolvedQuestions: questions,
    ledgerSequences,
    awaitingHumanDecision: decisionRefs.size === 0,
  };
}

/**
 * Continuity gap check: records that reference no evidence, appear in no
 * ledger entry, and carry no decision reference are decisions-in-the-dark
 * waiting to happen. Returned so a human can repair the record — nothing is
 * auto-repaired.
 */
export function findContinuityGaps(
  records: readonly OperationalRecord[],
  ledger: ContinuityLedger,
): { recordId: string; gaps: readonly string[] }[] {
  const inLedger = new Set(effectiveEntries(ledger).flatMap((e) => e.refs));
  const out: { recordId: string; gaps: string[] }[] = [];
  for (const record of records) {
    const gaps: string[] = [];
    if (record.evidenceRefs.length === 0 && record.kind !== 'acknowledgment')
      gaps.push('no evidence references');
    if (!inLedger.has(record.id)) gaps.push('not preserved in the continuity ledger');
    if (
      record.humanDecisionStatus === 'human-decision-recorded' &&
      record.humanDecisionRef &&
      !inLedger.has(record.humanDecisionRef)
    )
      gaps.push('its recorded human decision is not preserved in the continuity ledger');
    if (gaps.length) out.push({ recordId: record.id, gaps });
  }
  return out;
}
