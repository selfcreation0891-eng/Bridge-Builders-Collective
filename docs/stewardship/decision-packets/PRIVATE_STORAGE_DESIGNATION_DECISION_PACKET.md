# Decision Packet — Private Candidate-Record Storage Designation

**DRAFT — HUMAN DECISION REQUIRED — NOT ADOPTED**

This packet prepares a decision; it makes none. No provider is designated;
the adapter remains honestly unconfigured; live candidacy remains blocked in
code until this decision exists. Prepared: 2026-07-22.
Decision authority: founding steward, per `docs/canonical/CHANGE_AUTHORITY.md`.

## The question

Which private system will hold candidate and participant records —
applications, contact details, accommodations, legal-capacity information,
conflict disclosures, facilitator notes — that must never enter this public
repository?

## Requirements the designated system must meet

The full requirements live in
`docs/stewardship/PRIVATE_CANDIDATE_RECORD_STORAGE_REQUIREMENTS.md`:
role-based accountable access; consent-aligned retention and deletion;
opaque-token referenceability (`private-record://…`); no derivation into
public systems; continuity across steward turnover; audit logs reviewable at
the quarterly authority review.

## Option shapes (no vendor is endorsed here)

1. **Managed encrypted document store** administered by the founding steward
   with documented access grants. Lowest setup; depends on one person until
   posts are filled (a named single-person dependency for the ledger).
2. **Organization-controlled private repository or drive with restricted
   membership.** Familiar tooling; requires careful audit of sharing
   defaults and export paths.
3. **Purpose-built records system** (chosen later against the requirements).
   Strongest fit; highest cost; premature before any candidacy volume
   exists.

## What adoption requires

The decision record must name the system, the humans with access, the
consent and retention mapping, and the audit arrangement. Configuration
happens outside this repository; here, the only change is implementing the
adapter against the designated system and flipping nothing until it verifies.
No credentials, endpoints, or secrets enter this repository under any option.

## Until adopted

`UNCONFIGURED_PRIVATE_STORAGE` refuses every operation with the reason, and
`validateCandidateOperations` blocks any active candidacy. That blocking is
correct behavior, not a defect.
