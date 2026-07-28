# Canonical Domain — Founder Decision Packet (C-018)

Status: DRAFT — prepared 2026-07-27 (Pacific) for founding-steward
countersign. C-018 is **not resolved** by this packet. Upon countersign this
becomes an adopted steward decision, `DOMAIN_ACTIVATION_CHECKLIST.md` step 1
is satisfied, and C-018 is updated in the conflict register.

## Evidence gathered 2026-07-27

- `https://bridgebuilderscollective.com/` is live and publicly reachable,
  serving a Bridge Builders application (homepage identity: "Bridge Builders
  — Multimedia Stewardship Platform"; navigation includes Living Archive,
  Academy, Media, SOPHIA, Public Knowledge, Stewardship, Rosetta, Community,
  Programs, Research, Contribute, Principles).
- `https://bridgebuilderscollective.com/programs/synaptic-bridge` is live
  (see the Synaptic Bridge Registration Decision Packet).
- No canonical-domain decision is recorded anywhere in this repository; the
  registry's committed entries carry `destination: null` throughout.
- The live application is **not built from this repository**, and its
  identity language ("Multimedia Stewardship Platform", "Living Systems
  Constitution", lifecycle "Called → Convened → Practiced → Contributed →
  Archived → Continued") does not derive from the committed Constitution or
  canonical vocabulary. This is recorded as conflict **C-021** (duplicate
  front door / identity drift) — a founder decision, not an error to be
  auto-corrected.

Ownership of the domain was not independently verified (registrar records
are outside this repository); the founder should confirm registrant control
at countersign.

## Decision requested (each line is a choice to countersign, edit, or defer)

1. **Canonical public domain**: `bridgebuilderscollective.com`.
2. **Canonical organizational email domain**: `@bridgebuilderscollective.com`
   (would also unblock B-EXT-3, the missing public contact pathway, and the
   `[INSERT CONTACT EMAIL]` placeholders in C-007).
3. **What the domain root serves** (this is the C-021 decision):
   - (a) the repository's static front door, with the application at a
     subdomain or path it links to; or
   - (b) the live application adopted as the canonical front door —
     requiring amendment of `docs/FRONT_DOOR_BOUNDARY.md`, import or
     adoption of the application per that document's procedure, and
     reconciliation of its identity language with Constitution §1 and the
     canonical vocabulary; or
   - (c) a transitional arrangement, recorded with an end condition.
4. **Subdomains**: permitted or not; if permitted, which (e.g., `app.`,
   `archive.`, `academy.`), each requiring a registry destination entry.
5. **`.org` and other alternate domains**: deprecated / redirected /
   historical / prohibited (Standard §8's conditional rule activates on
   countersign).
6. **Owning repository for domain declarations**: this repository
   (`PUBLIC_APP_URL`, registry destinations, sitemap origin) — per
   `ECOSYSTEM_REGISTRY_STANDARD.md`.
7. **Systems inheriting the domain rule**: registry destinations, built
   sitemap/robots, policy documents, email templates, external profiles,
   downstream environments, and any payment or registration surfaces.
8. **Exceptions**: any non-canonical domain use requires a recorded steward
   approval.
9. **Link validation**: `npm run validate:links` remains the internal gate;
   external destinations are checked at review cadence against the registry.
10. **Change governance**: domain changes are steward decisions under
    `CHANGE_AUTHORITY.md`, recorded with evidence per
    `DOMAIN_ACTIVATION_CHECKLIST.md` steps 1–15.

## What countersigning does not do

It does not approve the Synaptic Bridge registration or any registry status
raise (separate packet); it does not resolve C-021 unless option 3 is
explicitly decided; it does not verify DNS, HTTPS, or hosting evidence
(checklist steps 2–15 remain).
