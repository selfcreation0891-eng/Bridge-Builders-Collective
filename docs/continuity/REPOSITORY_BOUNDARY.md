# Repository Boundary — selfcreation0891-eng/Bridge-Builders-Collective

## What This Repository Owns

This repository — `selfcreation0891-eng/Bridge-Builders-Collective` — owns:

- The **Bridge Builders Collective public front door** (built from `src/site/`, `src/ecosystem/`).
- The **canonical ecosystem registry** (`src/ecosystem/ecosystem-registry.ts`).
- **Canonical vocabulary** (`docs/canonical/CANONICAL_VOCABULARY.md`).
- **Governance documents** (`docs/canonical/`, `docs/stewardship/`).
- **Stewardship protocols and decision records** (`docs/stewardship/decisions/`).
- **Continuity records** (`docs/continuity/`).
- **Operating standards** (evidence, handoff, repository boundary).
- **Phase evidence records** (`docs/evidence/`).

---

## What This Repository Does Not Own

This repository **does not own**, **does not define**, and **must not silently redefine** the following:

### Portfolio Control Center (PCC)

The Portfolio Control Center application (`bridge-builders-portfolio-control-center`) is a separate private repository. Its canonical location is `selfcreation0891-eng/bridge-builders-portfolio-control-center` (not yet created as of 2026-07-22). This repository may reference the PCC project but does not contain its source code, route definitions, or data model.

### Bridge Builders Academy

The Bridge Builders Academy founding experience and curriculum are governed by a separate project. This repository does not own Academy curriculum source authority.

### Living Archive

The Living Archive is governed separately. This repository does not own Living Archive content authority, SOPHIA interaction records, or Archive ingestion configuration.

### SOPHIA

SOPHIA's governance configuration, advisory system, and operational parameters are governed under the Bridge Builders Constitution and stewardship protocols. This repository does not own SOPHIA's governance authority.

### System Rosetta Stone

The System Rosetta Stone is the canonical cross-project vocabulary and definition system. Its canonical definitions are stored and governed separately. This repository may reference Rosetta Stone terms but does not own them.

### CloseOne

CloseOne Flow is a separate application. This repository does not own CloseOne application code, data models, or deployment configuration.

### BridgeView

BridgeView Vision is a separate application. This repository does not own BridgeView application code, configuration, or deployment.

### Sun Reset

Sun Reset curriculum and content are governed separately. This repository does not own Sun Reset curriculum source documents.

---

## What This Repository May Do

- Reference any of the above projects by name in documentation, continuity records, and evidence.
- Track the operational status of projects in the Portfolio Control Center continuity records.
- Host phase evidence records (e.g., `docs/evidence/PCC-NNNN-*.md`) that describe the state of other projects.
- Store stewardship decisions that affect multiple projects.

---

## What This Repository Must Not Do

- Silently redefine canonical vocabulary owned by the System Rosetta Stone.
- Publish internal operational data (blockers, evidence, decisions) through a public endpoint.
- Store secrets, tokens, API keys, or credentials for any project.
- Act as the authoritative code repository for the Portfolio Control Center or any other application.
- Merge changes to `main` without documented review.

---

## Enforcement

This boundary is enforced through:

- Pull request review (see `.github/PULL_REQUEST_TEMPLATE.md`).
- CODEOWNERS assignments (see `.github/CODEOWNERS`).
- The governance framework documented in `doc/GOVERNANCE.md` and `docs/canonical/BRIDGE_BUILDERS_CONSTITUTION.md`.
