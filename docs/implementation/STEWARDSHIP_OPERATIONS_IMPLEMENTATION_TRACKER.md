# Stewardship Operations Implementation Tracker

Permanent Steward Posts Operational Infrastructure v1
Branch: `governance/steward-operational-infrastructure-v1`
Base: `main` @ `df3c1ff` (Merge PR #8 — appointment process ratification)
Started: 2026-07-22

Authority: this tracker is an implementation log, not a governance document.
Canonical governance documents outrank code and this tracker where they differ
(`docs/canonical/ECOSYSTEM_AUTHORITY_ORDER.md`).

## Canonical current state (verified before any modification)

| Fact | Verified in | Result |
| --- | --- | --- |
| Charter v1 ratified | `src/stewardship/steward-posts.ts` (`CHARTER_STATUS`), `docs/stewardship/decisions/SD-2026-07-20-01-…` | Confirmed |
| Appointment process v1 ratified | `src/stewardship/steward-appointment-process.ts` (`APPOINTMENT_PROCESS_STATUS`), `SD-2026-07-21-01-…` | Confirmed |
| Exactly five posts | `STEWARD_POSTS` / `STEWARD_POST_IDS` | Confirmed |
| All active, vacant, observation-only, human-only | `steward-posts.ts`, `docs/stewardship/posts/*_STATUS.md` | Confirmed |
| No candidacy, candidate, appointment, or access grant | `CURRENT_CANDIDACY_RECORDS` (all `vacant`, all refs null) | Confirmed |
| SOPHIA advisory-only, occupies no post | `sophiaDecisionAuthority: false` on all posts; Constitution §9 | Confirmed |
| C-014 unresolved | `docs/CANONICAL_CONFLICT_REGISTER.md` row C-014 (Deferred) | Confirmed |
| Old PRs #1–#3 superseded | remote `copilot/*` branches left untouched | Confirmed |

Baseline verification on unmodified `main` (2026-07-22): `npm test` 45/45 pass;
`npm run validate:registry` valid (25 environments); `npm run build` 32 pages;
`npm run validate:links` 1109 references resolve; `npm run typecheck` clean.

Environment note: the build container's package proxy blocks the pinned
devDependency downloads (`typescript@7.0.2`, `@types/node@26`), so typechecking
used preinstalled TypeScript 6.0.3 with a local `@types/node`. No source change
depends on compiler version; `package.json` is unmodified.

## Architecture findings (audit)

- Zero-runtime-dependency static site generator; Node 22+ native TypeScript
  type-stripping (`erasableSyntaxOnly`, `verbatimModuleSyntax`, strict).
- Routes are generated in `src/site/pages.ts` → `renderAllPages()`; HTML helpers
  in `src/site/html.ts`; build in `scripts/build-site.ts` → `dist/`.
- Single canonical data pattern: typed registry + validators + selectors
  (`src/ecosystem/*`); public surfaces read only through selectors.
- Stewardship pattern: typed mirror of ratified canon + `validate*` functions
  returning human-readable violation lists (`src/stewardship/*`).
- Tests: `node --test tests/*.test.ts`, `node:assert/strict`, no framework.
- No persistence layer, no authentication, no notification system, no React /
  Supabase runtime / Express — none introduced.
- Templates live in `docs/stewardship/templates/` (15 existing; audited before
  adding any new ones).
- Accessibility conventions enforced by `tests/routes.test.ts` (single h1,
  heading order, skip link, text status labels, banned-claims list).

## Phases

| Phase | Deliverables | Status | Files | Verification | Commit |
| --- | --- | --- | --- | --- | --- |
| 0 Git safety + baseline | branch created from clean main; baseline suite green | Done | — | baseline results above | — |
| 1 Tracker | this file | Done | docs/implementation/… | n/a | see log |
| 2 Registry + vacancy coverage | operations registry, coverage model, decision packet | Done | src/stewardship/steward-operations-registry.ts, vacancy-coverage.ts | typecheck + tests | see log |
| 3 Records + classification + privacy | record model, IDs, validation, classification, private boundary/adapter | Done | operations-records.ts, record-identifiers.ts, record-validation.ts, record-classification.ts, private-record-boundary.ts, private-storage-adapter.ts | typecheck + tests | see log |
| 4 Queues + routing + escalation | observation queues, handoff routing/validation, escalation engine/validation | Done | observation-queues.ts, handoff-routing.ts, handoff-validation.ts, escalation-engine.ts, escalation-validation.ts | typecheck + tests | see log |
| 5 Calendar + ledger + SOPHIA + candidate boundary | review calendar, continuity ledger, decision lineage, SOPHIA advisory ops, candidate shell | Done | review-calendar.ts, continuity-ledger.ts, decision-lineage.ts, sophia-advisory-operations.ts, sophia-boundary-validation.ts, candidate-operations-boundary.ts | typecheck + tests | see log |
| 6 Interface | public operational-status surface consuming the registry | Done | src/site/stewardship-pages.ts, pages.ts | build + routes tests + links | see log |
| 7 Documentation | standards, guides, runbook, 4 DRAFT decision packets, templates, continuity record | Done | docs/stewardship/…, docs/continuity/… | link check | see log |
| 8 Tests + dry runs | operational test suites incl. 15 dry-run scenarios | Done | tests/steward-operations.test.ts, steward-workflows.test.ts, steward-dry-runs.test.ts | npm test | see log |
| 9 Full verification | typecheck, test, validate:registry, build, validate:links, targeted searches | Done | — | recorded below | see log |

## Human decisions required (represented as pending; nothing invented)

1. Vacancy coverage routing — who (if anyone) temporarily receives matters for
   each vacant post. State: `awaiting-human-decision` for all five posts.
   Packet: `docs/stewardship/decision-packets/VACANCY_COVERAGE_DECISION_PACKET.md` (DRAFT — NOT ADOPTED).
2. Candidacy sequencing — together vs sequential. Packet:
   `docs/stewardship/decision-packets/CANDIDACY_SEQUENCE_DECISION_PACKET.md` (DRAFT — NOT ADOPTED).
3. Private candidate-record system designation. Packet:
   `docs/stewardship/decision-packets/PRIVATE_STORAGE_DESIGNATION_DECISION_PACKET.md` (DRAFT — NOT ADOPTED).
   Until designated, candidate operations remain inactive by construction.
4. Orientation facilitator / readiness reviewer designation. Packet:
   `docs/stewardship/decision-packets/ORIENTATION_REVIEWER_DESIGNATION_PACKET.md` (DRAFT — NOT ADOPTED).
5. C-014 resolution — remains Deferred in `docs/CANONICAL_CONFLICT_REGISTER.md`;
   affected candidacies are blocked by `candidate-operations-boundary.ts`.

## Unresolved blockers

None blocking implementation. External setup still required for live operation
is listed in the runbook (`docs/stewardship/STEWARD_OPERATIONS_IMPLEMENTATION_RUNBOOK.md`).

## Verification evidence (final — 2026-07-22, branch head)

| Command | Result |
| --- | --- |
| `npm run typecheck` | clean (no output, exit 0) |
| `npm test` | 104 tests, 104 pass, 0 fail (45 pre-existing + 59 new, incl. 15 dry-run scenarios + fixture-privacy scan) |
| `npm run validate:registry` | registry valid: 25 environments |
| `npm run build` | Built 38 pages into dist/ (32 baseline + 6 steward-operations routes) |
| `npm run validate:links` | 1302 internal references resolve |

Targeted searches over all changed files: no TODO/FIXME; no "SOPHIA
approved"/"SOPHIA decided"/"auto-appointed"; no production-readiness or
fully-operational claims; no secrets or credential values; no hard-coded
occupied/appointed states outside validators and negative tests; no personal
names in fixtures. The only email-shaped strings are deliberate invalid
inputs in negative tests (reserved `example.org` domain) proving the privacy
detector rejects them.

## Adoption phase (2026-07-22 — separate from the technical implementation above)

Branch: `governance/adopt-steward-operations-and-vacancy-coverage-v1`, based
on `main` @ `8fedd8a` (merge of implementation PR #10).

| Step | Deliverable | Status |
| --- | --- | --- |
| Decision 1 | SD-2026-07-22-01 — infrastructure adopted; status implemented-pending-adoption → adopted-active (`INFRASTRUCTURE_STATUS`) | Done |
| Decision 2 | SD-2026-07-22-02 — Maurice Jackson, founding steward, temporary receiver of record; coverage awaiting-human-decision → temporarily-routed ×5 | Done |
| Independent-review safeguard | receiver self-conflict → independent-human-review-required, verified by tests; reviewer designation packet added (DRAFT) | Done |
| Continuity | two continuity records (adoption; vacancy coverage), append-only; implementation entry untouched | Done |
| Packet status | vacancy packet marked ADOPTED with history preserved; all other packets remain DRAFT — NOT ADOPTED | Done |
| Surfaces & docs | overview, registry standard, coverage plan, runbook, post status records, public status surface updated | Done |
| Tests | adoption/receiver boundary suite added; existing suites updated to the routed reality; all invariants preserved | Done |

Boundaries preserved: no appointment, no occupancy, no candidacy, no access
grant, no authority expansion, Observation-Only Mode unchanged, SOPHIA
advisory-only, C-014 open, private storage unconfigured. Adoption-phase
verification evidence is recorded in the two continuity records and the
final pull-request report.

Dry-run results: all 15 scenarios of
`docs/stewardship/STEWARD_OPERATIONS_DRY_RUN_PLAN.md` implemented in
`tests/steward-dry-runs.test.ts`; each passes, with prohibited automated
actions proven absent and required human actions asserted pending. See the
continuity record `docs/continuity/2026-07-22-steward-operations-v1-implementation.md`.
