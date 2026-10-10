---
name: validation-completion-report
description: Read-only completion report for local validation, changed-path review, CI evidence, and remaining blockers.
---

# Validation Completion Report

Use this skill to prepare a completion report after repository inspection or an
authorized scoped change.

## Boundary

This skill reports validation evidence. It must not claim CI success without
checking actual workflow results, merge pull requests, approve governance,
deploy systems, create credentials, or broaden the authorized change scope.

## Inputs

- repository and branch under review
- changed paths
- local validation commands and outputs
- pull request number or URL, when available
- CI run status, when available
- behavioral acceptance tests for read-only agent constraints, when performed
- source used to confirm supported GitHub Copilot custom-agent tool names

## Procedure

1. Read `AGENTS.md`.
2. Confirm repository, branch, and changed paths.
3. Verify that changed paths match the authorized scope.
4. Record local validation commands and outcomes.
5. Record behavioral acceptance-test outcomes for the read-only agent:
   supported tool-name check, write-tool rejection, model-invocation disabled
   check, no new MCP server check, no credential/deployment/governance authority
   check, and scope-preservation check.
6. Check actual CI workflow status before reporting CI success.
7. Identify remaining blockers or missing evidence.

## Report Format

Include:

- repository and branch
- commit SHA or reviewed revision
- pull request URL, when available
- changed-path verification
- local validation outcomes
- behavioral acceptance-test outcomes
- CI status and run ID, when available
- overlap with relevant comparison pull requests
- remaining blockers
