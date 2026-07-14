# Repository Inventory

## Scope

Inventory performed against the entire tracked tree on 2026-07-14 after repository verification. The repository contained 19 tracked files and no verified runtime source code.

| Path | Type | Purpose | Status | Evidence | Risks | Recommended disposition |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | repository root | Top-level landing area for governance, legal, architecture, and orientation docs | active | `README.md:1-2`; top-level listing | Root is overloaded with policy/legal docs and lacks a canonical docs map | canonicalize |
| `.github/` | directory | GitHub configuration container | active but incomplete | `.github/workflows/README.md:1-16` | No actual workflows, checks, or automation definitions | document |
| `.github/workflows/` | directory | Intended CI/CD and automation location | placeholder | `.github/workflows/README.md:3-16` | Claims workflow responsibilities without workflow files | repair |
| `doc/` | directory | Architecture and governance documentation | active | `doc/ARCHITECTURE.md:1-129`; `doc/GOVERNANCE.md:1-169` | Duplicates the broader `docs/` convention and references missing files | canonicalize |
| `docs/` | directory | Metrics documentation plus now audit/launch outputs | active but sparse at audit start | `docs/H_ROI_METRICS.md:1-114` | Canonical docs root was underused before the audit | preserve |
| `supabase/` | directory | Planned backend infrastructure boundary | documented-only | `supabase/README.md:1-17` | No config, migrations, policies, or functions exist | verify externally |
| `supabase/docs/` | directory | Supabase-related documentation placeholder | legacy/placeholder | `supabase/docs/README.md:1-13` | Duplicates broader documentation purpose without implementation detail | consolidate later |
| `frontend\README.md` | file | Placeholder description of a planned frontend stack | malformed path / documented-only | `frontend\README.md:1-29` | The file name prevents a real `frontend/` directory from existing and creates architecture ambiguity | blocked |
| `README.md` | file | Minimal repository description | incomplete | `README.md:1-2` | Does not explain current state, non-activation, or repo boundaries | repair |
| `ACCESSIBILITY_STANDARD.md` | file | Accessibility commitment and baseline guidance | supporting policy draft | `ACCESSIBILITY_STANDARD.md:1-76` | Placeholder date/contact and no implementation evidence | preserve |
| `BRIDGE_BUILDERS_LICENSE.md` | file | Custom license text | legal draft | `BRIDGE_BUILDERS_LICENSE.md:1-24` | Custom license language may require review and should not be silently edited | preserve |
| `CLAUDE.md` | file | Operational design and tone context | canonical internal guidance | `CLAUDE.md:1-136` | Not a public architecture spec; could be mistaken for one | preserve |
| `DATA_RETENTION_POLICY.md` | file | Retention policy draft | policy draft | `DATA_RETENTION_POLICY.md:1-125` | Placeholder periods and no automated enforcement evidence | preserve |
| `INCIDENT_RESPONSE_PROTOCOL.md` | file | Incident response draft | operational policy draft | `INCIDENT_RESPONSE_PROTOCOL.md:1-100` | No supporting workflows or contact channels | preserve |
| `MEDIA_LICENSING_POLICY.md` | file | Media rights and archive usage draft | policy/legal draft | `MEDIA_LICENSING_POLICY.md:1-82` | Consent and attribution workflows are not implemented in-repo | preserve |
| `PRIVACY_POLICY.md` | file | Privacy commitments | policy/legal draft | `PRIVACY_POLICY.md:1-115` | Claims security and deletion capabilities that are not backed by code here | preserve |
| `STEWARD_ESCALATION_MATRIX.md` | file | Steward role and escalation matrix | operational draft | `STEWARD_ESCALATION_MATRIX.md:1-105` | No steward workflow implementation exists | preserve |
| `TERMS_OF_SERVICE.md` | file | Terms of service draft | legal draft | `TERMS_OF_SERVICE.md:1-157` | Placeholder contact info and no legal review evidence | preserve |
| `.env.example` | file | Placeholder environment variable contract | active placeholder | `.env.example:1-19` | Variables imply runtime systems that are not implemented here | document |
| `.gitignore` | file | General Node/web ignore rules | active | `.gitignore:1-144` | Implies multiple JS toolchains despite no package manifests | document |
| `docs/H_ROI_METRICS.md` | file | Metrics framework concept doc | active concept | `docs/H_ROI_METRICS.md:1-114` | No instrumentation or analytics implementation exists | preserve |

## Inventory summary

- **Belongs in this repository:** public-facing governance, trust, orientation, legal-review drafts, audit outputs, and canonical ecosystem boundary documents.
- **Documented but not implemented here:** frontend app, Supabase backend, workflows, RLS, storage, analytics, moderation tooling.
- **Likely duplication or canonical-root tension:** `doc/` vs `docs/`, `supabase/docs/` vs root/docs policy material, and the malformed `frontend\README.md` path.
- **Tested components:** none.
- **Externally dependent components:** every claimed runtime capability.
