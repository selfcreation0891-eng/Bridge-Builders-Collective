# Continuity Record — Two-Repository Architecture Adoption

Date: 2026-08-06 (Pacific)
Author of record: Cowork implementation session under `CLAUDE.md` operational
context, recording the founder's written architecture countersign and wording
approval (with amendments) of 2026-08-06.

## What happened

The founder ratified the two-repository architecture (Option C via Option A
mechanics), recorded as **SD-2026-08-06-01**: Bridge-Builders-Collective is
the canonical authority; bridgebuilderscollective (Lovable project
`a56e45b8-07ab-41f8-a76f-f8b144a3d76d`) is the live Front Door
implementation, consuming generated canonical artifacts under the corrected
export and drift design; the reference front door is not a second production
deployment; merges and migrations are unauthorized absent a founder
decision. `docs/FRONT_DOOR_BOUNDARY.md` was amended to Version 2. This
resolves the structural half of C-021; live conformance evidence remains
required for the content half. Preparation was performed in an isolated
worktree (`bbc-arch-worktree`) branched from the preservation base while the
C-022 working diff remained untouched in the primary working tree (blob
`be285ec`, byte-identical snapshots preserved).

## What did not happen

No implementation-repository, Lovable, Supabase, DNS, or production change.
No C-022 incorporation (separate increment, SD-2026-08-06-02). No identity
decision (item 6 deferred; Constitution §1 remains the lead identity). No
synchronization code written.

## Unresolved commitments carried forward

C-022 incorporation increment; consolidated identity decision; export/drift
implementation increment; C-021 conformance evidence; Supabase gate items
(SG-1 execution, deny tests, Security Advisor, `contribution_allows`
confirmation); mailbox verification; standing queue (C-016/C-017, C-005…C-009,
C-014, steward packets, private storage, policy dates, quarantined
artifacts).
