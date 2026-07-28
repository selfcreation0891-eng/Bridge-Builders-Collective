# Change Authority

Version 1.0 — 2026-07-15. Authority level derives from position in `ECOSYSTEM_AUTHORITY_ORDER.md`.

## Who may propose

Anyone — stewards, contributors, participants, and advisory systems (including SOPHIA, advisory-only) — may propose changes via pull request or recorded steward note.

## Who may approve

- **Constitutional changes**: founding steward(s) only, recorded as adopted steward decisions with date and rationale. Protected principles may be strengthened, never weakened (Constitution §13).
- **Vocabulary changes**: founding steward(s); the Rosetta Stone environment stewards once constituted.
- **Public environment status changes**: founding steward(s), with the evidence class required by `ENVIRONMENT_STATUS_STANDARD.md`.
- **Implementation changes**: reviewed via pull request against `main`; must keep CI green; merge requires steward approval.

## Steward posts

The Permanent Steward Posts Charter (`docs/canonical/PERMANENT_STEWARD_POSTS_CHARTER.md`) was ratified on July 20, 2026 by adopted steward decision SD-2026-07-20-01 (`docs/stewardship/decisions/`). Steward post appointments and removals follow Charter §9 with recorded appointing authority under this document; all five posts operate observation-only and are vacant until separately appointed; expanded post authority requires a separate adopted steward decision. Nothing in the Charter changes the approval authorities listed above.

The Steward Eligibility, Orientation, and Appointment Process (`docs/stewardship/STEWARD_ELIGIBILITY_ORIENTATION_AND_APPOINTMENT_PROCESS.md`, ratified July 21, 2026 by adopted steward decision SD-2026-07-21-01) elaborates how Charter §9.2 appointments are prepared and recorded. It creates no new approval authority: the founding steward remains the appointment decision authority; orientation completion, eligibility, and readiness findings are never appointments; every appointment requires its own recorded human decision and the appointee's recorded acceptance; SOPHIA may not select, rank, approve, reject, appoint, or grant access. Its adoption appointed no one; all five posts remain vacant.

## Artifact lifecycle standard

The Relational File Stewardship and Self-Audit Standard (`docs/canonical/RELATIONAL_FILE_STEWARDSHIP_STANDARD.md`, ratified July 28, 2026 by adopted steward decision SD-2026-07-28-01) governs how artifacts are classified, placed, related, audited, merged, archived, deprecated, and declared complete, and requires stable conversation decisions to be converted into repository records. It creates no new approval authority: dispositions of quarantined artifacts, registry additions, vocabulary additions, domain confirmation, and adoption of independent systems remain steward decisions under this document.

## Urgent corrections

Truthfulness corrections (a public claim found false, a status found overstated) may be made immediately by any steward, recorded within 48 hours as a steward decision, and reconciled in the conflict register.

## Conflicting downstream content

When a downstream environment contradicts canonical truth: record the conflict in `docs/CANONICAL_CONFLICT_REGISTER.md`, correct the downstream surface, and note the resolution. The registry is never edited to match a downstream error.

## Recording

Changes are recorded through: git history on `main`, the conflict register, release notes (`docs/PUBLIC_RELEASE_NOTES_*.md`), and continuity notes per `docs/POST_RELEASE_CONTINUITY_PLAN.md`. Public change history is maintained through tagged releases and release notes.

## SOPHIA boundary (restated)

SOPHIA may draft proposals but may not approve, merge, publish, or change any status. Constitution §9 governs.
