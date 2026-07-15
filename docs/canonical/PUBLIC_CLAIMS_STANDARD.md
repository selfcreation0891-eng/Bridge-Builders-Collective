# Public Claims Standard

Version 1.0 — 2026-07-15. Authority level 5.

Every public claim about the ecosystem must carry (internally, via registry `sourceAuthority` and review records) one of these evidence classes:

| Class | Meaning | Required evidence |
|---|---|---|
| documented | A design/intent exists in writing | Committed document |
| implemented | Code exists in a canonical repository | Committed code |
| locally verified | Checks executed by a named person/agent | Command + date + commit SHA + output (see `docs/VERIFICATION_EVIDENCE.md`) |
| CI verified | Checks pass in committed CI | Workflow run link/ID |
| deployed | Running on a reachable host | URL + verification date |
| publicly accessible | Reachable by the public without credentials | External access check |
| pilot-tested | Used by stewards/pilot participants | Pilot record with dates |
| outcome-supported | Measured outcomes exist | H-ROI or equivalent measurement record |
| aspirational | Stated as intention only | Must be phrased as intention |
| prohibited without evidence | May not be published at all | — |

## Required distinctions

Public copy must never blur these lines:

- *Architecture exists* ≠ *software exists* ≠ *software builds* ≠ *software is deployed* ≠ *software is publicly available* ≠ *software is production-ready*.
- *Program content exists* ≠ *program has been piloted* ≠ *program has measured outcomes*.

## Prohibited without evidence

- "production-ready", "battle-tested", "trusted by institutions", named partnerships, user counts, outcome statistics, testimonials, security certifications.

## Enforcement

The registry validation (`src/ecosystem/ecosystem-validation.ts`) enforces status/claim consistency at test time; steward review enforces it editorially per `CHANGE_AUTHORITY.md`.
