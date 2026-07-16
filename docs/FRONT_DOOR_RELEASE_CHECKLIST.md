# Front Door Release Checklist — v0.1.0

Status as of 2026-07-15 (branch `activation/canonical-front-door-v0.1`).

| Item | State | Evidence |
|---|---|---|
| Constitutional authority confirmed | DONE | `docs/canonical/BRIDGE_BUILDERS_CONSTITUTION.md` v1.0 + authority order |
| Registry confirmed | DONE | 25 environments, validation green (`npm run validate:registry`) |
| Navigation generated from registry | DONE | `tests/navigation.test.ts` (header, footer, sitemap, mobile=desktop) |
| Required routes render | DONE | 16/16 required routes + 15 branch pages + 404 (`tests/routes.test.ts`) |
| Statuses truthful | DONE | Status standard enforced by tests; no `public` status anywhere pre-deployment |
| Trust Center linked | DONE | `/trust/` + `docs/TRUST_CENTER_INDEX.md` |
| Accessibility reviewed | DONE (limitations recorded) | `docs/ACCESSIBILITY_RELEASE_REVIEW.md` |
| Participation pathway verified | DONE — truthful pathway; open channel is external dependency B-EXT-7 | `docs/PARTICIPATION_PATHWAY_VERIFICATION.md` |
| Mobile verified | PARTIAL — structural checks done; real-device check is domain checklist step 12 | Accessibility review §limitations |
| Environment variables documented | DONE | `.env.example` + `docs/DEPLOYMENT_ENVIRONMENT_MATRIX.md` |
| Local checks pass | DONE (install, registry, tests, build, links); typecheck/lint blocked by B-EXT-2, runs in CI | `docs/VERIFICATION_EVIDENCE.md` |
| CI passes | PENDING PUSH (B-EXT-1) — workflow committed | `.github/workflows/ci.yml` |
| Deployment target verified | PENDING — steward decision B-EXT-5 | Deployment matrix |
| Domain configured | PENDING — B-EXT-4 | `docs/DOMAIN_ACTIVATION_CHECKLIST.md` |
| HTTPS verified | PENDING — follows domain | Checklist step 6 |
| Analytics/privacy decision | DONE — v0.1.0 ships with NO analytics of any kind (adopted steward-directive default: no engagement optimization) | This checklist; deployment matrix |
| Release commit identified | On steward push: tag `v0.1.0` at the head of the activation branch after CI green | Phase 14 report |
| Rollback plan | DONE — static site: revert to previous deployment/tag; no data migrations exist; registry changes revert with git | This checklist |
