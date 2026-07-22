/**
 * Private-record storage adapter boundary.
 * Authority: docs/stewardship/PRIVATE_CANDIDATE_RECORD_STORAGE_REQUIREMENTS.md
 * and docs/stewardship/decision-packets/PRIVATE_STORAGE_DESIGNATION_DECISION_PACKET.md
 * (DRAFT — NOT ADOPTED).
 *
 * Private candidate and participant records never live in this repository.
 * They belong in a private system a human designates. No provider has been
 * designated, so the only implementation here is honestly unconfigured: every
 * operation states that live candidacy remains blocked until a recorded human
 * decision names a provider. Nothing in this module fabricates a live backend
 * or claims one is configured.
 */

/** A privacy-safe pointer into a private system: private-record://<system>/<opaque-token> */
export const PRIVATE_RECORD_REF_PATTERN = /^private-record:\/\/[a-z0-9-]+\/[A-Za-z0-9_-]{4,}$/;

export function isPrivateRecordRef(ref: string): boolean {
  return PRIVATE_RECORD_REF_PATTERN.test(ref);
}

export type PrivateStorageResult =
  | { ok: true; ref: string }
  | { ok: false; blocked: true; reason: string };

export interface PrivateRecordStorageAdapter {
  /** Human-readable provider name, or the honest absence of one. */
  readonly providerName: string;
  /** True only when a recorded human decision has designated and configured a provider. */
  readonly configured: boolean;
  /** Store private content; returns an opaque privacy-safe reference. */
  store(classification: 'private-candidate-or-participant', opaqueToken: string): PrivateStorageResult;
  /** Verify a reference resolves in the private system (never returns content). */
  verifyRef(ref: string): PrivateStorageResult;
}

const NOT_DESIGNATED_REASON =
  'No private candidate-record storage provider has been designated. Live candidacy remains blocked until a recorded human decision designates one (see docs/stewardship/decision-packets/PRIVATE_STORAGE_DESIGNATION_DECISION_PACKET.md — DRAFT, NOT ADOPTED).';

/**
 * The current, honest implementation: unconfigured and inert. It refuses every
 * operation with the reason a human needs, rather than pretending to store.
 */
export const UNCONFIGURED_PRIVATE_STORAGE: PrivateRecordStorageAdapter = Object.freeze({
  providerName: 'none-designated',
  configured: false,
  store(): PrivateStorageResult {
    return { ok: false, blocked: true, reason: NOT_DESIGNATED_REASON };
  },
  verifyRef(): PrivateStorageResult {
    return { ok: false, blocked: true, reason: NOT_DESIGNATED_REASON };
  },
});

/** The adapter in effect. Changes only alongside a recorded human designation decision. */
export const CURRENT_PRIVATE_STORAGE: PrivateRecordStorageAdapter = UNCONFIGURED_PRIVATE_STORAGE;
