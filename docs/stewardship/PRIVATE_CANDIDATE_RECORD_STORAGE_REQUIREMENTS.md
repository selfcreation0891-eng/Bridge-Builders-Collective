# Private Candidate Record Storage Requirements

Status: Requirements for a system that does not exist yet — no provider is
designated, and this document designates none.
Authority: subordinate to the Constitution, `PRIVACY_POLICY.md`,
`DATA_RETENTION_POLICY.md`, and the ratified appointment process.
Last updated: 2026-07-22

## Why candidacy is blocked on this

The ratified appointment process generates records that must never live in a
public repository: applications, contact details, accommodations,
legal-capacity information, conflict disclosures, facilitator notes. Until a
human designates a private system meeting these requirements, **no candidacy
can be opened** — this is enforced in code
(`src/stewardship/candidate-operations-boundary.ts` rejects any active
candidacy while `privateStorageStatus().configured` is false), not just
stated here.

## Requirements for the designated system

1. **Access control.** Role-based, minimal, individually accountable. No
   shared credentials. Access grants are themselves recorded human decisions.
2. **Consent alignment.** Storage, retention, and deletion honor the
   candidate consent template and `DATA_RETENTION_POLICY.md`; revocation
   requests are honored where operationally possible.
3. **Referenceability.** Every stored item is addressable by an opaque token
   so public records can point without revealing:
   `private-record://<system>/<opaque-token>` (pattern enforced by
   `private-storage-adapter.ts`).
4. **No derivation into public systems.** Nothing syncs, exports, logs, or
   backs up into a public surface. Summaries written for public records must
   pass `detectProhibitedFields`.
5. **Continuity.** The system must survive steward turnover: documented
   administration, at least two authorized humans once posts are filled, and
   an exit path that preserves records under consent terms.
6. **Auditability.** Access and changes are logged in a form reviewable at
   the quarterly authority review.

## The adapter boundary

`PrivateRecordStorageAdapter` defines the only interface through which
candidate-record operations will ever pass. The sole current implementation
is `UNCONFIGURED_PRIVATE_STORAGE`: honestly inert, refusing every operation
with the reason. No live provider is fabricated, no credentials exist in this
repository, and configuring one is inseparable from the human designation
decision — see
`docs/stewardship/decision-packets/PRIVATE_STORAGE_DESIGNATION_DECISION_PACKET.md`
(DRAFT — HUMAN DECISION REQUIRED — NOT ADOPTED).
