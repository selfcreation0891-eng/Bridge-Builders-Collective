# Documentation Canon Audit

## Observed documentation set

Verified documentation files included the root README and policy files, `doc/ARCHITECTURE.md`, `doc/GOVERNANCE.md`, `docs/H_ROI_METRICS.md`, `supabase/README.md`, `supabase/docs/README.md`, `.github/workflows/README.md`, and `frontend\README.md`.

## Document classification

| Document | Classification | Status | Evidence | Notes |
| --- | --- | --- | --- | --- |
| `README.md` | canonical entry point | incomplete | `README.md:1-2` | Too small to function as a trustworthy public front door or maintainer guide. |
| `CLAUDE.md` | canonical internal guidance | active | `CLAUDE.md:1-136` | Strongest single statement of principles and operational tone. |
| `doc/ARCHITECTURE.md` | implementation guide / architectural concept | active but unverified | `doc/ARCHITECTURE.md:1-129` | Describes planned stack, not confirmed runtime. |
| `doc/GOVERNANCE.md` | canonical governance concept | active but incomplete | `doc/GOVERNANCE.md:1-169` | References missing consent/moderation documents. |
| `docs/H_ROI_METRICS.md` | supporting framework | active concept | `docs/H_ROI_METRICS.md:1-114` | Metrics are conceptual only. |
| `ACCESSIBILITY_STANDARD.md` | policy / standard draft | incomplete | `ACCESSIBILITY_STANDARD.md:1-76` | Placeholder date and contact fields remain. |
| `DATA_RETENTION_POLICY.md` | policy draft | incomplete | `DATA_RETENTION_POLICY.md:1-125` | Placeholder retention periods remain. |
| `INCIDENT_RESPONSE_PROTOCOL.md` | operational policy draft | incomplete | `INCIDENT_RESPONSE_PROTOCOL.md:1-100` | No reporting channel or tooling evidence. |
| `MEDIA_LICENSING_POLICY.md` | policy/legal draft | incomplete | `MEDIA_LICENSING_POLICY.md:1-82` | Depends on unimplemented consent and attribution systems. |
| `PRIVACY_POLICY.md` | policy/legal draft | unverified | `PRIVACY_POLICY.md:1-115` | Claims safeguards not evidenced in repo. |
| `STEWARD_ESCALATION_MATRIX.md` | operational draft | incomplete | `STEWARD_ESCALATION_MATRIX.md:1-105` | Roles/processes are not backed by workflow tooling. |
| `TERMS_OF_SERVICE.md` | legal draft | incomplete | `TERMS_OF_SERVICE.md:1-157` | Placeholder contact field remains. |
| `BRIDGE_BUILDERS_LICENSE.md` | legal draft / repository license | active but requires review | `BRIDGE_BUILDERS_LICENSE.md:1-24` | Custom license language should be reviewed by a qualified human. |
| `supabase/README.md` | implementation guide placeholder | documented-only | `supabase/README.md:1-17` | No Supabase assets exist behind it. |
| `supabase/docs/README.md` | supporting / duplicate placeholder | legacy | `supabase/docs/README.md:1-13` | Duplicates general documentation purpose. |
| `.github/workflows/README.md` | operational placeholder | documented-only | `.github/workflows/README.md:1-16` | No actual workflow files exist. |
| `frontend\README.md` | implementation guide placeholder | conflicting path shape | `frontend\README.md:1-29` | File name implies Windows path leakage and blocks an actual frontend directory. |

## Findings

### Canonical documents

- `README.md` should remain the repository entry point, but it required an additive current-state section.
- `CLAUDE.md` is the clearest canonical source for system identity and non-negotiable operating principles.
- `doc/GOVERNANCE.md` and `doc/ARCHITECTURE.md` remain the primary architecture/governance concept documents until a steward-approved relocation occurs.

### Supporting and operational documents

- `docs/H_ROI_METRICS.md`, `.github/workflows/README.md`, `supabase/README.md`, and `supabase/docs/README.md` are supporting documents, not proof of implementation.

### Incomplete or unverified documents

- Placeholder tokens remain in accessibility, retention, media, incident, steward, and terms documents.
- `PRIVACY_POLICY.md` and `doc/ARCHITECTURE.md` describe security/runtime properties not substantiated by code.

### Duplicate/conflicting structure

- `doc/` and `docs/` overlap semantically.
- `supabase/docs/README.md` duplicates broader repository documentation language.
- `frontend\README.md` conflicts with the expected directory structure.

### Broken or missing references

- `doc/ARCHITECTURE.md:71-72` references `CONSENT_SYSTEMS` and `MODERATION_ESCALATION`, neither of which exists.
- `doc/GOVERNANCE.md:126-127` references the same missing files.

## Proposed canonical documentation map

| Documentation class | Eventual canonical home | Current state |
| --- | --- | --- |
| Repository entry and public status | `README.md` | partially addressed by this audit |
| Audit outputs | `docs/audit/` | created by this audit |
| Canonical vocabulary, boundaries, integration registry | `docs/canon/` | created by this audit |
| Launch readiness and activation status | `docs/launch/` | created by this audit |
| Implementation roadmap | `docs/roadmap/` | created by this audit |
| Architecture and governance canon | `doc/` for now, later steward-approved move into `docs/architecture/` or `docs/governance/` | unresolved |
| Public policy / legal-review drafts | root for now, later steward/legal-approved policy area | unresolved |
| Subsystem placeholder docs | retain in place until real directories exist, then reconcile | unresolved |
