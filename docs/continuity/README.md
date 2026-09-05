# Continuity Records — Bridge Builders Collective

This directory stores continuity notes, reconciliation records, and phase evidence for the Bridge Builders Collective operational ecosystem.

## Purpose

Continuity records exist to preserve verified state across tools, sessions, and time. They are not marketing copy, progress reports, or aspirational documents. They record what actually happened, what was verified, and what remains unresolved.

## Directory Structure

| File | Purpose |
|------|---------|
| `PROJECT_IDENTITY.md` | Canonical identity record for the Portfolio Control Center |
| `LOVABLE_GITHUB_RECONCILIATION.md` | Reconciliation between Lovable and GitHub for the PCC |
| `LOCAL_VERIFICATION.md` | Record of local application verification runs |
| `EVIDENCE_STANDARD.md` | Definitions of evidence states used across the system |
| `HANDOFF_STANDARD.md` | Required fields for every handoff between tools |
| `REPOSITORY_BOUNDARY.md` | What this repository owns and does not own |
| `RECOVERY_RUNBOOK.md` | Steps to recover the application from any failure state |
| `KNOWN_LIMITATIONS.md` | Documented limitations of the current system |
| `NEXT_PHASE.md` | What PCC-3 requires before it may begin |
| `2026-07-20-steward-posts-charter-ratification.md` | Ratification of the Permanent Steward Posts Charter |
| `2026-07-21-steward-appointment-process-ratification.md` | Ratification of the Steward Eligibility, Orientation, and Appointment Process |

## Naming Convention

- Steward decision continuity notes: `YYYY-MM-DD-{slug}.md`
- Phase evidence records: `docs/evidence/PCC-{NNNN}-{slug}.md`
- Reconciliation records: named by subject (e.g., `LOVABLE_GITHUB_RECONCILIATION.md`)

## Evidence States

See `EVIDENCE_STANDARD.md` for definitions of:
- reported
- inspected
- reproduced
- accepted

## Governance

This directory is maintained under the Bridge Builders Collective governance framework. Changes to continuity records should be made on working branches and reviewed before merging to `main`.
