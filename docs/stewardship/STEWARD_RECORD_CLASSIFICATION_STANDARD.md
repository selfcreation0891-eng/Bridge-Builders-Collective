# Steward Record Classification Standard

Status: Adopted as implementation standard — subordinate to canon
Authority: subordinate to the Constitution's consent protections,
`PRIVACY_POLICY.md`, and `DATA_RETENTION_POLICY.md`. Last updated: 2026-07-22

## Three classes, one public repository

Every operational record carries exactly one classification
(`src/stewardship/record-classification.ts`):

### 1. Public governance (`public-governance`)

Ratified standards, vacancy status, adopted decisions, operating mode, public
review summaries. The only class that may appear in this public repository or
any public export.

### 2. Restricted stewardship (`restricted-stewardship`)

Internal observations, unresolved escalations, internal continuity packets,
product-risk findings, institutional review notes. Never published. In this
repository such material exists only as privacy-safe references.

### 3. Private candidate or participant (`private-candidate-or-participant`)

Applications, personal contact details, accommodations, legal-capacity
information, private conflict disclosures, private facilitator notes. Never
stored in this repository in any form — not in code, not in docs, not in
fixtures, not in test data. Held only in a human-designated private system
(see `PRIVATE_CANDIDATE_RECORD_STORAGE_REQUIREMENTS.md`); referenced here
only as `private-record://<system>/<opaque-token>` pointers.

## Machine-checked boundary

- `detectProhibitedFields` scans keys and values for private-data signals
  (names of prohibited fields; email and phone-shaped values; credential
  fields). It runs on records, fixtures, and export payloads.
- `guardPublicExport` admits only clean `public-governance` records. A
  rejected record is the boundary working — the correct response is to fix
  the classification or move the content to the right system, never to relax
  the guard.
- `validateReferencePrivacy` keeps identifiers and references free of
  personal data: no email addresses, no phone-length digit runs, no prose.
- Tests construct deliberately invalid records and prove they are rejected.

## What this repository may contain

Public-governance records; schemas and types; empty templates; test fixtures
containing no personal information; and pointers to private systems. Nothing
else. Where a workflow seems to need more, the workflow is wrong or the
content belongs elsewhere — see the observation workflow's guidance on
writing privacy-safe summaries.
