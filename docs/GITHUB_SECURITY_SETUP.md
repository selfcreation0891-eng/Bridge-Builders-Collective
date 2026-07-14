# GitHub Security Setup Guide

This document describes the security settings that must be configured in the GitHub web
interface for this repository. It separates settings that are already in place via
repository files from settings that require manual enablement in the GitHub web UI.

**Status legend:**
- ✅ Configured in repository files
- ⚙️ Requires GitHub web interface action
- ⏳ Not yet verified / pending confirmation
- ℹ️ Availability depends on repository plan or organization settings

---

## 1. Settings Configured in Repository Files

These are active as soon as the files are merged into the default branch.

| Setting | File | Status |
| ------- | ---- | ------ |
| Dependabot version updates | `.github/dependabot.yml` | ✅ |
| Dependency review on PRs | `.github/workflows/dependency-review.yml` | ✅ |
| Secret-bearing file protection | `.gitignore` | ✅ |
| Security policy and reporting | `SECURITY.md` | ✅ |
| Environment variable documentation | `.env.example` | ✅ |

---

## 2. Settings That Require the GitHub Web Interface

The following settings are **not** configured by repository files. A repository administrator
must enable them manually.

### Step-by-Step Instructions

#### Open Repository Settings

1. Navigate to the repository on GitHub.
2. Click **Settings** (top navigation bar).
3. In the left sidebar, click **Code security and analysis** (or **Security** depending on plan).

---

#### 2.1 Dependency Graph

**Required for Dependabot to function.**

- Locate **Dependency graph**.
- Click **Enable** if not already enabled.
- This is enabled by default for public repositories.

> Status: ⏳ Not yet verified.

---

#### 2.2 Dependabot Alerts

Notifies maintainers when a dependency has a known vulnerability.

- Locate **Dependabot alerts**.
- Click **Enable**.

> Status: ⏳ Not yet verified.

---

#### 2.3 Dependabot Security Updates

Automatically opens pull requests to fix vulnerable dependencies.

- Locate **Dependabot security updates**.
- Click **Enable**.
- Requires Dependabot alerts to be enabled first.

> Status: ⏳ Not yet verified.

---

#### 2.4 Private Vulnerability Reporting

Allows security researchers to report vulnerabilities privately without opening a public issue.

- Locate **Private vulnerability reporting**.
- Click **Enable**.
- ℹ️ Availability depends on the GitHub plan. Available on GitHub Free for public repositories
  and GitHub Enterprise for private repositories.

> Status: ⏳ Not yet verified. Must be enabled before public launch.

---

#### 2.5 Secret Scanning

Scans commits for accidentally exposed secrets such as API keys and tokens.

- Locate **Secret scanning**.
- Click **Enable**.
- ℹ️ Available on GitHub Advanced Security or public repositories on GitHub Free.

> Status: ⏳ Not yet verified.

---

#### 2.6 Push Protection

Blocks commits that contain detected secrets before they reach the remote.

- Locate **Push protection** (within Secret scanning section).
- Click **Enable**.
- ℹ️ Requires secret scanning to be enabled first.
- ℹ️ Available on GitHub Advanced Security or public repositories.

> Status: ⏳ Not yet verified. Strongly recommended before any developer adds credentials.

---

#### 2.7 Code Scanning

**Decision: CodeQL not configured at this time.**

Reason: The repository currently contains Markdown documentation only. CodeQL has no
supported language to analyse. CodeQL will be added when application source code
(TypeScript, JavaScript, or other supported language) is introduced.

Action required when code is added:
1. Confirm languages in use.
2. Create `.github/workflows/codeql.yml` targeting those languages.
3. Enable code scanning in Settings → Code security and analysis.

> Status: ℹ️ Deferred — not applicable to documentation-only repository.

---

#### 2.8 Security Advisories

For disclosing and coordinating vulnerability fixes.

- Navigate to **Security** tab → **Advisories**.
- Review any existing draft advisories.
- Publish advisories after fixes are released and coordinated with reporters.

> Status: ⏳ No advisories published yet.

---

## 3. Branch Protection

Branch protection rules must be applied to `main` before public launch.

Recommended rules for `main`:

| Rule | Recommended setting |
| ---- | ------------------- |
| Require pull request reviews | Yes — at least 1 approving review |
| Dismiss stale reviews | Yes |
| Require status checks to pass | Yes — include dependency-review |
| Require branches to be up to date | Yes |
| Restrict who can push to main | Yes — limit to administrators |
| Do not allow force pushes | Yes |
| Do not allow deletions | Yes |

**To configure:**

1. Repository Settings → **Branches**.
2. Click **Add branch protection rule** or edit the existing rule for `main`.
3. Apply the recommended settings above.

> Status: ⏳ Not yet verified. Must be confirmed before public launch.

---

## 4. CODEOWNERS

A `CODEOWNERS` file assigns automatic review requirements for sensitive paths.

A `CODEOWNERS` file should be created at `.github/CODEOWNERS` once contributors and
maintainer GitHub usernames are confirmed.

Example structure (do not activate until usernames are verified):

```
# Default owner for all files
* @selfcreation0891-eng

# Security-sensitive paths
SECURITY.md @selfcreation0891-eng
.github/ @selfcreation0891-eng
docs/ @selfcreation0891-eng
```

> Status: ⏳ Deferred — maintainer GitHub username list must be confirmed first.

---

## 5. Settings Not Yet Verified

The following require confirmation by a repository administrator:

- [ ] Dependency graph enabled
- [ ] Dependabot alerts enabled
- [ ] Dependabot security updates enabled
- [ ] Private vulnerability reporting enabled
- [ ] Secret scanning enabled
- [ ] Push protection enabled
- [ ] Branch protection for `main` configured
- [ ] CODEOWNERS file created and activated

---

## 6. Settings Unavailable or Not Applicable

| Setting | Reason |
| ------- | ------ |
| CodeQL code scanning | No supported source code language present |
| Container scanning | No Dockerfiles |
| Infrastructure scanning | No Terraform or cloud IaC files |

---

*This document must be reviewed and updated when application source code, containerization,
or infrastructure-as-code is introduced to the repository.*
