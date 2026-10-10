---
name: academy-source-verification
description: Read-only verification of Bridge Builders Academy source-of-truth references, nine-deliverable coverage, STEAM lessons, Challenge Library citations, research evidence grading, human-review stages, repository boundaries, and implementation alignment.
---

# Academy Source Verification

Use this skill to verify Academy-related source-of-truth references,
nine-deliverable coverage, STEAM lesson completeness, Challenge Library
citations, research evidence grading, human-review stages, and implementation
alignment without changing repository content.

## Boundary

This skill is read-only. It may inspect, search, compare, and report evidence.
It must not decide governance questions, ratify Academy authority, create new
source-of-truth records, edit files, or add integrations.

## Inputs

- Academy-related paths, pull requests, or claims under review
- known source-of-truth or boundary records
- any implementation files that reference Academy status
- accessible Academy repository paths, if available
- the deliverable list or package definition under review, if it differs from
  the current Academy source-of-truth index

## Foundation Matrix

Use the Academy source-of-truth index when accessible. Maintain a Foundation
matrix with one row for each of these nine existing Foundation source
deliverables before accepting any claim that the Foundation suite is complete:

1. `FOUNDATION_CURRICULUM_COMPLETE.md`
2. `FOUNDATION_FACILITATOR_GUIDE.md`
3. `FOUNDATION_LEARNER_WORKBOOK.md`
4. `FOUNDATION_REFLECTION_JOURNAL.md`
5. `FOUNDATION_PRACTICE_LAB_GUIDE.md`
6. `FOUNDATION_SESSION_KITS.md`
7. `FOUNDATION_MEDIA_PLAN.md`
8. `FOUNDATION_CERTIFICATION_CRITERIA.md`
9. `FOUNDATION_INSTITUTIONAL_EDITION.md`

Each Foundation row must record:

- exact source repository
- exact source path
- source branch
- source commit SHA
- evidence status: present, absent, partial, inaccessible, or conflicting
- structural status
- human-review status
- notes on public-status, release-readiness, grading/ranking, accessibility,
  cultural/community review, and qualified-review boundaries

Foundation completion means only that these nine Foundation source deliverables
are accounted for at the stated evidence status. Do not treat Foundation
completion as completion of any other Academy package, delivery model, program,
Challenge Library, research citation set, onboarding/assessment material, or
release-readiness record.

## Academy Delivery Matrix

Maintain a separate Academy delivery matrix for non-Foundation Academy packages
and delivery surfaces. Required rows are:

1. Five-Day program
2. Four-week cohort
3. 12-lesson STEAM curriculum
4. Facilitator package or packages
5. Participant package or packages
6. Challenge Library
7. Research citations and evidence grading
8. Sun Reset
9. Synaptic Bridge
10. Onboarding, assessments, and release readiness

Each Academy delivery row must record:

- exact source repository
- exact source path or paths
- source branch
- source commit SHA
- evidence status: present, absent, partial, inaccessible, or conflicting
- package status: not started, authored, structurally verified, reviewed,
  steward tested, pilot ready, release ready, or status unknown
- human-review status, including reviewer type, date, scope, and outcome when
  available
- source-of-truth relationship to governance records and public website
  implementation
- notes on citations, evidence grade, safety boundaries, accessibility,
  cultural/community review, qualified-professional review, public route status,
  and release-readiness limits

Do not infer that a package is missing merely because it is inaccessible. Record
inaccessible evidence as inaccessible and identify what access or repository
path would be needed to verify it.

Also verify the broader Academy ownership categories named by canonical records:
courses, curriculum, onboarding, learning pathways, cohort structures, STEAM
programming, facilitator materials, workbooks, session kits, participant
progress structures, research-informed curriculum updates, and youth/adult
learning programs.

## Procedure

1. Read `AGENTS.md`.
2. Locate Academy-related canonical and continuity records, including
   `docs/continuity/2026-09-01-academy-source-of-truth-cleanup.md` when present.
3. Search for Academy references across documentation, implementation code,
   tests, public pages, generated registry outputs, and accessible Academy
   source files.
4. Compare each reference with the repository boundary and source-of-truth
   records. Treat this repository as canonical for ecosystem identity, public
   status, navigation, governance, and front-door presentation; treat the
   Academy repository, when accessible, as source-of-truth for substantive
   Academy curriculum, facilitator materials, participant materials, review
   packets, Challenge Library material, program materials, and release-readiness
   records.
5. Complete the Foundation matrix by checking existence, non-placeholder
   content, current status wording, structural-verification evidence,
   human-review status, branch, commit SHA, and release-readiness limits for
   each of the nine Foundation deliverables.
6. Complete the Academy delivery matrix separately. Do not let Foundation
   evidence satisfy delivery rows for the Five-Day program, four-week cohort,
   STEAM curriculum, facilitator/participant packages, Challenge Library,
   research citations/evidence grading, Sun Reset, Synaptic Bridge, or
   onboarding/assessments/release readiness.
7. Verify STEAM lessons and any STEAM program references against the canonical
   naming quarantine and intake status. Confirm lesson scope, learning
   objectives, materials, accessibility notes, participant-safety boundaries,
   no unsupported public-availability claim, and no use of prohibited public
   "BBC STEAM" naming unless recorded as quarantined evidence.
8. Verify Challenge Library citations. Each challenge should cite its source or
   program relationship, canonical vocabulary terms, applicable consent/archive
   boundary, accessibility/cultural review needs, and any research or
   evidence basis. Missing citations are findings; invented citations are
   defects.
9. Grade research evidence without changing curriculum status. Use conservative
   evidence labels: established evidence, emerging evidence, traditional or
   community knowledge, lived-experience observation, internal practice
   rationale, or unsupported claim. Flag health, finance, legal, clinical,
   educational-outcome, or youth claims that lack qualified human review.
10. Verify human-review stages. Do not advance any material past authored or
   structurally verified unless repository evidence records the responsible
   human reviewer, review domain, date, scope, outcome, and follow-up.
   Required stages to check are accessibility review, cultural/community
   review, qualified professional review where relevant, steward testing,
   bounded pilot readiness, pilot evidence, and release-readiness decision.
11. Classify each issue as verified fact, inference, suspected drift,
    governance question, implementation defect, or inaccessible evidence.

## Academy Status Rules

- AI review is advisory only and never counts as professional review, steward
  testing, pilot readiness, or release readiness.
- A file that exists but lacks review evidence is authored, not reviewed.
- Structural verification does not imply public release, pilot readiness,
  professional review, or governance approval.
- Completion criteria must remain participation-based and stewardship-witnessed;
  do not accept grading, ranking, scoring, comparative badges, or learner-worth
  evaluations.
- Challenge Library and STEAM material must preserve safety, accessibility,
  cultural/community review, consent, archive, research, and public-status
  boundaries.

## Report Format

Include:

- scope reviewed
- source-of-truth evidence
- repository-boundary evidence
- Foundation matrix
- Academy delivery matrix
- STEAM lesson verification
- Challenge Library citation findings
- research evidence grading findings
- human-review stage status
- aligned references
- suspected drift or unresolved questions
- validation performed
