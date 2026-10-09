---
name: canonical-drift-audit
description: Read-only audit for suspected drift between canonical Bridge Builders records, implementation files, tests, and public claims.
---

# Canonical Drift Audit

Use this skill to inspect suspected drift between canonical Bridge Builders
records and repository implementation artifacts.

## Boundary

This skill is read-only. It may inspect, search, compare, and report. It must
not edit files, approve governance, ratify decisions, create credentials, deploy
systems, or add tools.

## Inputs

- the repository branch or pull request under review
- the paths, claims, or changes that may create drift
- any known canonical records or decision references

## Procedure

1. Read `AGENTS.md`.
2. Identify the relevant canonical source files, especially records under
   `docs/canonical/`, `docs/continuity/`, and `docs/stewardship/decisions/`.
3. Compare the reviewed artifact against the canonical source files and related
   implementation files.
4. Classify each finding as verified fact, suspected drift, governance question,
   or implementation defect.
5. Cite exact repository paths for every finding.

## Report Format

Include:

- scope reviewed
- canonical evidence
- implementation or public-claim evidence
- drift findings, if any
- validation performed
- remaining governance questions for steward review
