# Synaptic Bridge Registration — Founder Decision Packet

Status: DRAFT — prepared 2026-07-27 (Pacific) for founding-steward countersign.
Nothing in this packet is adopted. Adoption requires a recorded founder
decision per `docs/canonical/CHANGE_AUTHORITY.md`; upon countersign this
becomes an adopted steward decision (SD-…) and conflict rows C-019 (and the
affected parts of C-021) are updated.

## Why this packet exists

An uncommitted working-tree change to `src/ecosystem/ecosystem-registry.ts`
registers "Synaptic Bridge" citing **"Founder decision F-1 (2026-07-27)"** —
but no decision record for F-1 exists anywhere in the repository. Under the
Relational File Stewardship Standard §13, a conversation-derived decision is
not canonical until recorded. This packet converts F-1 into a recordable
decision without manufacturing approval. The change is **quarantined, not
reverted**: it remains in the working tree untouched, and its diff is
preserved below as evidence.

The change is **actively evolving**: between 20:24 and ~21:05 PDT on
2026-07-27 it grew from the Synaptic Bridge entry alone to also include
status raises and description rewrites (detail below). A concurrent working
session appears to be editing this repository. **Before countersigning,
re-run `git diff src/ecosystem/ecosystem-registry.ts` and review the diff as
it stands at decision time.**

## What the audit verified (evidence for)

- `https://bridgebuilderscollective.com/programs/synaptic-bridge` is live and
  publicly reachable (verified 2026-07-27 ≈21:00 PDT): titled "Synaptic
  Bridge — 21-Day Continuity Journey", describing three seven-day arcs
  (Return to Presence, Pattern Sync for Self Build, Bridge into
  Contribution), any-order entry, explicitly no payments; no eligibility or
  outcome claims found. The registry entry's factual wording matches the
  live page.
- The entry is conservatively written: `featured: false`, no outcome
  promises, honest access notice, `parentEnvironmentId: 'programs'`.
- The entry passes registry validation (26 environments valid).

## What the audit could not verify (evidence against / missing)

- No F-1 decision record exists in `docs/stewardship/decisions/` or anywhere
  else in the repository; "F-1" appears only inside the uncommitted change.
- The destination presupposes `bridgebuilderscollective.com` as canonical —
  C-018 is unresolved (see the companion Canonical Domain Decision Packet).
- The "current public application" cited as evidence is not built from this
  repository and conflicts with `docs/FRONT_DOOR_BOUNDARY.md` (C-021).
- A technically valid registry entry is not founder approval.

## Classification finding (intake rule, Standard §12)

Synaptic Bridge is a **program** — a delivered participant experience inside
the Programs branch — not a new core environment, organization, or
repository. This matches the registry's existing pattern of registering
program branches as entries. Recommended classification: registry entry with
`parentEnvironmentId: 'programs'`, exactly as drafted. It requires no
independent governance, operations, funding, technology, or continuity, so
it must not become an independent system.

## Decision requested (for countersign)

- Decision identifier: assigned at countersign (SD-2026-07-DD-NN),
  recording conversation-era identifier "F-1"
- Canonical name: Synaptic Bridge
- Decision authority: founding steward per `CHANGE_AUTHORITY.md`
- Approved classification: program (registry entry under Programs)
- Purpose: a free, self-paced 21-day continuity journey (presence → pattern
  → contribution) serving as a public participant experience
- Scope: participant experience only; no payments, accounts, or outcome
  claims
- Owner: Bridge Builders Collective (canonical); operational owner Programs
- Repository boundary: registry entry lives in this repository; the journey
  application remains wherever the founder's front-door/application decision
  (C-021) places it
- Public status: `public-preview` — supported by the live-route evidence if
  the domain decision is countersigned; otherwise status must drop to a
  destination-free status
- Intended audiences: individuals, young people, communities
- Relationships: parent Programs; related Sun Reset (entry session) and
  Contribution (consent-based offering pathway); teaches nothing on behalf
  of Academy yet; future consented offerings flow to The Living Archive;
  SOPHIA/Rosetta relationships none yet
- What it does: daily orientation, practice, reflection; private on-device
  progress; optional consent-based contribution
- What it does not do: no payments, no accounts, no timing/scoring, no
  therapeutic or outcome claims, no data collection beyond the device
- Why not a component of an existing environment: it *is* a component —
  of Programs; this packet registers it as such rather than as a 26th
  peer environment
- Destination domain and route: `/programs/synaptic-bridge` on the canonical
  domain (contingent on C-018)
- Launch readiness: live in preview; steward review of contribution flow and
  Living Archive integration still developing
- Dependencies: C-018 domain decision; C-021 front-door/application
  decision; steward content review
- Review date: 90 days from countersign
- Rollback / deprecation conditions: if the route goes dark, status reverts
  per `ENVIRONMENT_STATUS_STANDARD.md`; if outcome/pricing claims ever
  appear without evidence, the entry is corrected immediately under the
  urgent-corrections rule

## Also inside the same uncommitted change (each needs the same countersign)

1. Umbrella (`bridge-builders-collective`) short/full description rewrite —
   new identity language ("interconnected public-benefit ecosystem…",
   "regenerative development") not sourced from Constitution §1; vocabulary
   review required.
2. System Rosetta Stone description rewrite + `navLabel: 'Rosetta'` —
   expands Rosetta's stated scope beyond the committed vocabulary framing.
3. BridgeBuilders Academy: `planned` → `in-development`, citing the public
   application as evidence.
4. The Living Archive: `planned` → `in-development`, same evidence basis.
5. Programs branch: `planned` → `in-development`, adds capabilities citing
   two publicly usable preview experiences.
6. Sun Reset: `planned` → `public-preview` with destination
   `/programs/sun-reset` (route existence implied by the application; not
   independently fetched in this audit).

Each status raise depends on accepting the external application as valid
evidence under `PUBLIC_CLAIMS_STANDARD.md` — which is precisely the C-021
decision. Countersign options per item: approve as drafted / approve with
edits / defer (keep committed wording) / reject.

## Evidence: diff snapshot (captured 2026-07-27 ≈21:05 PDT; blob 226abb8 → be285ec)

The authoritative diff is the working tree at decision time; this snapshot is
preserved so the evidence cannot be lost if the working change is altered.
Summary of the snapshot (full diff available via
`git diff src/ecosystem/ecosystem-registry.ts`; the snapshot below is
abridged to the decision-relevant hunks):

- `bridge-builders-collective`: shortDescription and fullDescription
  replaced with "interconnected public-benefit ecosystem" framing.
- `system-rosetta-stone`: `navLabel: 'Rosetta'` added; descriptions replaced
  with "human-meaning and relationship interpretation layer" framing.
- `bridgebuilders-academy`: status `planned` → `in-development`; access
  notice cites "substantive public orientation … on the current public
  application" (dated 2026-07-28 in the draft — UTC date; Pacific
  2026-07-27).
- `living-archive`: status `planned` → `in-development`; access notice cites
  "a public orientation surface and early archive software … on the current
  public application".
- `programs`: status `in-development`; related ids gain `synaptic-bridge`,
  `sun-reset`; capability "Two free public-preview participant experiences
  (Sun Reset, Synaptic Bridge) usable now on the current public
  application"; wording change "open for enrollment" → "open for paid
  enrollment".
- `sun-reset`: full entry rewrite; status `public-preview`; destination
  `https://bridgebuilderscollective.com/programs/sun-reset`; eight-stage
  session description; sourceAuthority "Steward evidence review 2026-07-28
  (route verified live) under founder revision directive".
- New `synaptic-bridge` entry (complete, as analyzed above): status
  `public-preview`; destination
  `https://bridgebuilderscollective.com/programs/synaptic-bridge`;
  parent `programs`; publicOrder 52; not featured;
  sourceAuthority "Founder decision F-1 — Synaptic Bridge registration
  (2026-07-27)"; accessNotice flags wording for steward review;
  trustNotice "Journey progress is stored only on your own device.
  Contribution is optional and consent-based. Nothing is timed, scored,
  or sold."
