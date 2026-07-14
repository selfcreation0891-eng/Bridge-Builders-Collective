# Deployment Configuration Inventory

This document inventories all environment variables and configuration secrets required by
the Bridge Builders Collective platform. It is derived from actual repository usage and
serves as the authoritative reference for secrets management, environment setup, and
deployment readiness.

**Classification key:**
- **Secret** — must never appear in source code, logs, or public configuration
- **Non-secret** — safe to commit or expose in build output (e.g. public API base URLs)
- **Build-time** — consumed by the build process (bundled into output)
- **Runtime** — consumed by the server or edge functions at request time

---

## Variables Currently Documented in `.env.example`

### `SUPABASE_URL`

| Property | Value |
| -------- | ----- |
| Classification | Non-secret |
| Visibility | Server-only (safe as build-time if using public schema) |
| Required environments | development, staging, production |
| Build-time | No |
| Runtime | Yes |
| Files referencing it | `.env.example` |
| Required now | No — no application code present yet |
| Safe placeholder | `https://your-project-ref.supabase.co` |
| Rotation responsibility | Platform administrator |
| Validation method | Confirm Supabase project is reachable at this URL |
| Storage | GitHub Environments secret or hosting provider environment |

---

### `SUPABASE_ANON_KEY`

| Property | Value |
| -------- | ----- |
| Classification | Non-secret (public by design — Supabase anon key is client-safe) |
| Visibility | May appear in client-side code |
| Required environments | development, staging, production |
| Build-time | Yes (if used in frontend bundle) |
| Runtime | Yes |
| Files referencing it | `.env.example` |
| Required now | No — no application code present yet |
| Safe placeholder | `anon-key-placeholder` |
| Rotation responsibility | Platform administrator (rotated via Supabase dashboard) |
| Validation method | Attempt an anonymous Supabase query |
| Storage | GitHub Environments variable (not secret — but treat with care) |

---

### `SUPABASE_SERVICE_ROLE_KEY`

| Property | Value |
| -------- | ----- |
| Classification | **Secret — CRITICAL** |
| Visibility | Server-only — must never appear in client-side code |
| Required environments | staging, production |
| Build-time | No |
| Runtime | Yes — server functions, migrations, admin operations only |
| Files referencing it | `.env.example` |
| Required now | No — no server functions present yet |
| Safe placeholder | `service-role-key-placeholder` |
| Rotation responsibility | Platform administrator (rotated via Supabase dashboard) |
| Validation method | Confirm server function can authenticate with Supabase admin client |
| Storage | GitHub Environments secret — never in Variables |

> ⚠️ Exposure of the service role key bypasses all Row Level Security policies.
> Never commit, log, or expose this key. Rotate immediately if exposed.

---

### `NEXT_PUBLIC_APP_URL`

| Property | Value |
| -------- | ----- |
| Classification | Non-secret |
| Visibility | Public — exposed in client-side bundle |
| Required environments | development, staging, production |
| Build-time | Yes (NEXT_PUBLIC_ prefix causes Next.js to embed at build time) |
| Runtime | No |
| Files referencing it | `.env.example` |
| Required now | No — no application code present yet |
| Safe placeholder | `http://localhost:3000` (dev), `https://staging.example.com` (staging), `https://bridgebuilderscollective.com` (production placeholder) |
| Rotation responsibility | Platform administrator |
| Validation method | Confirm URL resolves to the correct deployment |
| Storage | GitHub Environments variable |

---

### `AUTH_SECRET`

| Property | Value |
| -------- | ----- |
| Classification | **Secret** |
| Visibility | Server-only |
| Required environments | development, staging, production |
| Build-time | No |
| Runtime | Yes — used to sign session tokens or JWTs |
| Files referencing it | `.env.example` |
| Required now | No — no authentication code present yet |
| Safe placeholder | Generate with: `openssl rand -base64 32` |
| Rotation responsibility | Platform administrator — rotation invalidates all active sessions |
| Validation method | Confirm authentication flows succeed end-to-end |
| Storage | GitHub Environments secret |

---

### `STORAGE_BUCKET`

| Property | Value |
| -------- | ----- |
| Classification | Non-secret |
| Visibility | Server-only (may appear in server logs) |
| Required environments | staging, production |
| Build-time | No |
| Runtime | Yes |
| Files referencing it | `.env.example` |
| Required now | No — no storage code present yet |
| Safe placeholder | `bridge-builders-media-dev` |
| Rotation responsibility | Platform administrator |
| Validation method | Confirm bucket exists and access control policy is correct |
| Storage | GitHub Environments variable |

---

### `H_ROI_ANALYTICS_KEY`

| Property | Value |
| -------- | ----- |
| Classification | **Secret** |
| Visibility | Server-only |
| Required environments | staging, production |
| Build-time | No |
| Runtime | Yes — used to authenticate H-ROI metrics reporting |
| Files referencing it | `.env.example` |
| Required now | No — H-ROI metrics service not yet integrated |
| Safe placeholder | `h-roi-analytics-key-placeholder` |
| Rotation responsibility | Platform administrator |
| Validation method | Confirm analytics reporting endpoint accepts the key |
| Storage | GitHub Environments secret |

---

### `NODE_ENV`

| Property | Value |
| -------- | ----- |
| Classification | Non-secret |
| Visibility | Public |
| Required environments | All |
| Build-time | Yes |
| Runtime | Yes |
| Files referencing it | `.env.example` |
| Required now | Yes (defaults to `development` locally) |
| Safe placeholder | `development` / `test` / `production` |
| Rotation responsibility | N/A — set per environment |
| Validation method | Check `process.env.NODE_ENV` at runtime |
| Storage | GitHub Environments variable |

---

## Anticipated Variables (Not Yet in Use)

The following variable names are anticipated based on the platform architecture
(Supabase backend, Next.js or similar frontend). They are not yet referenced in code.
Add them to `.env.example` and this inventory when they are introduced.

| Variable name | Classification | Notes |
| ------------- | -------------- | ----- |
| `DATABASE_URL` | Secret | Direct database connection string — server-only |
| `RESEND_API_KEY` | Secret | Transactional email provider |
| `STRIPE_SECRET_KEY` | Secret | Payment processing — never client-side |
| `STRIPE_PUBLISHABLE_KEY` | Non-secret | Client-safe Stripe key |
| `STRIPE_WEBHOOK_SECRET` | Secret | Validates incoming Stripe webhooks |
| `OPENAI_API_KEY` | Secret | AI features — server-only |
| `CLOUDFLARE_API_TOKEN` | Secret | CDN or DNS management |
| `VERCEL_TOKEN` | Secret | Deployment token — CI/CD use only |

---

## Storage Location Decision Matrix

| Type | GitHub Secrets | GitHub Variables | Hosting Provider |
| ---- | -------------- | ---------------- | ---------------- |
| API keys, tokens, passwords | ✅ | ❌ | ✅ |
| Non-secret public values | ❌ | ✅ | ✅ |
| Build-time public values | ❌ | ✅ | ✅ |
| Service role or admin keys | ✅ | ❌ | ✅ (env var, not log) |

---

## Pre-Launch Checklist

Before any environment goes live:

- [ ] All secret variables populated in GitHub Environments secrets (never Variables)
- [ ] All non-secret variables populated in GitHub Environments variables
- [ ] `.env.example` kept current with all variable names and descriptions
- [ ] No real values committed to `.env.example` or any tracked file
- [ ] Supabase service role key confirmed server-only
- [ ] Auth secret generated with appropriate entropy (`openssl rand -base64 32`)
- [ ] All variable names reviewed by a second maintainer before production launch

---

*This inventory must be updated whenever a new environment variable is introduced.
Run a search for `process.env`, `import.meta.env`, and `NEXT_PUBLIC_` before each release.*
