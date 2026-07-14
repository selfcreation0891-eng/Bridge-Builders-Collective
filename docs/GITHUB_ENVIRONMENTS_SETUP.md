# GitHub Environments Setup Guide

This document describes the GitHub Environments that must be created and configured
before deploying the Bridge Builders Collective platform. GitHub Environments allow
different secrets, variables, and protection rules to be applied per deployment target.

---

## Environment Overview

| Environment | Purpose | Protection level |
| ----------- | ------- | ---------------- |
| `development` | Local developer testing — not managed in GitHub Environments | None |
| `staging` | Pre-production validation and QA | Reviewer approval recommended |
| `production` | Live platform | Required reviewers + deployment branch rules |

---

## Instructions: Create GitHub Environments

A repository administrator must create these environments in the GitHub web interface.

### Step 1 — Open Environment Settings

1. Navigate to the repository on GitHub.
2. Click **Settings**.
3. In the left sidebar, click **Environments**.
4. Click **New environment**.

---

### Step 2 — Create the `staging` Environment

1. Name: `staging`
2. Click **Configure environment**.
3. **Deployment branches and tags**: select **Protected branches** or specify the branch
   pattern (e.g., `main` or a `release/*` pattern).
4. **Required reviewers**: add at least one maintainer (optional for staging but recommended).
5. **Wait timer**: optional — 0 minutes is acceptable for staging.
6. Click **Save protection rules**.

**Secrets to add to `staging`:**

| Secret name | Description |
| ----------- | ----------- |
| `SUPABASE_URL` | Staging Supabase project URL |
| `SUPABASE_ANON_KEY` | Staging Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Staging Supabase service role key |
| `AUTH_SECRET` | Staging session signing secret |
| `H_ROI_ANALYTICS_KEY` | Staging H-ROI analytics key |

**Variables to add to `staging`:**

| Variable name | Example value |
| ------------- | ------------- |
| `NEXT_PUBLIC_APP_URL` | `https://staging.bridgebuilderscollective.com` |
| `STORAGE_BUCKET` | `bridge-builders-media-staging` |
| `NODE_ENV` | `production` |

---

### Step 3 — Create the `production` Environment

1. Name: `production`
2. Click **Configure environment**.
3. **Deployment branches and tags**: select **Protected branches** — restrict to `main`
   or tagged releases only.
4. **Required reviewers**: add at least one maintainer. **Mandatory before public launch.**
5. **Wait timer**: recommended 5–10 minutes to allow deployment cancellation if needed.
6. Click **Save protection rules**.

**Secrets to add to `production`:**

| Secret name | Description |
| ----------- | ----------- |
| `SUPABASE_URL` | Production Supabase project URL |
| `SUPABASE_ANON_KEY` | Production Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Production Supabase service role key — rotate quarterly |
| `AUTH_SECRET` | Production session signing secret — high entropy required |
| `H_ROI_ANALYTICS_KEY` | Production H-ROI analytics key |

**Variables to add to `production`:**

| Variable name | Example value |
| ------------- | ------------- |
| `NEXT_PUBLIC_APP_URL` | `https://bridgebuilderscollective.com` |
| `STORAGE_BUCKET` | `bridge-builders-media-production` |
| `NODE_ENV` | `production` |

---

## Protection Rule Recommendations

### `staging`

| Rule | Recommended |
| ---- | ----------- |
| Required reviewers | 1 maintainer (optional) |
| Deployment branch | `main` |
| Wait timer | 0 minutes |

### `production`

| Rule | Recommended |
| ---- | ----------- |
| Required reviewers | 1–2 maintainers (**mandatory**) |
| Deployment branch | `main` (or tagged releases) |
| Wait timer | 5–10 minutes |
| Prevent self-review | Yes — the deployer should not be able to self-approve |

---

## Workflow Integration

When deployment workflows are added, they should reference these environments using the
`environment:` key in the job definition.

Example:

```yaml
jobs:
  deploy-production:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://bridgebuilderscollective.com
    steps:
      # deployment steps here
```

This ensures:
- The workflow pauses for reviewer approval before deployment.
- Secrets are scoped to the correct environment.
- Deployment history is recorded per environment.

---

## Secrets Rotation Schedule

| Secret | Recommended rotation | Trigger for immediate rotation |
| ------ | -------------------- | ------------------------------ |
| `SUPABASE_SERVICE_ROLE_KEY` | Quarterly | Suspected exposure |
| `AUTH_SECRET` | Annually (or on personnel change) | Suspected exposure, session compromise |
| `H_ROI_ANALYTICS_KEY` | Annually | Suspected exposure |
| `SUPABASE_ANON_KEY` | As needed | Suspected abuse |

---

## Pre-Launch Checklist

- [ ] `staging` environment created in GitHub Settings → Environments
- [ ] `production` environment created in GitHub Settings → Environments
- [ ] Required reviewers configured for `production`
- [ ] Deployment branch restrictions applied to `production`
- [ ] All secrets populated for `staging`
- [ ] All secrets populated for `production`
- [ ] All variables populated for both environments
- [ ] Deployment workflows reference correct environment names
- [ ] Rotation schedule documented and assigned to a responsible maintainer

---

*Review this document before each production deployment. Update environment variable lists
whenever new secrets or variables are introduced.*
