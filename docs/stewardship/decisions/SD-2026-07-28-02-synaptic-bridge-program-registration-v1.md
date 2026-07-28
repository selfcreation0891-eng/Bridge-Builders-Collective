# Adopted Steward Decision SD-2026-07-28-02

## Synaptic Bridge Program Registration v1

- Decision identifier: SD-2026-07-28-02 (identifier SD-2026-07-28-01 is
  intentionally unassigned: it appears in git history as the
  pre-reconciliation name of SD-2026-07-27-01, and skipping it prevents
  ambiguity; this record also formalizes the conversation-era identifier
  "F-1")
- Status: **Approved**
- Authority: Founder and Canonical Steward (Maurice), by written directive
  of 2026-07-28 (Pacific), recorded per `docs/canonical/CHANGE_AUTHORITY.md`
- Effective date: 2026-07-28 (Pacific)
- Decision source: `docs/stewardship/decision-packets/SYNAPTIC_BRIDGE_REGISTRATION_DECISION_PACKET.md`;
  domain authority: SD-2026-07-27-02

## Canonical classification

**Synaptic Bridge** is an approved Bridge Builders **program** and
participant experience within the existing **Programs** environment
(`parentEnvironmentId: 'programs'`).

It is not: a new core environment; an independent organization; a
replacement front door; a separate canonical authority; a new Academy; a
new archive; a separate Rosetta system; or an autonomous SOPHIA
environment. A program does not become a core environment merely because it
has its own public route — the route is an access point; the registry
classification expresses institutional structure.

## Purpose and boundaries

- Purpose: a guided, free, self-paced 21-day participant journey of
  orientation, relationship, reflection, practice, and continuity (three
  seven-day arcs: Return to Presence, Pattern Sync for Self Build, Bridge
  into Contribution), verified live in preview.
- Intended audiences: individuals, young people, communities.
- Claims boundaries: no guaranteed outcomes, therapeutic claims, clinical
  claims, eligibility promises, unsupported pricing, certification claims,
  or transformation guarantees. Enforced in text by
  `tests/synaptic-bridge.test.ts` and editorially per
  `PUBLIC_CLAIMS_STANDARD.md`.
- Technology boundaries: progress kept privately on the participant's own
  device; no accounts, timing, scoring, or selling; SOPHIA participates
  only within Constitution §9 advisory limits.
- Participation boundaries: participation and contribution are optional and
  consent-based (Constitution §5, §11).

## Relational connections (ownership stays with Programs)

Academy may support educational content and guided learning; The Living
Archive may preserve consented participant reflections or contributions;
System Rosetta Stone may provide human-meaning explanations and
relationship mapping; SOPHIA may support orientation and continuity within
its established advisory boundaries; the canonical front door presents
Synaptic Bridge as a participant pathway. None of these transfer ownership
away from Programs.

## Public status and route

- Public status: `public-preview` (evidence: route live and content
  verified 2026-07-27; entry session Sun Reset route verified 2026-07-28).
- Destination: `https://bridgebuilderscollective.com/programs/synaptic-bridge`
  on the canonical domain (SD-2026-07-27-02), approved subject to canonical
  identity inheritance, front-door reconciliation (C-021), registry
  validation, trust and boundary language, deployment ownership, and no
  competing organizational identity.
- Owner: Bridge Builders Collective (canonical); operational owner:
  Programs.
- Repository boundary: the registry entry lives in this repository; the
  journey application lives where the front-door architecture decision
  (spec §4, separate approval) places it.

## Registry structure used

The canonical ecosystem registry (`src/ecosystem/ecosystem-registry.ts`) is
the repository's single relational registry for the whole ecosystem tree —
core environments *and* parented branches/programs (e.g., existing program
branches such as Sun Reset and Story Circle are already entries). No
suitable separate program registry exists, and creating one would create a
second ecosystem registry, which the registry standard prohibits. Synaptic
Bridge is therefore registered as **one entry parented under `programs`**,
with classification expressed by `parentEnvironmentId` and this record —
not as a peer core environment. The core environment count remains five;
`tests/synaptic-bridge.test.ts` guards the classification.

The committed entry is the quarantined draft's Synaptic Bridge entry
adopted **verbatim** (its `sourceAuthority` citation "Founder decision F-1
— Synaptic Bridge registration (2026-07-27)" refers to this record, which
formalizes F-1; its access-notice wording remains flagged for refinement at
review). Adopting it verbatim keeps the concurrent session's working tree
untouched and makes the residual uncommitted diff exactly the separated,
not-yet-approved items.

## What this decision resolves and does not resolve

- **Resolves the classification and registration portions of C-019.**
- Does **not** approve Synaptic Bridge as a core environment.
- Does **not** approve the unrelated bundled registry changes (Academy,
  The Living Archive, and Programs lifecycle-status raises; Sun Reset
  raise and rewrite; umbrella and Rosetta description rewrites and
  navLabel) — separated into **C-022** for per-item countersign, evidence
  preserved.
- Does **not** resolve C-021 and does not certify that the live route or
  root experience fully conforms to the canonical front door.
- Dependencies: C-021 conformance for full launch readiness; contact
  mailbox verification for public support pathways.
- Launch readiness: live in preview; steward review of the contribution
  flow and Living Archive integration still developing.

## Review, amendment, rollback

- Review date: 2026-10-27 (with the standard's quarterly review).
- Amendment: recorded founder decision per `CHANGE_AUTHORITY.md`.
- Deprecation/rollback: if the route goes dark, status reverts per
  `ENVIRONMENT_STATUS_STANDARD.md`; if unsupported claims appear, the entry
  is corrected immediately under the urgent-corrections rule; deprecation
  archives the entry rather than deleting it.
