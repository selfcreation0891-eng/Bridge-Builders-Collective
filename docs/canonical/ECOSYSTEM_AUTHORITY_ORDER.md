# Ecosystem Authority Order

Version 1.0 — 2026-07-15

When sources conflict, the higher entry governs:

1. **Bridge Builders Constitution** (`docs/canonical/BRIDGE_BUILDERS_CONSTITUTION.md`)
2. **Adopted steward decisions** (recorded per `CHANGE_AUTHORITY.md`; includes the activation directive of 2026-07-15)
3. **Canonical principles** (Constitution §3, elaborated in `CLAUDE.md` and `doc/GOVERNANCE.md`)
4. **Canonical ecosystem registry** (`src/ecosystem/ecosystem-registry.ts`)
5. **Canonical vocabulary and public claims standard** (`docs/canonical/CANONICAL_VOCABULARY.md`, `docs/canonical/PUBLIC_CLAIMS_STANDARD.md`)
6. **Shared schemas and interfaces** (`src/ecosystem/ecosystem-types.ts`, `ecosystem-status.ts`, `ECOSYSTEM_REGISTRY_STANDARD.md`)
7. **Generated navigation and public presentation** (selectors, build output, sitemap)
8. **Individual environment implementations** (downstream repositories and services)
9. **Drafts, experiments, proposals, and historical records** (including open Copilot PRs #1–#3 and superseded wordings preserved in the conflict register)

## Subordinate canonical standards

`docs/canonical/PERMANENT_STEWARD_POSTS_CHARTER.md` (Permanent Steward Posts Charter, v1 — pending ratification) is a subordinate canonical governance standard. Once ratified by adopted steward decision, it operates at level 5 alongside the canonical vocabulary and public claims standard; it never outranks the Constitution, adopted steward decisions, or canonical principles. Until ratification it carries no operational authority. This note adds a reference only; it does not renumber or alter the order above.

## Binding rule

No route, component, repository, AI agent, document, or application may independently redefine canonical names, descriptions, statuses, relationships, URLs, authority boundaries, or navigation. Downstream environments consume the canonical registry; they never fork it. A downstream surface that conflicts with the registry is in error by definition, and the conflict is recorded and corrected per `CHANGE_AUTHORITY.md`.
