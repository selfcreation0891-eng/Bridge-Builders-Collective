/**
 * SOPHIA advisory operations — the typed shape of everything SOPHIA may
 * contribute to steward operations.
 * Authority: Bridge Builders Constitution §9, the Permanent Steward Posts
 * Charter, and docs/stewardship/SOPHIA_STEWARD_OPERATIONS_STANDARD.md.
 *
 * SOPHIA may summarize evidence, detect contradictions, identify missing
 * context, organize records, draft possible recommendations, prepare handoff
 * packets, and identify questions requiring human judgment. SOPHIA may not
 * occupy a post, vote, decide, appoint, approve, reject, publish, merge,
 * deploy, grant access, alter records, change permissions, certify, close
 * escalations, or communicate advisory output as an adopted decision. Every
 * artifact carries the required advisory notice, visibly.
 */

export const SOPHIA_ADVISORY_NOTICE =
  'SOPHIA advisory output is not an adopted steward decision. Human review and recorded authority are required before consequential action.';

/** The complete set of things SOPHIA advisory output may be. */
export type SophiaContributionKind =
  | 'evidence-summary'
  | 'contradiction-detection'
  | 'missing-context-identification'
  | 'record-organization'
  | 'draft-recommendation'
  | 'handoff-packet-preparation'
  | 'human-judgment-question';

export const SOPHIA_CONTRIBUTION_KINDS: readonly SophiaContributionKind[] = [
  'evidence-summary',
  'contradiction-detection',
  'missing-context-identification',
  'record-organization',
  'draft-recommendation',
  'handoff-packet-preparation',
  'human-judgment-question',
] as const;

export type SophiaHumanDecisionStatus =
  | 'awaiting-human-review'
  | 'human-review-in-progress'
  | 'human-decision-recorded-elsewhere';

export interface SophiaAdvisoryOutput {
  id: string;
  kind: SophiaContributionKind;
  createdAt: string;
  /** What was observed, factually. */
  observedEvidence: string;
  /** A pattern detected across the evidence, if any. */
  detectedPattern: string | null;
  /** What remains uncertain. SOPHIA preserves uncertainty; it never converts it into confidence. */
  uncertainty: string | null;
  /** SOPHIA's advisory interpretation, always labeled as advisory. */
  advisoryInterpretation: string;
  /** Options a human might consider. Options, plural, framed as possibilities — never a verdict. */
  recommendationOptions: readonly string[];
  /** The human review SOPHIA recommends. */
  recommendedHumanReview: string;
  humanDecisionStatus: SophiaHumanDecisionStatus;
  /** The required advisory notice, verbatim. Validated. */
  requiredNotice: string;
}

/** Render an advisory artifact's visible footer (used by any surface that prints SOPHIA output). */
export function sophiaAdvisoryFooter(): string {
  return SOPHIA_ADVISORY_NOTICE;
}
