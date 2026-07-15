# Verification Evidence — activation/canonical-front-door-v0.1

Environment: isolated Linux sandbox (Ubuntu 22), Node v22.22.3, npm 10.9.8, git 2.34.1.
All commands run in the repository root on branch `activation/canonical-front-door-v0.1`.
Commit SHAs are local-activation SHAs; the upstream base snapshot is `b9493786` (main).

| # | Command | Date (UTC) | Commit | Result | Summarized output | Limitation |
|---|---|---|---|---|---|---|
| 1 | `git ls-remote https://github.com/selfcreation0891-eng/Bridge-Builders-Collective.git` | 2026-07-15 | — | FAIL (expected) | `403 from proxy after CONNECT` / `X-Proxy-Error: blocked-by-allowlist` | B-EXT-1: sandbox cannot reach GitHub over git/HTTPS; work prepared locally for steward push |
| 2 | `npm ping` / `npm view react version` | 2026-07-15 | — | FAIL (expected) | `403 Forbidden - registry.npmjs.org` | B-EXT-2: npm blocked; project made zero-dependency in response |
| 3 | GitHub API tree + all 19 file fetches (web fetch) | 2026-07-15 | b9493786 (upstream) | PASS | 19/19 files retrieved, `"truncated":false`; baseline reconstructed | Baseline commit is a content-faithful reconstruction, not the upstream SHA |
| 4 | `npm ci` (clean install, lockfile) | 2026-07-15 | 7e6f408c3 | PASS | "up to date" — zero dependencies; lockfileVersion 3 | Offline-capable by design |
| 5 | `npm run validate:registry` | 2026-07-15 | 7e6f408c3 | PASS | `registry valid: 25 environments` | — |
| 6 | `npm test` (node:test) | 2026-07-15 | 7e6f408c3 | PASS | `# tests 25 / # pass 25 / # fail 0` (registry integrity, invalid-entry rejection, navigation consistency, required routes, status rules, honesty rules, heading order, badge text) | — |
| 7 | `npm run build` (production build) | 2026-07-15 | 7e6f408c3 | PASS | `Built 32 pages into dist/`; XML sitemap correctly skipped without `PUBLIC_APP_URL` | — |
| 8 | `npm run validate:links` | 2026-07-15 | 7e6f408c3 | PASS | `Link validation passed: 1109 internal references resolve.` | External URLs (GitHub) not fetched by the validator; repository URLs verified manually via web fetch same day |
| 9 | `PUBLIC_APP_URL=https://frontdoor.example npm run build` | 2026-07-15 | 7e6f408c3 | PASS | sitemap.xml with 31 URLs + robots.txt Sitemap line generated; rebuilt afterwards without the variable | `frontdoor.example` used only to exercise the generator; never committed into content |
| 10 | `node scripts/serve.ts` + HTTP checks | 2026-07-15 | 7e6f408c3 | PASS | `GET / → 200`, `GET /trust/ → 200`, `GET /nope/ → 404` | Local preview only; no browser available in sandbox |
| 11 | `npx tsc --noEmit` (typecheck) | 2026-07-15 | 7e6f408c3 | BLOCKED | `403 Forbidden - GET https://registry.npmjs.org/tsc` | B-EXT-2. Typecheck runs in CI (`.github/workflows/ci.yml`, pinned typescript@5.9.3) on first push; code executes under Node's type-stripping in every test/build above |
| 12 | Lint | — | — | NOT CONFIGURED | No linter existed upstream and none can be installed locally (B-EXT-2). No no-op substitute was added (fabricating a green "lint" script is prohibited) | Steward may add eslint in a follow-up; CI structure accommodates it |
| 13 | GitHub Issues public-creation check (web fetch) | 2026-07-15 | — | FAIL for public posting | Issues page: "Issue creation is restricted in this repository"; no Discussions tab | B-EXT-7: no open submission pathway; site states this honestly |

## Not verifiable from this environment (external evidence pending)

- CI run result (requires push — B-EXT-1)
- Deployment, domain, HTTPS, mobile-device checks (B-EXT-4/5; see `docs/DOMAIN_ACTIVATION_CHECKLIST.md`)
- Human screen-reader audit (accessibility review limitation #1)
