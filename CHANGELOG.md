# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
This project will adopt [Semantic Versioning](https://semver.org/spec/v2.0.0.html)
from the first public release.

---

## [Unreleased]

### Added

- Security policy (`SECURITY.md`) covering vulnerability reporting, scope, and responsible
  disclosure.
- Dependabot configuration (`.github/dependabot.yml`) for GitHub Actions and npm ecosystem
  monitoring.
- Dependency review workflow (`.github/workflows/dependency-review.yml`) to block
  vulnerable or license-incompatible dependencies in pull requests.
- Deployment configuration inventory (`docs/DEPLOYMENT_CONFIGURATION_INVENTORY.md`)
  documenting all environment variables with classification, scope, and storage guidance.
- GitHub Environments setup guide (`docs/GITHUB_ENVIRONMENTS_SETUP.md`) with staging and
  production protection rule recommendations.
- GitHub Security setup guide (`docs/GITHUB_SECURITY_SETUP.md`) documenting web-interface
  configuration steps.
- Release process documentation (`docs/RELEASE_PROCESS.md`).
- `.gitignore` additions: `*.pem`, `*.key`, `*.crt`, `*.p12`, `*.pfx`,
  `service-account*.json`.

---

<!-- Releases will be added below this line in reverse chronological order -->

[Unreleased]: https://github.com/selfcreation0891-eng/Bridge-Builders-Collective/commits/main
