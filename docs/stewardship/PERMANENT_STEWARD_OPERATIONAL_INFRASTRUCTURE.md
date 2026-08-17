# Permanent Steward Posts — Operational Infrastructure v1

Status: Adopted — active (SD-2026-07-22-01, July 22, 2026) — Observation-Only Mode preserved
Authority: subordinate to the Bridge Builders Constitution,
`docs/canonical/CHANGE_AUTHORITY.md`, the Permanent Steward Posts Charter
(`docs/canonical/PERMANENT_STEWARD_POSTS_CHARTER.md`), and the ratified
appointment process. Canonical governance documents outrank this document and
all code where they differ.
Last updated: 2026-07-22 (adoption recorded)

## What this infrastructure is

The operational layer that lets the five Permanent Steward Posts do the work
Observation-Only Mode permits — observe, record, classify, preserve context,
hand off, escalate, prepare reviews — with machine-checked boundaries that
keep everything the mode prohibits impossible to do by accident.

It appoints no one, opens no candidacy, grants no access, expands no
authority, and gives SOPHIA no decision power. All five posts remain vacant.
Every consequential act is represented as a typed *awaiting-human-decision*
state with a prepared decision packet.

## The domains and where they live

| Domain | Modules | Standard |
| --- | --- | --- |
| Operations registry (single source of operational truth) | `src/stewardship/steward-operations-registry.ts` | `STEWARD_OPERATIONS_REGISTRY_STANDARD.md` |
| Vacancy coverage (routing, never occupancy) | `src/stewardship/vacancy-coverage.ts` | `VACANCY_COVERAGE_OPERATING_PLAN.md` |
| Operational records (epistemic ladder preserved) | `src/stewardship/operations-records.ts`, `record-validation.ts`, `record-identifiers.ts` | `STEWARD_OBSERVATION_WORKFLOW.md` |
| Classification + privacy boundary | `src/stewardship/record-classification.ts`, `private-record-boundary.ts`, `private-storage-adapter.ts` | `STEWARD_RECORD_CLASSIFICATION_STANDARD.md`, `PRIVATE_CANDIDATE_RECORD_STORAGE_REQUIREMENTS.md` |
| Observation queues | `src/stewardship/observation-queues.ts` | `STEWARD_OBSERVATION_WORKFLOW.md` |
| Handoff routing | `src/stewardship/handoff-routing.ts`, `handoff-validation.ts` | `STEWARD_HANDOFF_AND_ESCALATION_PROTOCOL.md` (existing) |
| Escalation engine | `src/stewardship/escalation-engine.ts`, `escalation-validation.ts` | `STEWARD_ESCALATION_MATRIX.md` (existing, root) |
| Review calendar | `src/stewardship/review-calendar.ts` | `STEWARD_REVIEW_CADENCE_OPERATING_GUIDE.md` |
| Continuity ledger + lineage | `src/stewardship/continuity-ledger.ts`, `decision-lineage.ts` | `CONTINUITY_CERTIFICATION_STANDARD.md` (existing) |
| SOPHIA advisory operations | `src/stewardship/sophia-advisory-operations.ts`, `sophia-boundary-validation.ts` | `SOPHIA_STEWARD_OPERATIONS_STANDARD.md` |
| Candidate operations boundary | `src/stewardship/candidate-operations-boundary.ts` (reuses `steward-appointment-process.ts`) | existing ratified process documents |
| Public status surface | `src/site/stewardship-pages.ts` (routes `/stewardship/operations/…`) | this document §Interface |

## Boundaries that hold everywhere

- All five posts are human-only. Vacancy is not occupancy. Observation is not
  authority. Recommendation is not approval. Advisory support is not
  governance. SOPHIA cannot become a steward.
- No code path can appoint, remove, open a candidacy, determine eligibility,
  make a readiness finding, grant access, approve, reject, ratify, modify
  canonical vocabulary, change public status, close a serious escalation,
  merge, or deploy. Where the type system cannot forbid a claim, validation
  rejects it and tests prove the rejection.
- Raising an urgent safety escalation is always allowed. Observation-Only
  Mode restricts consequential action, never the alarm.
- This repository is public. It holds only public-governance records,
  schemas, empty templates, personal-data-free fixtures, and privacy-safe
  pointers. The export guard (`guardPublicExport`) machine-checks this.

## Adoption and vacancy coverage

The infrastructure was adopted as the canonical operational layer by
SD-2026-07-22-01 (status transition implemented-pending-adoption →
adopted-active, mirrored in `INFRASTRUCTURE_STATUS`). Separately,
SD-2026-07-22-02 designated Maurice Jackson, founding steward, as temporary
receiver of record for the five vacant posts — routing and preservation
only, not appointment, not occupancy, not post authority; per-post
termination upon appointment or later adopted decision; self-conflict
matters enter independent-human-review-required.

## Human decisions represented as pending

Decisions still prepared, not made — each with a packet in
`docs/stewardship/decision-packets/` marked DRAFT — HUMAN DECISION
REQUIRED — NOT ADOPTED: candidacy sequencing; private storage designation;
orientation facilitator / readiness reviewer designation; independent human
reviewer designation; and (tracked in `docs/CANONICAL_CONFLICT_REGISTER.md`,
not a packet here) the resolution of C-014.

## Interface

The public site publishes `/stewardship/operations/` (overview) and one
detail page per post, generated from the registry. Because the site is
public-only and unauthenticated, only public-governance content appears;
restricted views are represented by honest empty states. Adapters exist for a
future authenticated steward workspace; no authentication is simulated.

## What "complete" means here

Complete means the infrastructure is ready for humans — not that operations
have begun. Operations begin when humans adopt the pending decisions, appoint
stewards through the ratified process, and record those acts. Until then this
layer observes its own rule: it waits.
