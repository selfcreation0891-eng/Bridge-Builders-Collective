# Security Policy

## Supported Versions

The following table describes which versions of the Bridge Builders Collective platform are
currently receiving security updates. Until an initial stable release is published, all active
development occurs on the default branch and that branch is the supported version.

| Version | Supported          |
| ------- | ------------------ |
| main    | ✅ Active development |
| Other branches | ❌ Not supported |

Once versioned releases are published, this table will be updated to reflect the supported
release series.

---

## Reporting a Vulnerability

**Do not open a public GitHub issue to report a security vulnerability.**

Public issues are visible to all users immediately, which could expose the vulnerability
before it is assessed and mitigated.

### Private Reporting

Use GitHub's private vulnerability reporting channel:

1. Navigate to the repository's **Security** tab.
2. Select **Report a vulnerability**.
3. Complete the advisory form with as much detail as possible.

If private vulnerability reporting is not yet enabled on this repository, send a report to:

> Security contact: configure a verified private reporting channel in GitHub before public launch.

A placeholder email will be replaced with a verified contact address prior to the first public
release.

### What to Include in a Report

Please provide:

- A clear description of the vulnerability.
- The affected component, file path, or endpoint.
- Steps to reproduce the vulnerability reliably.
- The potential impact if exploited.
- Any proof-of-concept code or payload (mark it clearly and do not execute against production).
- Your preferred contact method for follow-up.

### What to Avoid

- Do not test vulnerabilities against production systems or other users' data.
- Do not exfiltrate, modify, or destroy data during research.
- Do not publicly disclose the vulnerability before a fix is available and coordinated.

---

## Expected Acknowledgement Process

| Stage | Target timeline |
| ----- | --------------- |
| Initial acknowledgement | Within 5 business days |
| Triage and severity assessment | Within 10 business days |
| Fix development begins | Based on severity (see below) |
| Fix released | Coordinated with reporter |
| Public disclosure | After fix is available |

### Severity-Based Response Targets

| Severity | Response target |
| -------- | --------------- |
| Critical | Within 24–48 hours |
| High | Within 7 days |
| Medium | Within 30 days |
| Low | Next scheduled release cycle |

---

## Scope

### In Scope

- Authentication and authorization systems
- Session and token management
- Data storage, access control, and Row Level Security policies
- API endpoints and serverless functions
- Consent and privacy systems
- Archive integrity and continuity systems
- Governance infrastructure
- Dependency vulnerabilities with realistic exploitation paths
- Secret exposure in code or configuration

### Out of Scope

- Theoretical vulnerabilities without realistic exploitation paths
- Social engineering attacks against platform participants
- Vulnerabilities in third-party services not controlled by this project
- Denial-of-service attacks requiring significant infrastructure resources
- Issues already known and tracked in the public issue tracker
- Vulnerabilities in browsers or operating systems

---

## Dependency Vulnerabilities

Dependency vulnerabilities are tracked automatically via GitHub Dependabot.

If you discover a dependency vulnerability that Dependabot has not flagged:

1. Report it privately using the process above.
2. Include the dependency name and version.
3. Reference the relevant CVE or advisory if available.

Security updates to dependencies are prioritized and reviewed as soon as they are available.

---

## Credential Exposure

If you discover that credentials, API keys, service tokens, or other secrets have been
accidentally committed to this repository:

1. **Do not use, forward, or publish the exposed value.**
2. Report privately using the process above.
3. Include the file path and variable name only — do not reproduce the full value.
4. The maintainers will immediately rotate the affected credentials and remove the value
   from Git history.

---

## Responsible Disclosure

Bridge Builders Collective is committed to working with security researchers in good faith.

We agree to:

- Respond promptly and transparently.
- Not pursue legal action against researchers who report in good faith.
- Acknowledge researchers in the security advisory if they consent.
- Coordinate public disclosure timing with the reporter.

We ask researchers to:

- Report privately before any public disclosure.
- Allow reasonable time for a fix to be developed and released.
- Limit testing to accounts and data they control.

---

## Security Advisories

Published security advisories will appear in the **Security > Advisories** tab of this
repository after they are disclosed.

---

*This policy will be reviewed and updated prior to the first public production release.*
