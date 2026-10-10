---
name: canonical-drift-audit
description: Read-only audit for suspected drift between canonical Bridge Builders governance records, website implementation, Academy sources when accessible, tests, and public claims.
---

# Canonical Drift Audit

Use this skill to inspect suspected drift between canonical Bridge Builders
governance records, website implementation artifacts, Academy sources when
accessible, tests, and public claims.

## Boundary

This skill is read-only. It may inspect, search, compare, and report. It must
not edit files, approve governance, ratify decisions, create credentials, deploy
systems, or add tools.

## Inputs

- the repository branch or pull request under review
- the paths, claims, or changes that may create drift
- any known canonical records or decision references
- accessible Academy source paths or repository references, when Academy
  curriculum, program materials, review packets, Challenge Library material, or
  learning-status claims are in scope

## Repository Comparison Set

When accessible, explicitly compare these repositories as separate evidence
surfaces:

| Repository | Evidence role |
| --- | --- |
| `Bridge-Builders-Collective` | Governance authority and static reference artifacts, including canonical records, continuity records, decision records, conflict records, stewardship templates, and source-of-truth boundary records. |
| `bridgebuilderscollective` | Live website implementation, including navigation, content registries, public routes, live-facing copy, route manifests, content collections, and implementation-specific status displays. |
| `Bridge-Builders-Academy` | Substantive Academy curriculum and program sources, including Foundation deliverables, delivery packages, STEAM material, Challenge Library material, research citation/evidence records, Sun Reset, Synaptic Bridge, onboarding, assessments, and release-readiness packets. |

Do not collapse these repositories into one authority. The canonical repository
can decide governance and public status; the website repository can reveal
implementation discrepancies; the Academy repository can evidence substantive
curriculum/program source state. Historical language is evidence of prior
state, not automatically a current governance decision.

## Procedure

1. Read `AGENTS.md`.
2. Identify the relevant `Bridge-Builders-Collective` governance source files,
   especially records
   under `docs/canonical/`, `docs/continuity/`,
   `docs/stewardship/decisions/`, `docs/stewardship/decision-packets/`,
   `docs/stewardship/templates/`, and the conflict register.
3. Identify the `bridgebuilderscollective` live website implementation surfaces
   that render or encode the same claims, including navigation, content
   registries, public routes, generated summaries, route copy, labels,
   trust/status pages, tests, and workflow configuration.
4. Identify the `Bridge-Builders-Academy` substantive source surfaces when
   accessible, including curriculum, facilitator materials, participant
   materials, program packages, STEAM material, Challenge Library material,
   research citation/evidence records, Sun Reset, Synaptic Bridge, onboarding,
   assessments, review packets, and release-readiness records.
5. Compare all accessible sources in a three-repository matrix:
   governance/static reference evidence; live website implementation evidence;
   Academy substantive-source evidence.
6. Distinguish implementation discrepancies from governance decisions and
   historical language. A website mismatch may be an implementation defect, not
   a governance change. Historical wording may be lineage evidence, not current
   authority. Academy source status may evidence curriculum state, not public
   status.
7. Record inaccessible evidence without claiming the material is missing. For
   each inaccessible source, identify repository, expected path or search
   target, access limitation, and the claim that remains unverified.
8. Flag drift when website or Academy material advances public status, release
   readiness, professional review, steward testing, pilot readiness,
   Challenge Library citation sufficiency, research-evidence grade, or
   governance authority beyond recorded governance evidence.
9. Classify each finding as verified fact, inference, suspected drift,
   governance question, implementation discrepancy, historical-language note,
   implementation defect, or inaccessible evidence.
10. Cite exact repository names, branches when known, commit SHAs when known,
    and paths for every finding.

## Report Format

Include:

- scope reviewed
- canonical evidence
- website implementation or public-claim evidence
- Academy-source evidence, or inaccessible-source note
- three-repository drift matrix
- implementation discrepancies separated from governance decisions
- historical-language notes, if any
- inaccessible-evidence log
- drift findings, if any
- validation performed
- remaining governance questions for steward review
