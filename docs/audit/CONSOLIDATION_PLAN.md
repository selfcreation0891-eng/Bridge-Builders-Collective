# Duplication and Consolidation Plan

No broad moves or deletions were performed during this audit.

| Duplication group | Files involved | Differences | Likely canonical file/location | Historical value | Link dependencies | Migration risk | Recommended action | Human approval required |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Repository entry vs subsystem placeholders | `README.md`, `frontend\README.md`, `supabase/README.md`, `.github/workflows/README.md` | root README is minimal; other files are subsystem descriptions only | `README.md` for entry, subsystem docs only after real directories exist | high | low | medium | canonicalize | yes |
| Architecture/governance docs split across `doc/` and `docs/` | `doc/ARCHITECTURE.md`, `doc/GOVERNANCE.md`, `docs/H_ROI_METRICS.md` | `doc/` holds major canon; `docs/` holds one framework file | future canonical docs tree under `docs/` after approval | high | medium | medium | consolidate later | yes |
| Supabase documentation overlap | `supabase/README.md`, `supabase/docs/README.md` | one describes backend scope; one describes docs scope broadly | `supabase/README.md` if real Supabase dir is retained | low | low | low | consolidate later | yes |
| Governance references to missing docs | `doc/ARCHITECTURE.md`, `doc/GOVERNANCE.md` -> `CONSENT_SYSTEMS`, `MODERATION_ESCALATION` | references exist but targets do not | unresolved | medium | medium | medium | document | yes |
| Accessibility/trust claims across multiple files | `ACCESSIBILITY_STANDARD.md`, `PRIVACY_POLICY.md`, `CLAUDE.md`, `README.md` | one standard, multiple supporting mentions | Trust Center structure later | high | low | low | canonicalize | yes |
| Malformed frontend path | `frontend\README.md` | file path contains backslash instead of real directory separator | future `frontend/README.md` or real app root after steward decision | medium | low | high | blocked | yes |

## Consolidation principles

- Preserve history first.
- Do not delete or rename current documents until canonical replacements and redirects are approved.
- Resolve the malformed frontend path before any real frontend scaffold is introduced.
