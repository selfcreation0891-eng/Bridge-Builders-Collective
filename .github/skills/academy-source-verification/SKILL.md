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

## Verification Matrix

Use the Academy source-of-truth index when accessible. At minimum, verify these
nine Foundation deliverables from the Academy master index before accepting any
claim that the Foundation suite is complete:

1. `FOUNDATION_CURRICULUM_COMPLETE.md`
2. `FOUNDATION_FACILITATOR_GUIDE.md`
3. `FOUNDATION_LEARNER_WORKBOOK.md`
4. `FOUNDATION_REFLECTION_JOURNAL.md`
5. `FOUNDATION_PRACTICE_LAB_GUIDE.md`
6. `FOUNDATION_SESSION_KITS.md`
7. `FOUNDATION_MEDIA_PLAN.md`
8. `FOUNDATION_CERTIFICATION_CRITERIA.md`
9. `FOUNDATION_INSTITUTIONAL_EDITION.md`

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
5. Verify nine-deliverable coverage by checking existence, non-placeholder
   content, current status wording, structural-verification evidence, and
   release-readiness limits for each deliverable.
6. Verify STEAM lessons and any STEAM program references against the canonical
   naming quarantine and intake status. Confirm lesson scope, learning
   objectives, materials, accessibility notes, participant-safety boundaries,
   no unsupported public-availability claim, and no use of prohibited public
   "BBC STEAM" naming unless recorded as quarantined evidence.
7. Verify Challenge Library citations. Each challenge should cite its source or
   program relationship, canonical vocabulary terms, applicable consent/archive
   boundary, accessibility/cultural review needs, and any research or
   evidence basis. Missing citations are findings; invented citations are
   defects.
8. Grade research evidence without changing curriculum status. Use conservative
   evidence labels: established evidence, emerging evidence, traditional or
   community knowledge, lived-experience observation, internal practice
   rationale, or unsupported claim. Flag health, finance, legal, clinical,
   educational-outcome, or youth claims that lack qualified human review.
9. Verify human-review stages. Do not advance any material past authored or
   structurally verified unless repository evidence records the responsible
   human reviewer, review domain, date, scope, outcome, and follow-up.
   Required stages to check are accessibility review, cultural/community
   review, qualified professional review where relevant, steward testing,
   bounded pilot readiness, pilot evidence, and release-readiness decision.
10. Classify each issue as verified fact, inference, suspected drift,
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
- nine-deliverable coverage table
- STEAM lesson verification
- Challenge Library citation findings
- research evidence grading findings
- human-review stage status
- aligned references
- suspected drift or unresolved questions
- validation performed
