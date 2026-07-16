# Ecosystem Registry Standard

Version 1.0 — 2026-07-15. Authority level 6.

## Location and form

The canonical ecosystem registry lives at `src/ecosystem/ecosystem-registry.ts` as typed TypeScript data conforming to `src/ecosystem/ecosystem-types.ts`. It is the single source of public ecosystem truth: names, descriptions, statuses, destinations, audiences, relationships, participation pathways, ordering, and notices.

## Required fields per environment

`id`, `canonicalName`, `publicName`, `slug`, `shortDescription`, `fullDescription`, `status` (per `ENVIRONMENT_STATUS_STANDARD.md`), `destination` (URL or `null` — never invented), `audiences`, `capabilities`, `participationPathways`, `relatedEnvironmentIds`, `parentEnvironmentId` (or `null`), `publicOrder`, `featured`, `accessNotice` (required by status rules), `trustNotice`, `canonicalOwner`, `sourceAuthority`, `lastReviewed`, `visibility`, `callToAction`, `icon` (optional).

## Validation invariants (enforced by `ecosystem-validation.ts` and tests)

Unique ids; unique slugs; recognized statuses; valid parent references; valid relationship references; no self-reference; no duplicate destinations; required descriptions and owner; `public`/`public-preview` require a destination; `invitation-required` requires an access notice; `internal` never in public navigation; `archived` never active; `featured` requires valid public presentation data; every entry cites a `sourceAuthority`.

## Consumption rule

All public surfaces (header, mobile menu, ecosystem overview, cards, badges, related links, participation pathways, footer, sitemap, notices) are generated from this registry via `ecosystem-selectors.ts`. Hand-written environment lists anywhere else in the ecosystem are defects.

## Change rule

Registry changes are steward decisions (see `CHANGE_AUTHORITY.md`) and must keep validation green.
