# Evidence Standard — Bridge Builders Portfolio Control Center

## Purpose

This standard defines the evidence states used across the Portfolio Control Center and the Bridge Builders governance system. It establishes what counts as verified and what does not.

Code existing is not proof of behavior. A feature being described is not proof of implementation. A test passing once is not proof of production readiness.

---

## Evidence States

### Reported

A claim has been made — by a tool, a steward, documentation, or code — that something exists, works, or was completed.

**Reported evidence is the lowest level.** It means only that a claim was recorded.

- No independent check has been performed.
- The claim may be accurate, inaccurate, or untestable.
- A reported state must not be treated as confirmation.

**Example:** "The build succeeded." — stated in a session log, not verified by an independent run.

---

### Inspected

The claimed artifact, code, or behavior has been directly examined by a tool or steward. The examination confirms the artifact exists in its stated location with its stated structure.

**Inspected evidence means the artifact is present and readable.** It does not mean the artifact behaves correctly at runtime.

- The file, route, or configuration was found and read.
- The data structure was confirmed to match the specification.
- No execution was performed.

**Example:** `src/lib/portfolio/seed.ts` was read and confirmed to contain seven project records matching the canonical slug list.

---

### Reproduced

The described behavior was executed and the expected outcome was observed. The execution was performed by the verifying tool or steward, not merely reported by the implementing tool.

**Reproduced evidence means the behavior was observed, not just described.**

- Exact command or interaction was recorded.
- Exit code, output, or visual state was recorded.
- The verifying session is different from the implementing session, or sufficient time has passed that the result is not cached.

**Example:** `npm run build` completed with exit code 0; `dist/` directory created with the expected output.

---

### Accepted

A primary human steward (currently: Maurice Jackson) has reviewed the reproduced evidence and confirmed it meets the standard for this phase.

**Accepted evidence is the highest level.** No tool may mark evidence as accepted on behalf of a steward.

- The steward reviewed the reproduced evidence directly.
- The steward explicitly stated acceptance (written, verbal with a record, or recorded decision).
- The acceptance is dated and attributed.

**Example:** Maurice reviewed the PCC-2 evidence record on YYYY-MM-DD and stated: "Accepted — foundation verified."

---

## Applying the Standard

When recording evidence:

1. State the evidence level explicitly.
2. Do not upgrade the level without performing the corresponding check.
3. If a check cannot be performed, state why and record the blocker.
4. Never describe a check as passed unless it was actually executed.
5. Never mark evidence accepted without explicit steward confirmation.

---

## Evidence Levels and Corresponding Trust

| Level | Claim | Trust |
|-------|-------|-------|
| Reported | Something was said | Minimal — verify before acting |
| Inspected | Something was found | Moderate — confirms presence, not behavior |
| Reproduced | Behavior was observed | High — verified by execution |
| Accepted | Steward confirmed | Definitive — authorized for next phase |

---

## Application to Tool Outputs

| Tool | Default Evidence Level | Notes |
|------|----------------------|-------|
| Lovable | Reported | Lovable describes what it built; a separate session must inspect and reproduce |
| Cowork | Reported to Reproduced | Cowork can execute commands and record results; output should be captured |
| GitHub Actions | Reproduced | CI pass/fail is automatically recorded with logs |
| Maurice (human) | Accepted | Maurice's explicit review upgrades evidence to Accepted |
