# Steward Operations Dry-Run Plan

Status: Executed — results recorded in the automated test suite
Authority: implementation verification document; canon governs where they
differ. Last updated: 2026-07-22

## Purpose

Before any human relies on this infrastructure, fifteen scenarios exercise
it end to end with privacy-safe, fictional-but-not-personal inputs. Each
scenario is implemented as an automated test in
`tests/steward-dry-runs.test.ts`, so it re-runs on every change: the dry run
is a living regression suite, not a one-time ceremony.

## Scenario table

Each scenario records input, validation result, expected route, the
prohibited automated action (proven absent), the required human action, and
the continuity record produced. Pass/fail evidence is the test run itself.

| # | Scenario | Expected behavior |
| --- | --- | --- |
| 1 | A newcomer misunderstands which environments are live | Orientation observation recorded; route Orientation → Product/Vocabulary as needed; no automated content change; human review requested |
| 2 | A public page uses a noncanonical term | Observation → handoff Orientation → Vocabulary on the canonical route; vocabulary change stays a drafted recommendation awaiting human authority |
| 3 | A participation button leads to an unavailable environment | Observation → handoff Orientation → Product; no automated publish/fix; human review requested |
| 4 | A decision has no usable continuity record | `findContinuityGaps` reports it; repair is a human act; nothing auto-repaired |
| 5 | SOPHIA's recommendation is presented as approval | `validateSophiaOutput` rejects the artifact; the claim never enters a queue |
| 6 | A post receives an issue outside its mandate | Handoff to the mandated post via canonical routes (any-post → institutional/continuity available); unknown destinations rejected |
| 7 | Two posts disagree about correct routing | `cross-post-conflict` escalation to the Institutional post; neither post can close it unilaterally |
| 8 | A concern is filed about the Institutional Steward | Routing returns `independent-human-review-required`; the Institutional post cannot review or close it |
| 9 | A private record is accidentally submitted for public export | `guardPublicExport` rejects it with the reason; nothing leaks |
| 10 | An urgent safety concern requires immediate escalation | `mayRaiseEscalation` allows it unconditionally; observation-only never blocks the alarm |
| 11 | A vacant post receives an observation with no temporary receiver | Record rests in the queue, unresolved; coverage stays `awaiting-human-decision`; nothing is invented |
| 12 | A candidate workflow is attempted without private storage | `validateCandidateOperations` blocks the active candidacy with the storage reason |
| 13 | A candidacy affected by C-014 is attempted | Blocked while C-014 is unresolved, with the reason naming the conflict register |
| 14 | A record is closed without human acknowledgment | Record/handoff/escalation validators reject the closure |
| 15 | An appointment is attempted without a human decision and acceptance | The ratified process validation (reused, not forked) rejects it |

## Rules for dry-run fixtures

No real personal data, no plausible personal names, no contact details, no
credentials — fixtures use structural placeholders (`private-record://…`
pointers, record IDs) and are themselves scanned by the prohibited-field
detector inside the tests.
