# Known Limitations — Bridge Builders Portfolio Control Center

**As of:** 2026-07-22 (PCC-2 phase)

These limitations describe the current state of the system. They are not aspirational gaps or planned features. They are the documented boundaries of what the system can and cannot do right now.

---

## Persistence

### localStorage-only persistence

All Portfolio Control Center data — projects, evidence, blockers, decisions, handoffs, reviews — is stored in the browser's localStorage. This means:

- Data does not persist across browsers or devices.
- Clearing browser data removes all records.
- No cloud backup exists.
- No server-side storage exists.
- There is no database.

**Consequence:** A single browser session is the only durable copy of operational data unless a manual JSON export has been performed.

---

## Access and Authentication

### No authenticated multi-user access

The application has no authentication system. Any person who can open the application URL in a browser can read and modify all data.

**Consequence:** The application is suitable only for single-steward use on a trusted private device.

---

## Evidence Ingestion

### No GitHub evidence ingestion

The Portfolio Control Center does not connect to GitHub. It cannot automatically read commits, pull requests, workflow runs, or repository status.

**Consequence:** Evidence from GitHub must be entered manually.

---

### No Lovable evidence ingestion

The Portfolio Control Center does not connect to Lovable. It cannot automatically read Lovable project state, commit history, or deployment status.

**Consequence:** Evidence from Lovable must be entered manually.

---

### No Cowork evidence ingestion

The Portfolio Control Center does not connect to Cowork (GitHub Copilot Coding Agent). It cannot automatically import Cowork session outputs, command results, or evidence records.

**Consequence:** Evidence from Cowork sessions must be entered manually.

---

## Synchronization

### No automated cross-project status synchronization

Project statuses in the Portfolio Control Center reflect what was last manually entered. There is no mechanism to pull live status from any external system.

**Consequence:** The truth state of each project may lag behind actual implementation state.

---

## Roles and Permissions

### No role-based steward permissions

All stewards and users of the application have identical access. There are no read-only roles, approval workflows within the application, or steward-specific views.

**Consequence:** Governance enforcement is procedural (through documented standards) rather than technical (through application-enforced permissions).

---

## Backup

### No server-side backup

The only backup mechanism is the manual JSON export available in `/settings`. No automated backup runs. No scheduled export exists.

**Consequence:** If localStorage is cleared and no export has been taken, all data is lost. Regular manual exports are required.

---

## Deployment

### No production deployment authorization

The Portfolio Control Center has not been authorized for any production deployment. It is a private, browser-local application.

**Consequence:** The application must not be deployed to a public URL, hosted on a public server, or connected to any public network without explicit steward authorization and a separate deployment review.

---

## GitHub Repository

### GitHub repository not yet created (as of 2026-07-22)

The canonical GitHub repository (`selfcreation0891-eng/bridge-builders-portfolio-control-center`) does not exist. The application code exists in Lovable only.

**Consequence:** All PCC-2 verification steps requiring the GitHub repository are blocked until Maurice creates the repository and connects Lovable to it.

---

## Summary Table

| Limitation | Current State | Required for Resolution |
|------------|--------------|------------------------|
| localStorage-only persistence | Active | PCC-3: database + server-side storage |
| No multi-user auth | Active | PCC-3: authentication system |
| No GitHub evidence ingestion | Active | PCC-3+: GitHub integration |
| No Lovable evidence ingestion | Active | Future phase |
| No Cowork evidence ingestion | Active | Future phase |
| No cross-project sync | Active | Future phase |
| No role-based permissions | Active | PCC-3+: RBAC |
| No server-side backup | Active | PCC-3: backup system |
| No production deployment auth | Active | Separate deployment review required |
| GitHub repository not created | Active (2026-07-22) | Maurice: create repo + connect Lovable |
