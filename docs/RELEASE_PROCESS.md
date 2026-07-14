# Release Process

This document describes the release process for the Bridge Builders Collective platform.

No production release has been published yet. This document establishes the process to
follow when the first release is ready.

---

## Versioning Strategy

This project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html) (SemVer).

```
MAJOR.MINOR.PATCH
```

| Segment | When to increment |
| ------- | ----------------- |
| MAJOR | Breaking changes to APIs, data schemas, or governance interfaces |
| MINOR | New features or capabilities that are backward compatible |
| PATCH | Bug fixes, security patches, documentation corrections |

### Pre-release versions

Before the first stable release, the version will follow:

```
0.MINOR.PATCH  — active development, no stability guarantees
```

The first stable release will be `1.0.0` and will be published only when:

- All security prerequisites listed in `docs/GITHUB_SECURITY_SETUP.md` are verified.
- All environment variables are populated and validated in production.
- GitHub Environments with required reviewer protection are in place.
- Branch protection for `main` is confirmed.
- At least one complete end-to-end deployment to staging has succeeded.
- `CHANGELOG.md` is up to date.

---

## Release Workflow (Manual — Pre-Automation)

Until a release automation workflow is in place, releases are created manually.

### Step 1 — Update CHANGELOG.md

1. Move the contents of the `[Unreleased]` section into a new versioned section.
2. Add the release date.
3. Add the comparison link at the bottom of the file.

Example:

```markdown
## [1.0.0] — 2026-MM-DD

### Added
- ...

[1.0.0]: https://github.com/selfcreation0891-eng/Bridge-Builders-Collective/compare/v0.1.0...v1.0.0
```

### Step 2 — Commit the changelog

```bash
git add CHANGELOG.md
git commit -m "chore: prepare release v1.0.0"
```

### Step 3 — Create and push the release tag

```bash
git tag -a v1.0.0 -m "Release v1.0.0"
```

Push via pull request and merge. Tags are pushed via the GitHub release process (Step 4),
not via `git push` directly in CI.

### Step 4 — Create the GitHub Release

1. Navigate to the repository on GitHub.
2. Click **Releases** in the right sidebar.
3. Click **Draft a new release**.
4. Select the tag `v1.0.0` (create it if it does not yet exist).
5. Title: `v1.0.0 — [brief description]`
6. Body: copy the relevant section from `CHANGELOG.md`.
7. Mark as **pre-release** if this is a 0.x.x version.
8. Click **Publish release** (or **Save draft** to review first).

---

## Release Prerequisites Checklist

Complete all items before publishing any production release.

### Security

- [ ] No open critical or high security advisories
- [ ] Dependabot security PRs resolved or triaged
- [ ] All secrets rotated if any exposure occurred during development
- [ ] `SECURITY.md` reviewed and contact placeholder replaced with a real channel
- [ ] Private vulnerability reporting enabled on GitHub

### Infrastructure

- [ ] `production` GitHub Environment created with required reviewer protection
- [ ] All production secrets populated in GitHub Environments
- [ ] Branch protection for `main` verified
- [ ] Secret scanning and push protection enabled

### Application

- [ ] Staging deployment verified successful
- [ ] Critical user flows tested in staging
- [ ] Accessibility verified (see `ACCESSIBILITY_STANDARD.md`)
- [ ] Governance documentation reviewed (see `docs/GOVERNANCE.md`)

### Documentation

- [ ] `CHANGELOG.md` updated with all notable changes
- [ ] `README.md` reflects current platform state
- [ ] `docs/DEPLOYMENT_CONFIGURATION_INVENTORY.md` up to date
- [ ] Version number consistent across all relevant files

---

## Release Automation (Planned)

When the CI/CD pipeline matures, a release workflow will be added at:

`.github/workflows/release.yml`

It will:

1. Trigger on a `v*` tag push.
2. Build and test the application.
3. Deploy to production via the `production` GitHub Environment (with reviewer gate).
4. Create a GitHub Release with the changelog body.

This is planned — not yet implemented. Do not publish a production release without
this workflow or a manually verified equivalent process in place.

---

## Hotfix Process

For urgent security or data-integrity fixes on a released version:

1. Create a branch from the affected release tag: `git checkout -b hotfix/v1.0.1 v1.0.0`
2. Apply the minimal required fix.
3. Open a pull request to `main` and the release branch (if applicable).
4. Follow the standard release checklist, abbreviated as appropriate for urgency.
5. Publish a patch release (e.g., `v1.0.1`).
6. Notify affected users per the incident response protocol (see `INCIDENT_RESPONSE_PROTOCOL.md`).

---

*This document will be updated as release automation is implemented.*
