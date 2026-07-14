# Public Front Door Gap Analysis

| Area | Present state | Evidence | Missing capability | Dependency | Risk | Recommended phase | Acceptance criteria |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public home | documented | `README.md:1-2` | actual web entry point | frontend foundation | high | Phase C | real public home route exists and is reviewed |
| What Bridge Builders is | foundation | `CLAUDE.md:1-136`; `README.md:1-2` | public-facing synthesis copy | information architecture | medium | Phase C | concise steward-approved explainer published |
| Principles | documented | `CLAUDE.md:27-86`; `doc/GOVERNANCE.md:18-64` | public principles surface | frontend + copy | medium | Phase C | principles page/section published |
| Ecosystem explorer | not present | no implementation | navigable ecosystem map | ecosystem registry | high | Phase E | users can understand system relationships |
| Programs | not present | no implementation | program registry/listing | Academy/ops input | medium | Phase H | programs page reflects verified offerings |
| Participation pathways | not present | no forms or intake flows | contribution/contact/intake flow | frontend + process owners | high | Phase G | at least one verified participation pathway exists |
| Community | concept | governance docs only | public community framing | content strategy | medium | Phase H | community section is steward-approved |
| Stewardship | documented | `doc/GOVERNANCE.md`; `STEWARD_ESCALATION_MATRIX.md` | public stewardship explanation page | public IA | medium | Phase C | stewardship role model is visible and accurate |
| Public Knowledge | not present | absent | public knowledge area | content strategy | medium | Phase H | verified public knowledge index exists |
| Trust Center | concept | root policy docs only | canonical Trust Center surface | docs IA + review | high | Phase F | trust center publishes reviewed policies and limitations |
| Media and stories | concept | `MEDIA_LICENSING_POLICY.md` only | public story/media surfaces | archive boundary + frontend | medium | Phase H | media/story section uses verified consent model |
| Research | not present | absent | research surface and evidence registry | content owners | medium | Phase H | research area exists with verified sources |
| Partners | not present | absent | partner-facing information | business/governance input | medium | Phase H | partners page is accurate and approved |
| Contribution intake | not present | absent | intake workflow | process + backend | high | Phase G | controlled submission flow exists |
| Contact | not present | placeholder contact fields remain | visible contact path | steward decision | high | Phase G | reviewed contact method is published |
| Accessibility | documented | `ACCESSIBILITY_STANDARD.md` | actual accessible implementation and review | frontend + QA | high | Phase J | accessibility review completed |
| Privacy | documented | `PRIVACY_POLICY.md` | implementation alignment and review | legal + backend | high | Phase K | privacy policy mapped to real systems |
| Consent | concept | privacy/media/governance docs | consent workflow | backend + legal + archive | high | Phase I | consent state model is implemented and reviewed |
| Attribution | concept | media/license docs | attribution workflow | backend + archive | medium | Phase I | attribution metadata path is defined |
| System status | not present | absent | public status surface | launch docs | low | Phase F | public status/limitations page exists |
| Known limitations | concept | audit will document them | public limitations disclosure | trust center | medium | Phase F | limitations are published clearly |
| Mobile readiness | not present | no frontend | responsive implementation | frontend | medium | Phase J | key routes validated on mobile breakpoints |
| Search | not present | absent | public search or ecosystem search | frontend + boundary decisions | medium | Phase C/E | users can find core content |
| Navigation consistency | not present | no frontend | sitewide IA and nav system | frontend + content map | high | Phase C/D | nav system is implemented across routes |
| Deployment readiness | blocked | no deployment config or app | deployment stack | frontend + backend + ops | high | Phase L | environment, domain, monitoring, and build pipeline verified |

## Readiness summary

- **Best current states:** `documented`, `foundation`, `concept`
- **No area qualifies as:** `implemented`, `verified`, `pilot-ready`, or `production-ready`
- **Primary blocker:** there is no actual public web application in the repository yet
