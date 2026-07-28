# Relational File Map — Bridge-Builders-Collective Repository

Proposed map per `docs/canonical/RELATIONAL_FILE_STEWARDSHIP_STANDARD.md`.
Status: Operational (a view of canonical truth, not a source of it). This map
adds references; it moves nothing. Last verified: 2026-07-28.

## Authority spine (who outranks whom)

```
Constitution (docs/canonical/BRIDGE_BUILDERS_CONSTITUTION.md)
└─ Adopted steward decisions (docs/stewardship/decisions/, incl. SD-2026-07-28-01)
   └─ Canonical principles (CLAUDE.md, doc/GOVERNANCE.md — elaborations)
      └─ Ecosystem registry (src/ecosystem/ecosystem-registry.ts)  ← sole public ecosystem truth
         └─ Level-5 subordinate canonical standards:
            CANONICAL_VOCABULARY.md · PUBLIC_CLAIMS_STANDARD.md ·
            ENVIRONMENT_STATUS_STANDARD.md · PERMANENT_STEWARD_POSTS_CHARTER.md ·
            RELATIONAL_FILE_STEWARDSHIP_STANDARD.md (new)
            └─ Schemas/interfaces (ecosystem-types.ts, ECOSYSTEM_REGISTRY_STANDARD.md)
               └─ Generated views (dist/, sitemap, ecosystem.json) — never hand-edited
                  └─ Downstream environments · drafts · historical records
```

## Relational placement by canonical home (Standard §4)

**A. Bridge Builders Collective (umbrella / front door)**
- Identity & canon: `docs/canonical/*` (parent: Constitution; children: every governed surface)
- Front door implementation: `src/ecosystem/` → `src/site/` → `scripts/build-site.ts` → `dist/` (generated)
- Boundary docs: `docs/FRONT_DOOR_BOUNDARY.md`, `docs/DOMAIN_ACTIVATION_CHECKLIST.md`, `docs/DEPLOYMENT_ENVIRONMENT_MATRIX.md`
- Trust surface: `docs/TRUST_CENTER_INDEX.md` → root policy files (`PRIVACY_POLICY.md`, `TERMS_OF_SERVICE.md`, `DATA_RETENTION_POLICY.md`, `MEDIA_LICENSING_POLICY.md`, `ACCESSIBILITY_STANDARD.md`, `INCIDENT_RESPONSE_PROTOCOL.md`, `STEWARD_ESCALATION_MATRIX.md`, `BRIDGE_BUILDERS_LICENSE.md`)
- Continuity: `docs/continuity/*` (dated records), `docs/POST_RELEASE_CONTINUITY_PLAN.md`
- Audit & ledger instruments: `docs/CANONICAL_CONFLICT_REGISTER.md`, `docs/COMPLETION_LEDGER.md`, `docs/ACTIVATION_AUDIT.md` (historical), `docs/RELATIONAL_STEWARDSHIP_INITIAL_AUDIT.md`, `docs/VERIFICATION_EVIDENCE.md`

**B–F. Environments (Academy, Living Archive, System Rosetta Stone, SOPHIA, BRIDGEview)**
- Registry entries + front-door pages only, in this repository. No curriculum,
  archive, Rosetta, SOPHIA, or media implementation artifacts exist here yet —
  confirmed by the initial audit. Future artifacts for these environments cite
  their registry entry as parent and this repository's canon as governance.

**G. Programs** — registry branches (`sun-reset`, `story-circle`,
`resonate-touch`, `savage2steward`, …). No program-delivery artifacts in this
repository yet. Proposed programs (Seed to Soup, STEAM) sit in intake
(`docs/COMPLETION_LEDGER.md` §Proposed).

**H. Research and Public Knowledge** — registry branches
(`research`, `public-knowledge`); `docs/H_ROI_METRICS.md` (supporting).

**I. Operations and Stewardship**
- Governance operations: `docs/stewardship/*` (standards, protocols, posts,
  decisions, decision-packets, 16 templates incl.
  `ARTIFACT_STEWARDSHIP_AUDIT_TEMPLATE.md`)
- Typed infrastructure: `src/stewardship/*` (mirrors ratified canon; children
  of the charter and process documents)
- Implementation logs: `docs/implementation/*` (operational, outranked by canon)
- CI: `.github/workflows/ci.yml`; tests: `tests/*`

**J. Independent systems** — CloseOne Flow: no artifacts in this repository
(verified); remains separate absent an adoption ADR.

**Historical / quarantined** — `doc/` pair (C-001), `frontend\README.md`
(C-002), `.claude-transfer/` bundles (quarantined, F-3), upstream PRs #1–#3
(C-009), `bbc-src.tar.gz` outside the repo (quarantined, F-4).

## Reference edges added 2026-07-28

- `ECOSYSTEM_AUTHORITY_ORDER.md` → lists the new standard among subordinate canonical standards
- `CHANGE_AUTHORITY.md` → names the standard as the artifact-lifecycle authority
- `CLAUDE.md` → binds AI sessions to the standard's §16 operating instructions
- `CANONICAL_CONFLICT_REGISTER.md` → rows C-015…C-018
- `docs/continuity/2026-07-28-relational-file-stewardship-standard-adoption.md` → adoption record
- Standard ↔ template ↔ ledger ↔ initial audit cross-reference one another
