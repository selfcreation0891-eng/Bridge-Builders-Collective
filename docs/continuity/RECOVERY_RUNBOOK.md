# Recovery Runbook — Bridge Builders Portfolio Control Center

## Purpose

This runbook explains how to recover the Portfolio Control Center application from any failure state — missing code, broken build, broken branch, or lost data. Read the relevant section before taking any action.

---

## Section 1 — Locate the Repository

The Portfolio Control Center application lives in a **separate private repository**:

- **Canonical name:** `bridge-builders-portfolio-control-center`
- **GitHub owner:** `selfcreation0891-eng`
- **Expected URL:** `https://github.com/selfcreation0891-eng/bridge-builders-portfolio-control-center`
- **Status as of 2026-07-22:** Repository not yet created. Application exists in Lovable only.

If the GitHub repository has been created, go to:
`https://github.com/selfcreation0891-eng/bridge-builders-portfolio-control-center`

If the repository is missing or inaccessible, see Section 9 — Reconnect Lovable.

**Do not confuse this with:**
`selfcreation0891-eng/Bridge-Builders-Collective` — this is the governance and continuity workspace, not the PCC application.

---

## Section 2 — Restore Dependencies

From within the PCC repository directory:

```bash
npm ci
```

- Requires Node 18+ (check with `node --version`)
- Uses the existing `package-lock.json`
- Do not use `npm install` (it may update the lockfile)
- If `package-lock.json` is missing, the lockfile must be regenerated — document this as a blocker before proceeding

---

## Section 3 — Run the Application

```bash
npm run dev
```

Open `http://localhost:5173` (or the port shown in the terminal).

Expected routes:
- `/` — Command Center
- `/projects` — Projects list
- `/vocabulary` — Canonical vocabulary
- `/evidence` — Evidence ledger
- `/decisions` — Decisions
- `/dependencies` — Dependencies
- `/handoffs` — Handoffs
- `/reviews` — Reviews
- `/guide` — Operating guide
- `/settings` — Settings

---

## Section 4 — Verify Routes

Verify these routes load without runtime errors:

```
/
/projects
/vocabulary
/evidence
/decisions
/dependencies
/handoffs
/reviews
/guide
/settings
/projects/bridge-builders-collective-front-door
/projects/bridge-builders-academy-founding-experience
/projects/sun-reset
/projects/bridgeview-vision
/projects/system-rosetta-stone
/projects/living-archive-sophia-governance
/projects/closeone-flow
```

Open browser developer tools (F12) and confirm no console errors during navigation.

---

## Section 5 — Import a JSON Backup

If localStorage data is lost (browser cleared, device changed, or new browser):

1. Open the Portfolio Control Center in the browser.
2. Navigate to `/settings`.
3. Locate the Import section.
4. Upload a previously exported JSON file.
5. Confirm that all seven seeded projects are visible in `/projects`.

**If no backup exists:** the seeded data is embedded in the application code (`src/lib/portfolio/seed.ts`). Navigate to `/settings` and trigger a "Reset to seed data" option if available, or clear localStorage and reload to reinitialize from seed.

---

## Section 6 — Recover from a Broken Branch

If a working branch is broken:

1. Do not force-push main.
2. Create a new branch from the last known-good commit:
   ```bash
   git checkout -b recovery/pcc-YYYY-MM-DD {last-good-sha}
   ```
3. Cherry-pick or re-apply only the changes that were verified.
4. Document what was lost and why in `docs/continuity/LOCAL_VERIFICATION.md`.

The rollback point for PCC-2 is: `df3c1ff97c917866df91ea3a86b91d4e5bacec87` (HEAD of Bridge-Builders-Collective main before PCC-2 branch).

---

## Section 7 — Return to the Last Verified Commit

The last Lovable-verified commit is:

```
3b9c9f52af26d3fea8c33baf251eea34c11926a5
```

To return to this commit in the PCC repository:

```bash
git checkout 3b9c9f52af26d3fea8c33baf251eea34c11926a5
```

This puts the repository in a detached HEAD state. Create a branch from it:

```bash
git checkout -b recovery/lovable-verified-base
```

Do not force-push main to this commit without steward authorization.

---

## Section 8 — Reconnect Lovable

If Lovable loses connection to the GitHub repository:

1. Go to `https://lovable.dev` and open the Bridge Command project (ID: `2230cda3-847a-4bc2-acf8-fc9bd2c22b07`).
2. Navigate to project settings → GitHub integration.
3. Confirm the connected repository is `selfcreation0891-eng/bridge-builders-portfolio-control-center`.
4. If the connection is broken, re-authorize Lovable's GitHub app and reconnect.
5. Do not connect Lovable to `selfcreation0891-eng/Bridge-Builders-Collective` (wrong repository).
6. After reconnection, confirm the latest Lovable commit is visible in the GitHub repository.

---

## Section 9 — Confirm Private Data Has Not Been Published

Check the following:

1. **Repository visibility:** `https://github.com/selfcreation0891-eng/bridge-builders-portfolio-control-center` must show "Private."
2. **No Vercel/Netlify/GitHub Pages deployment:** Confirm no live URL exposes the application publicly.
3. **localStorage data:** Application data is browser-local only. Confirm no API endpoint or external service is receiving data.
4. **`.env` files:** Run `git log --all --full-history -- .env` and confirm no `.env` file with secrets has ever been committed.
5. **GitHub Actions:** Confirm no workflow exposes internal data as artifacts or logs.

If any of the above confirms private data has been published, stop immediately and notify Maurice.

---

## Section 10 — Known Failure Modes

| Failure | Likely Cause | Action |
|---------|--------------|--------|
| Blank page on load | JavaScript error in router | Open browser console; check for missing route or missing component |
| Seeded projects missing | localStorage cleared | Re-import from JSON backup or reset to seed data in /settings |
| Build fails | TypeScript error or missing dependency | Run `npx tsc --noEmit` to identify errors |
| `npm ci` fails | Corrupted lockfile or missing Node version | Check Node version; regenerate lockfile from Lovable if needed |
| Routes return 404 | Dev server not running or wrong port | Restart `npm run dev` |
| Lovable and GitHub out of sync | Lovable committed locally; GitHub not updated | Push from Lovable settings; do not push manually unless authorized |
