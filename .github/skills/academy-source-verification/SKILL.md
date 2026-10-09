---
name: academy-source-verification
description: Read-only verification of Bridge Builders Academy source-of-truth references, repository boundaries, and implementation alignment.
---

# Academy Source Verification

Use this skill to verify Academy-related source-of-truth references and
implementation alignment without changing repository content.

## Boundary

This skill is read-only. It may inspect, search, compare, and report evidence.
It must not decide governance questions, ratify Academy authority, create new
source-of-truth records, edit files, or add integrations.

## Inputs

- Academy-related paths, pull requests, or claims under review
- known source-of-truth or boundary records
- any implementation files that reference Academy status

## Procedure

1. Read `AGENTS.md`.
2. Locate Academy-related canonical and continuity records, including
   `docs/continuity/2026-09-01-academy-source-of-truth-cleanup.md` when present.
3. Search for Academy references across documentation, implementation code,
   tests, public pages, and generated registry outputs.
4. Compare each reference with the repository boundary and source-of-truth
   records.
5. Classify each issue as verified fact, suspected drift, governance question,
   or implementation defect.

## Report Format

Include:

- scope reviewed
- source-of-truth evidence
- repository-boundary evidence
- aligned references
- suspected drift or unresolved questions
- validation performed
