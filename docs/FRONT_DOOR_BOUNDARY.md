# Front Door Boundary

## Canonical implementation location

The deployable Bridge Builders Collective public front door lives in **this repository**:

- `src/ecosystem/` — canonical typed registry (single source of ecosystem truth)
- `src/site/` — rendering layer (layout, pages, styles)
- `scripts/build-site.ts` — build entry point → static output in `dist/`
- `tests/` — registry, navigation, route, and link integrity tests

## Framework and provenance

- **Framework**: none — deliberately dependency-free Node.js (>= 22.18) + TypeScript, using Node's
  native type-stripping. Output is a fully static site (HTML + one CSS file); no JavaScript is required
  to read or navigate it.
- **Why**: `doc/ARCHITECTURE.md` and `frontend\README.md` name Lovable + React + Node.js as the intended
  frontend stack, but no Lovable project URL, export, or external repository reference exists anywhere in
  this repository or its visible history (searched 2026-07-15; see `docs/ACTIVATION_AUDIT.md` §6,
  blocker B-EXT-6). Additionally, the activation environment's network allowlist blocks the npm registry,
  making any dependency-based scaffold locally unverifiable. Per activation rules, the smallest compatible
  front door was created using the repository's existing stack signal (Node.js ecosystem), with zero
  dependencies so that build, tests, and link validation are all locally verified.
- **Migration-friendliness**: the registry (`src/ecosystem/`) is plain typed TypeScript with no framework
  coupling. A future Lovable/React implementation must import this same registry and replace only
  `src/site/` and `scripts/`. The route table (`getAllPublicPaths`) and selectors are the stable contract.

## Deployment entry point

`npm run build` → `dist/` (static). Any static host serves it. See `docs/DEPLOYMENT_ENVIRONMENT_MATRIX.md`.

## Registry dependency

Every navigation surface (header, mobile menu, footer, cards, badges, related links, participation
pathways, HTML sitemap, XML sitemap, `ecosystem.json`) is generated from `src/ecosystem/ecosystem-registry.ts`
through `ecosystem-selectors.ts`. Tests in `tests/navigation.test.ts` enforce this.

## Downstream environment boundary

Downstream environments (Academy, Living Archive, Rosetta, SOPHIA, branches) may link to the front door
and consume `dist/ecosystem.json` or the typed registry, but may not restate or redefine canonical names,
descriptions, statuses, or destinations (Authority Order §8).

## Superseded implementations

None exist. `frontend\README.md` (Windows-path artifact) is retained as the historical statement of the
intended Lovable/React stack — it never contained an implementation. If the referenced Lovable project is
later located, it is imported *into* this repository per this boundary and recorded here with source,
branch, and commit.

## Prohibited duplicate-front-door behavior

No active front-door source may be maintained outside this repository. Any external deployment of a
Bridge Builders front door not built from this repository is non-canonical and must be redirected or
retired, with the conflict recorded in `docs/CANONICAL_CONFLICT_REGISTER.md`.
