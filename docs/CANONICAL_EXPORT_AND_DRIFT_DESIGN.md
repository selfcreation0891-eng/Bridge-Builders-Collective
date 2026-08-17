# Canonical Artifact Schema and Drift Rules — Finalized for Review

Status: Operational design adopted under SD-2026-08-06-01 §3
(founder-corrected 2026-08-06). Implementation follows as its own reviewed
increment; no code exists yet.

## 1. Machine-verifiable schema (JSON Schema, draft 2020-12; committed to both repositories)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://bridgebuilderscollective.com/schemas/canonical-artifacts.v1.json",
  "type": "object",
  "additionalProperties": false,
  "required": ["schemaVersion", "provenance", "identity", "statusMappings", "environments"],
  "properties": {
    "schemaVersion": { "const": 1 },
    "provenance": {
      "type": "object",
      "additionalProperties": false,
      "required": ["repository", "commit", "registryVersion", "registryEntryCount", "authorizingDecisions"],
      "properties": {
        "repository": { "const": "selfcreation0891-eng/Bridge-Builders-Collective" },
        "commit": { "type": "string", "pattern": "^[0-9a-f]{40}$" },
        "registryVersion": { "type": "string", "minLength": 1 },
        "registryEntryCount": { "type": "integer", "minimum": 1 },
        "authorizingDecisions": {
          "type": "array", "minItems": 1,
          "items": { "type": "string", "pattern": "^SD-[0-9]{4}-[0-9]{2}-[0-9]{2}-[0-9]{2}$" }
        }
      }
    },
    "identity": {
      "type": "object",
      "additionalProperties": false,
      "required": ["canonicalName", "leadIdentity", "subordinateDescriptors", "unauthorizedAsLead"],
      "properties": {
        "canonicalName": { "const": "Bridge Builders Collective" },
        "leadIdentity": { "type": "string", "minLength": 20 },
        "subordinateDescriptors": { "type": "array", "items": { "type": "string", "minLength": 1 } },
        "unauthorizedAsLead": { "type": "array", "items": { "type": "string", "minLength": 1 } }
      }
    },
    "statusMappings": {
      "type": "array", "minItems": 8, "maxItems": 8,
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": ["canonicalStatus", "publicLabel", "publicVisibility", "conditions", "requiredAccessNotice", "authorizationRank"],
        "properties": {
          "canonicalStatus": { "enum": ["public", "public-preview", "steward-pilot", "invitation-required", "in-development", "internal", "planned", "archived"] },
          "publicLabel": { "enum": ["available-now", "public-preview", "in-development", "planned", null] },
          "publicVisibility": { "enum": ["visible", "hidden", "historical-only"] },
          "conditions": { "type": "array", "items": { "type": "string", "minLength": 1 } },
          "requiredAccessNotice": { "type": ["string", "null"], "minLength": 1 },
          "authorizationRank": { "type": ["integer", "null"], "minimum": 0, "maximum": 3 }
        }
      }
    },
    "environments": {
      "type": "array", "minItems": 1,
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": ["id", "canonicalName", "publicName", "status", "publicLabel", "publicVisibility", "destination", "parentEnvironmentId", "shortDescription", "accessNotice", "trustNotice"],
        "properties": {
          "id": { "type": "string", "pattern": "^[a-z0-9-]+$" },
          "canonicalName": { "type": "string", "minLength": 1 },
          "publicName": { "type": "string", "minLength": 1 },
          "navLabel": { "type": "string", "minLength": 1 },
          "status": { "enum": ["public", "public-preview", "steward-pilot", "invitation-required", "in-development", "internal", "planned", "archived"] },
          "publicLabel": { "enum": ["available-now", "public-preview", "in-development", "planned", null] },
          "publicVisibility": { "enum": ["visible", "hidden", "historical-only"] },
          "destination": { "type": ["string", "null"], "format": "uri" },
          "parentEnvironmentId": { "type": ["string", "null"], "pattern": "^[a-z0-9-]+$" },
          "shortDescription": { "type": "string", "minLength": 1 },
          "accessNotice": { "type": ["string", "null"] },
          "trustNotice": { "type": ["string", "null"] }
        }
      }
    }
  }
}
```

Notes honoring the corrections: optional fields are omitted (`navLabel`) or
explicitly nullable (`destination`, `parentEnvironmentId`, notices,
`publicLabel`, `authorizationRank`); no `"?"` or empty-string placeholders;
no generation timestamp (deterministic byte-identical output from a given
canonical commit — verified in canonical CI by double-generation);
`registryVersion` carries the canonical registry version; `commit` is the
full 40-char SHA; `authorizingDecisions` lists the steward decisions that
authorize the export (initially `SD-2026-08-06-01`, plus status-affecting
decisions such as `SD-2026-07-28-02` and `SD-2026-08-06-02`).

## 2. The eight status-mapping records (exact content of `statusMappings`)

| canonicalStatus | publicLabel | publicVisibility | conditions | requiredAccessNotice | authorizationRank |
|---|---|---|---|---|---|
| `public` | `available-now` | visible | destination required and externally verified | null | 3 |
| `public-preview` | `public-preview` | visible | preview notice rendered | "preview" framing | 2 |
| `in-development` | `in-development` | visible | no destination presented as usable | null | 1 |
| `planned` | `planned` | visible | no implementation claims | null | 0 |
| `steward-pilot` | `in-development` | visible | label may not imply availability | pilot explanation | **null** (non-linear; display rule only) |
| `invitation-required` | `public-preview` | visible | invitation requirement stated | invitation explanation | **null** (non-linear; display rule only) |
| `internal` | null | **hidden** | never rendered, never in sitemap | null | **null** |
| `archived` | null | **historical-only** | never shown as active | archival notice if shown | **null** |

No linear rank is imposed on `internal`, `archived`, `steward-pilot`, or
`invitation-required`; each is governed by its display rule, not by ordering.

## 3. Drift algorithm (implementation CI: `validate:canonical`)

Inputs: vendored artifact; committed schema; app `canon.ts` + `navigation.ts`
(or their artifact-derived successors). Modes: `dev` (warn on staleness),
`release` (staleness rules enforced).

1. **Schema gate** — validate artifact against the committed JSON Schema.
   Invalid → FAIL.
2. **Provenance gate** — `provenance.commit` must be a full SHA; canonical
   CI separately proves the artifact regenerates byte-identical from that
   commit. Mismatch → FAIL (canonical side).
3. **Status authorization** — for each artifact environment:
   - if `authorizationRank` of its canonical status is non-null: the app's
     claimed public label must have rank ≤ canonical rank → else FAIL;
   - `steward-pilot`: app may display only `in-development`, with the pilot
     notice → else FAIL;
   - `invitation-required`: app may display only `public-preview`, with the
     invitation notice → else FAIL;
   - `internal`: any public rendering or sitemap presence → FAIL;
   - `archived`: any active-surface rendering → FAIL.
4. **Identity gate** — app lead identity string must equal
   `identity.leadIdentity`; any `unauthorizedAsLead` string appearing as
   page title, hero lead, or nav brand → FAIL. `subordinateDescriptors` are
   permitted only in subordinate positions.
5. **Coverage gate** — every artifact environment with
   `publicVisibility: visible` must exist in app route metadata with a label
   equal to `navLabel ?? publicName`; missing or mislabeled → FAIL.
   Routes absent from the artifact may not carry environment-style status
   badges → FAIL.
6. **Staleness gate** — compare `provenance.commit` to canonical `main`:
   - newer canonical commits touching identity, registry, status, route
     authority, or public-claims paths (`src/ecosystem/**`,
     `docs/canonical/**`) → stale-**blocking**: WARN in `dev`, FAIL in
     `release`;
   - newer commits touching anything else → stale-informational: WARN only,
     both modes (unrelated documentation commits never require a bump).
7. **Repair direction** — a failure is always fixed by changing the
   implementation or by a recorded canonical decision; the canonical
   repository is never edited merely to match implementation drift.


## 4. Consumption

The implementation repository vendors the artifact at a pinned canonical
commit: `src/content/canonical/canonical-artifacts.json` plus a tiny typed
loader. `canon.ts` identity fields and `navigation.ts` statuses are derived
from (or validated against) the artifact instead of free-standing literals.
The existing mirror comments become enforced code.

## 5. Update procedure

1. Canonical change lands via steward decision + commit in
   Bridge-Builders-Collective.
2. Regenerate `canonical-artifacts.json` from that commit.
3. Open a PR in `bridgebuilderscollective` bumping the vendored artifact
   (provenance shows old→new canonical commit); Lovable syncs the merge.
4. Implementation CI drift check must pass before merge.

## 6. Rollback procedure

Revert the artifact-bump commit in the implementation repository (ordinary
revert — no history rewrite, honoring the Lovable no-rewrite rule); the app
returns to the prior conforming state. The canonical repository is never
edited to match implementation drift.

## 7. Explicitly out of scope

Touching the Lovable connection; changing the live domain; migrating
frameworks; auto-syncing without PR review.
