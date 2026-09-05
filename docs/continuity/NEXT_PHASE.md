# Next Phase — PCC-3

## Precondition

**PCC-3 must not begin until PCC-2 is accepted by Maurice.**

PCC-2 is the GitHub and Cowork Continuity Foundation phase. It is complete when:

1. The `bridge-builders-portfolio-control-center` GitHub repository exists and is private.
2. The Lovable project (Bridge Command, ID: `2230cda3-847a-4bc2-acf8-fc9bd2c22b07`) is connected to the GitHub repository.
3. The PCC application builds and runs locally without errors.
4. All seven seeded project routes load without errors.
5. JSON export and import function correctly.
6. All continuity documentation (this repository) has been reviewed by Maurice.
7. Maurice has explicitly accepted the PCC-2 evidence record (`docs/evidence/PCC-0001-GITHUB-COWORK-FOUNDATION.md`).

---

## PCC-3 Scope (Proposed)

PCC-3 — Authenticated Shared Persistence, Role-Based Stewardship, Backups, and Controlled Automated Evidence Ingestion

### Proposed components

1. **Authenticated multi-user access**
   - Replace localStorage-only persistence with authenticated sessions.
   - Minimum: support for Maurice as primary steward + one or more additional stewards.
   - Authentication provider TBD (requires steward decision — do not assume Supabase or any specific provider).

2. **Server-side persistence**
   - Replace or supplement localStorage with a database.
   - All project records, evidence, blockers, decisions, handoffs, and reviews persist to a server.
   - Database provider TBD (requires steward decision).

3. **Automated backup system**
   - Scheduled JSON export or database snapshot.
   - Backup frequency and retention policy TBD.

4. **Role-based steward permissions**
   - Different roles for different steward posts (read, write, approve).
   - Tied to the Permanent Steward Posts Charter.
   - Implementation approach TBD.

5. **Controlled automated evidence ingestion**
   - Allow the PCC to read evidence from GitHub (commits, PRs, workflow runs) on a controlled, authorized basis.
   - No open API access to internal data.
   - Ingestion scope and authorization model TBD.

---

## Decisions Required Before PCC-3 Can Begin

All of the following require explicit steward decision before PCC-3 design begins:

1. Authentication provider (which system, which accounts).
2. Database provider (which system, data residency requirements).
3. Hosting environment (where the application will run, who has access).
4. Backup policy (frequency, retention, recovery process).
5. Evidence ingestion scope (which GitHub events are ingested, how).
6. Role definitions (which steward posts get which permissions).
7. Deployment authorization (public vs. private, who approves a deployment).

---

## What PCC-3 Must Not Do

- Begin without PCC-2 acceptance.
- Assume any external provider without steward decision.
- Deploy the application publicly without a separate deployment review.
- Introduce authentication that bypasses steward oversight.
- Add evidence ingestion that exposes internal operational data externally.

---

## Timeline

PCC-3 has no authorized start date as of 2026-07-22. It begins only after Maurice accepts PCC-2.
