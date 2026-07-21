# Change Authority

Version 1.0 — 2026-07-15. Authority level derives from position in `ECOSYSTEM_AUTHORITY_ORDER.md`.

## Who may propose

Anyone — stewards, contributors, participants, and advisory systems (including SOPHIA, advisory-only) — may propose changes via pull request or recorded steward note.

## Who may approve

- **Constitutional changes**: founding steward(s) only, recorded as adopted steward decisions with date and rationale. Protected principles may be strengthened, never weakened (Constitution §13).
- **Vocabulary changes**: founding steward(s); the Rosetta Stone environment stewards once constituted.
- **Public environment status changes**: founding steward(s), with the evidence class required by `ENVIRONMENT_STATUS_STANDARD.md`.
- **Implementation changes**: reviewed via pull request against `main`; must keep CI green; merge requires steward approval.

## Steward posts (pending ratification)

The Permanent Steward Posts Charter (`docs/canonical/PERMANENT_STEWARD_POSTS_CHARTER.md`) is drafted and awaits ratification. Its ratification, and any later amendment of it, requires an adopted steward decision by founding steward(s) under this document. Once ratified: steward post appointments and removals follow Charter §9 with recorded appointing authority; all posts begin observation-only; expanded post authority requires a separate adopted steward decision. This section grants no authority before that ratification decision is recorded, and nothing in the Charter changes the approval authorities listed above.

## Urgent corrections

Truthfulness corrections (a public claim found false, a status found overstated) may be made immediately by any steward, recorded within 48 hours as a steward decision, and reconciled in the conflict register.

## Conflicting downstream content

When a downstream environment contradicts canonical truth: record the conflict in `docs/CANONICAL_CONFLICT_REGISTER.md`, correct the downstream surface, and note the resolution. The registry is never edited to match a downstream error.

## Recording

Changes are recorded through: git history on `main`, the conflict register, release notes (`docs/PUBLIC_RELEASE_NOTES_*.md`), and continuity notes per `docs/POST_RELEASE_CONTINUITY_PLAN.md`. Public change history is maintained through tagged releases and release notes.

## SOPHIA boundary (restated)

SOPHIA may draft proposals but may not approve, merge, publish, or change any status. Constitution §9 governs.
