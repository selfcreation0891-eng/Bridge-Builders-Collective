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

## Procedure

1. Read `AGENTS.md`.
2. Identify the relevant canonical governance source files, especially records
   under `docs/canonical/`, `docs/continuity/`,
   `docs/stewardship/decisions/`, `docs/stewardship/decision-packets/`,
   `docs/stewardship/templates/`, and the conflict register.
3. Identify the website implementation surfaces that render or encode the same
   claims, including `src/ecosystem/`, `src/site/`, `tests/`, generated
   summaries, route copy, navigation labels, trust/status pages, and workflow
   configuration.
4. When Academy material is accessible, compare against Academy source files
   without importing Academy authority into this repository. Use the Academy
   repository only for substantive Academy curriculum, facilitator materials,
   participant materials, review packets, Challenge Library material, program
   manifests, release-readiness records, and source-of-truth audit evidence.
5. Compare governance, website, and Academy sources in a three-way matrix:
   canonical rule or decision; rendered or implemented website claim; Academy
   source or absence of accessible Academy evidence.
6. Flag drift when website or Academy material advances public status, release
   readiness, professional review, steward testing, pilot readiness,
   Challenge Library citation sufficiency, research-evidence grade, or
   governance authority beyond recorded evidence.
7. Classify each finding as verified fact, inference, suspected drift,
   governance question, implementation defect, or inaccessible evidence.
8. Cite exact repository paths for every finding and state when an Academy
   source was not accessible.

## Report Format

Include:

- scope reviewed
- canonical evidence
- website implementation or public-claim evidence
- Academy-source evidence, or inaccessible-source note
- three-way drift matrix
- drift findings, if any
- validation performed
- remaining governance questions for steward review
