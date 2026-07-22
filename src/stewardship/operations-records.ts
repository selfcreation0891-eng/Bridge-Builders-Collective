/**
 * Typed operational records for steward work in Observation-Only Mode.
 * Authority: docs/stewardship/OBSERVATION_ONLY_OPERATING_PROTOCOL.md,
 * docs/stewardship/STEWARD_HANDOFF_AND_ESCALATION_PROTOCOL.md, and
 * docs/stewardship/STEWARD_RECORD_CLASSIFICATION_STANDARD.md — subordinate to
 * the Constitution and CHANGE_AUTHORITY.md.
 *
 * Records preserve the epistemic ladder the protocol requires: what was
 * observed is never merged with what it might mean, what pattern it may show,
 * what remains uncertain, what is recommended, or what a human decided. A
 * record can carry a recommendation forever without it ever becoming a
 * decision; only a referenced recorded human decision changes action status.
 */

import type { StewardPostId } from './steward-posts.ts';

/** Every kind of operational record the stewardship system preserves. */
export type OperationalRecordKind =
  | 'observation'
  | 'evidence'
  | 'finding'
  | 'uncertainty'
  | 'recommendation'
  | 'handoff'
  | 'escalation'
  | 'acknowledgment'
  | 'disposition'
  | 'human-decision-reference'
  | 'continuity-update'
  | 'review-event';

export const OPERATIONAL_RECORD_KINDS: readonly OperationalRecordKind[] = [
  'observation',
  'evidence',
  'finding',
  'uncertainty',
  'recommendation',
  'handoff',
  'escalation',
  'acknowledgment',
  'disposition',
  'human-decision-reference',
  'continuity-update',
  'review-event',
] as const;

/** Who originates or receives a record. SOPHIA may originate advisory records; it may never receive decision responsibility. */
export type RecordActor = StewardPostId | 'founding-steward' | 'sophia-advisory';
export type RecordAuthority = StewardPostId | 'founding-steward' | 'independent-human-review';

export type RecordUrgency = 'routine' | 'time-sensitive' | 'serious' | 'urgent-safety';

export const RECORD_URGENCIES: readonly RecordUrgency[] = [
  'routine',
  'time-sensitive',
  'serious',
  'urgent-safety',
] as const;

/** Sensitivity of the subject matter, independent of storage classification. */
export type RecordSensitivity = 'low' | 'elevated' | 'high' | 'safeguarding';

/** Storage classification. See record-classification.ts for the boundary rules. */
export type RecordClassification =
  | 'public-governance'
  | 'restricted-stewardship'
  | 'private-candidate-or-participant';

/** Whether a human decision has been requested and whether one exists. */
export type HumanDecisionStatus =
  | 'no-decision-required'
  | 'human-review-requested'
  | 'awaiting-human-decision'
  | 'human-decision-recorded'
  | 'human-decision-declined';

/** What, if anything, may happen next. Nothing consequential without a recorded human decision. */
export type RecordActionStatus =
  | 'no-action'
  | 'observation-preserved'
  | 'blocked-awaiting-human-decision'
  | 'human-authorized-action-referenced';

export type RecordStatus = 'open' | 'acknowledged' | 'in-review' | 'closed';

export type AcknowledgmentState = 'not-required' | 'required-pending' | 'acknowledged-by-human';

export interface OperationalRecord {
  /** Deterministic, privacy-safe identifier. See record-identifiers.ts. */
  id: string;
  kind: OperationalRecordKind;
  /** ISO 8601 timestamps, supplied by the caller (records never invent time). */
  createdAt: string;
  updatedAt: string;
  originatingPost: RecordActor;
  /** The post or human authority responsible for receiving this record. */
  receivingAuthority: RecordAuthority;
  urgency: RecordUrgency;
  sensitivity: RecordSensitivity;
  classification: RecordClassification;
  /** The consent boundary governing this record's content ('none-required' when no personal material is involved). */
  consentBoundary: string;
  /** Privacy-safe references to evidence (never inline private content). */
  evidenceRefs: readonly string[];
  relatedRecordIds: readonly string[];
  unresolvedQuestions: readonly string[];
  status: RecordStatus;
  dueDate: string | null;
  acknowledgment: AcknowledgmentState;
  /** Privacy-safe reference to the human who acknowledged, when acknowledged. */
  acknowledgedByRef: string | null;
  /** Who may close this record. Always a human authority; never SOPHIA; null while undetermined. */
  closureAuthority: RecordAuthority | null;

  // ---- The epistemic ladder: each rung is distinct and never collapsed. ----
  /** 1. What was observed, factually, without interpretation. Required. */
  observedEvidence: string;
  /** 2. What the observer thinks it may mean. Optional; always labeled interpretation. */
  interpretation: string | null;
  /** 3. A pattern detected across observations, if any. */
  detectedPattern: string | null;
  /** 4. What remains unknown or uncertain. Preserved, never converted into false certainty. */
  uncertainty: string | null;
  /** 5. A drafted recommendation. A recommendation is not an approval and never becomes one silently. */
  recommendation: string | null;
  /** 6. Whether human review has been requested. */
  requestedHumanReview: boolean;
  /** 7. The status of any human decision. */
  humanDecisionStatus: HumanDecisionStatus;
  /** Reference to the recorded human decision, when one exists. */
  humanDecisionRef: string | null;
  /** 8. What action state follows. Consequential action requires a recorded human decision. */
  actionStatus: RecordActionStatus;
}

/** Convenience constructor defaults for a newly observed, unacknowledged record. */
export const NEW_RECORD_DEFAULTS = {
  status: 'open',
  acknowledgment: 'required-pending',
  acknowledgedByRef: null,
  closureAuthority: null,
  interpretation: null,
  detectedPattern: null,
  uncertainty: null,
  recommendation: null,
  requestedHumanReview: false,
  humanDecisionStatus: 'no-decision-required',
  humanDecisionRef: null,
  actionStatus: 'observation-preserved',
  dueDate: null,
  evidenceRefs: [],
  relatedRecordIds: [],
  unresolvedQuestions: [],
} as const satisfies Partial<OperationalRecord>;
