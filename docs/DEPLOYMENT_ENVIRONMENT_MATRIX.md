# Deployment Environment Matrix — Front Door v0.1.0

## Environment variables

| Variable | Local dev | Build | Deployment | Forms | Auth | Analytics | Optional | Public/Secret | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `PUBLIC_APP_URL` | optional | optional* | required for production | — | — | — | yes | public | *Without it, sitemap.xml/robots Sitemap line are skipped. Set to the canonical origin once the domain exists. Renamed from `NEXT_PUBLIC_APP_URL` (conflict C-003). |
| `NODE_ENV` | optional | ignored | ignored | — | — | — | yes | public | Static output has no runtime. |
| `SUPABASE_URL` | no | no | no | future | future | — | yes | public | Reserved for future downstream environments. NOT used by the front door. |
| `SUPABASE_ANON_KEY` | no | no | no | future | future | — | yes | public (by design) | Reserved; unused. |
| `SUPABASE_SERVICE_ROLE_KEY` | no | no | no | — | future | — | yes | **secret** | Reserved; unused. Must never appear in front-door code or CI logs. |
| `AUTH_SECRET` | no | no | no | — | future | — | yes | **secret** | Reserved; unused. |
| `STORAGE_BUCKET` | no | no | no | future | — | — | yes | public | Reserved; unused. |
| `H_ROI_ANALYTICS_KEY` | no | no | no | — | — | future | yes | **secret** | v0.1.0 ships with NO analytics (privacy decision, see release checklist). |
| `PORT` | optional | — | — | — | — | — | yes | public | Local preview server only (`npm run serve`, default 4173). |

No real secrets exist in the repository (verified: `.env` is gitignored; `.env.example` contains empty values only).

## Build and hosting facts

- **Hosting platform**: UNRESOLVED — steward decision (B-EXT-5). The output is a plain static site; any static host works (GitHub Pages, Netlify, Cloudflare Pages, Vercel static, S3+CDN). GitHub Pages is the least-new-infrastructure option since the repo already lives on GitHub.
- **Build command**: `npm run build` (runs `node scripts/build-site.ts`)
- **Output directory**: `dist/`
- **Node version**: >= 22.18 (enforced via `engines`; CI uses Node 22)
- **Package manager**: npm 10.x with `package-lock.json` (lockfileVersion 3); the project has zero dependencies
- **Deployment branch**: `main` (after the activation PR merges)
- **Preview deployments**: recommended ON for pull requests (host-dependent); preview URLs must never be treated as canonical
- **Production deployment**: build from `main` with `PUBLIC_APP_URL` set to the canonical origin
- **Domain configuration**: see `docs/DOMAIN_ACTIVATION_CHECKLIST.md`
- **Redirects**: alternate hostnames (e.g. apex ↔ www) 301 → canonical origin; no other redirects exist
- **Error page**: `dist/404.html` (hosts that support custom 404s should point at it)
- **Environment-specific URLs**: none hardcoded — verified: no `localhost`, preview, or invented domains appear in built pages (the only absolute URLs are the public GitHub repository links); `scripts/serve.ts` uses localhost for local preview only and is not part of the built output.
