# Handoff Standard — Bridge Builders Portfolio Control Center

## Purpose

Every handoff between tools, sessions, or stewards must contain the required fields below. An incomplete handoff is not a valid handoff. A handoff that omits any required field must be treated as a reported claim only, not as an authoritative transition.

---

## Required Fields

### 1. Source Tool

The tool, session, or steward that completed the work and is handing off.

**Example:** `Cowork (GitHub Copilot Coding Agent) — session 2026-07-22`

---

### 2. Receiving Tool

The tool, session, or steward that is receiving the work.

**Example:** `Maurice Jackson (primary steward)` or `Lovable — Bridge Command project`

---

### 3. Project

The project affected by this handoff.

**Example:** `Bridge Builders Portfolio Control Center`

---

### 4. Branch

The exact Git branch containing the work.

**Example:** `pcc/github-cowork-foundation`

---

### 5. Commit

The exact Git SHA of the final commit included in this handoff.

**Example:** `df3c1ff97c917866df91ea3a86b91d4e5bacec87`

---

### 6. Completed Work

A specific list of what was done during this session. Not a summary — a list.

**Example:**
- Created `docs/continuity/EVIDENCE_STANDARD.md`
- Created `.github/PULL_REQUEST_TEMPLATE.md`
- Ran `npm ci` — exit code 0
- Ran `npx tsc --noEmit` — exit code 0

---

### 7. Files Changed

A list of every file added, modified, or deleted.

**Example:**
```
A docs/continuity/EVIDENCE_STANDARD.md
A .github/PULL_REQUEST_TEMPLATE.md
M docs/continuity/README.md
```

---

### 8. Verification Run

The verification steps actually executed during this session, with results.

**Example:**
```
Command: npm ci
Exit code: 0
Result: 447 packages installed

Command: npx tsc --noEmit
Exit code: 0
Result: No errors
```

If verification could not be run, state why.

---

### 9. Unresolved Blockers

Every blocker that was identified and not resolved during this session.

**Example:**
- BLOCKER: PCC GitHub repository does not exist. Cannot connect Lovable to GitHub until Maurice creates it.

If none, state: `None`

---

### 10. Decisions Required

Every decision that must be made by a human steward before the next session can proceed.

**Example:**
- DECISION: Maurice must confirm the canonical GitHub repository name before creation.
- DECISION: Maurice must accept the PCC-2 evidence record before PCC-3 begins.

If none, state: `None`

---

### 11. Exact Next Action

One specific, concrete action that the receiving tool or steward must take first. Not a list. Not a summary. One action.

**Example:** `Maurice: create a private GitHub repository named bridge-builders-portfolio-control-center under selfcreation0891-eng, then connect it to the Bridge Command Lovable project.`

---

### 12. Rollback Point

The Git SHA or named state the receiving tool can return to if the work in this handoff must be abandoned.

**Example:** `df3c1ff97c917866df91ea3a86b91d4e5bacec87` (HEAD of main before PCC-2 branch)

---

## Handoff Template

```markdown
## Handoff Record — {date}

| Field | Value |
|-------|-------|
| Source tool | |
| Receiving tool | |
| Project | |
| Branch | |
| Commit | |

### Completed Work
-

### Files Changed
```
A/M/D path
```

### Verification Run
| Command | Exit Code | Result |
|---------|-----------|--------|
| | | |

### Unresolved Blockers
-

### Decisions Required
-

### Exact Next Action


### Rollback Point

```
