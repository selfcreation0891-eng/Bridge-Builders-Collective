# SD-2026-07-22-01 — Adopted Steward Decision

## Permanent Steward Posts Operational Infrastructure v1 — Adoption

Decision authority: Maurice Jackson, founding steward
Adoption date: July 22, 2026
Status: ADOPTED
Recorded under: `docs/canonical/CHANGE_AUTHORITY.md`; subordinate to the
Bridge Builders Constitution and the Permanent Steward Posts Charter.

## Decision

The founding steward adopts the Permanent Steward Posts Operational
Infrastructure v1 as the canonical operational layer supporting the five
Permanent Steward Posts of Bridge Builders Collective.

The adopted infrastructure establishes: the Steward Operations Registry;
operational vacancy states; observation queues; evidence and operational
record structures; record-classification and privacy safeguards; handoff and
escalation routing; review cadence; continuity and decision lineage; SOPHIA
advisory-operation boundaries; candidate-operation safeguards; privacy-safe
operational status surfaces; and automated validation and dry-run
verification.

## This adoption does not

- appoint any person;
- occupy any Steward Post;
- open a candidacy;
- create a candidate record;
- determine eligibility;
- record orientation completion;
- make a readiness finding;
- grant repository, archive, participant, publication, deployment, or
  governance access;
- expand the authority of any Steward Post;
- change Observation-Only Mode;
- adopt any still-pending decision packet;
- designate a private candidate-record provider;
- resolve C-014;
- give SOPHIA decision authority.

All five Permanent Steward Posts remain vacant and human-only. The
operational infrastructure supports stewardship. It does not itself exercise
stewardship authority.

## Rationale

The Permanent Steward Posts Operational Infrastructure v1 is adopted to
provide a truthful, accountable, privacy-aware, and continuity-preserving
operational system beneath the already-ratified Charter and appointment
process. The infrastructure allows observations, evidence, recommendations,
handoffs, escalations, reviews, and continuity records to be organized
without confusing observation with authority, recommendation with approval,
vacancy with occupancy, or SOPHIA advisory support with human governance.

## Authorities reviewed

Bridge Builders Constitution; `ECOSYSTEM_AUTHORITY_ORDER.md`;
`CHANGE_AUTHORITY.md`; `CANONICAL_VOCABULARY.md`; Permanent Steward Posts
Charter v1 (SD-2026-07-20-01); Steward Eligibility, Orientation, and
Appointment Process v1 (SD-2026-07-21-01); Observation-Only Operating
Protocol; Steward Posts Authority Matrix; Steward Handoff and Escalation
Protocol; Continuity Certification Standard.

## Evidence reviewed

Implementation pull request #10 (merge commit `8fedd8a` on `main`),
comprising the operational modules under `src/stewardship/`, the status
surface, the operational standards under `docs/stewardship/`, and the
verification evidence recorded in
`docs/implementation/STEWARDSHIP_OPERATIONS_IMPLEMENTATION_TRACKER.md`:
typecheck clean; 104/104 tests passing including the fifteen dry-run
scenarios; registry valid; site build and link validation passing; targeted
safety searches clean.

## Scope, effective date, and status

Scope: the operational layer only — no post authority, occupancy, or mode is
touched. Effective date: July 22, 2026. Implementation status transition:
implemented-pending-adoption → **adopted-active**, recorded in
`src/stewardship/steward-operations-registry.ts` and the infrastructure
overview.

## Unresolved decisions (explicitly preserved)

Temporary vacancy coverage (decided separately in SD-2026-07-22-02);
private candidate-record storage designation; candidacy sequencing;
orientation facilitator / readiness reviewer designation; independent
human reviewer designation; C-014 resolution. Each remains
DRAFT — HUMAN DECISION REQUIRED — NOT ADOPTED (or Deferred, for C-014).

## Explicit confirmations

No appointment is made by this decision. No access is granted by this
decision. No authority is expanded by this decision.

## Dissent or reservations

None recorded.

## Continuity record

`docs/continuity/2026-07-22-steward-operational-infrastructure-adoption.md`

## Review

The infrastructure is reviewed on the ratified cadence
(`docs/stewardship/STEWARD_REVIEW_CADENCE_OPERATING_GUIDE.md`); the
quarterly authority review examines whether adoption boundaries are being
honored.
