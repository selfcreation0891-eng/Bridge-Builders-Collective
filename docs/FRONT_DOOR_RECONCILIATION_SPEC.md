# Front-Door Reconciliation Specification

Status: Operational implementation specification — governed by
SD-2026-07-27-02 and `docs/canonical/RELATIONAL_FILE_STEWARDSHIP_STANDARD.md`.
Prepared 2026-07-27 (Pacific). **This specification does not claim the live
site has been corrected.** It defines what must change for the live root
domain to conform to the canonical front door. Implementation is live
deployment work, executed separately and evidenced per
`PUBLIC_CLAIMS_STANDARD.md`.

Three layers, kept distinct: **canonical decision** (SD-2026-07-27-02, made),
**implementation specification** (this document), **live deployment work**
(not started; nothing here is done until evidenced).

## 1. Current live state (observed 2026-07-27, WebFetch)

`https://bridgebuilderscollective.com/` serves an application not built from
this repository. Homepage title "Bridge Builders — Multimedia Stewardship
Platform"; governance framing "Living Systems Constitution"; navigation
Living Archive, Academy, Media, SOPHIA, Public Knowledge, Stewardship,
Rosetta, Community + More (Programs, Research, Contribute, Principles);
mission line "presence becomes contribution, contribution becomes memory,
and memory becomes a bridge for those who come next"; trust language
"Stewarded, not owned. Consent governs every flow."; SOPHIA described as
advisory with human decision-making; "ten distinct environments" described;
program lifecycle "Called → Convened → Practiced → Contributed → Archived →
Continued"; live program routes `/programs/synaptic-bridge` and (per the
quarantined registry change) `/programs/sun-reset`. No pricing, user-count,
partnership, or outcome claims were observed on the fetched pages.

## 2. Canonical target state

The root experience leads with Constitution §1 identity, uses canonical
vocabulary, derives its ecosystem catalog from the canonical registry (names,
statuses, notices, pathways), presents the trust surface from the committed
policy set, states SOPHIA and stewardship boundaries per Constitution §8–§9,
and offers only participation pathways that truthfully exist.

## 3. Divergence classification and required corrections

| # | Live-site element | Classification | Required correction |
|---|---|---|---|
| 1 | "Multimedia Stewardship Platform" as primary identity | Competing identity | Lead with canonical identity (Constitution §1); retain the phrase only as subordinate supporting language (explicitly permitted by SD-2026-07-27-02 §4) |
| 2 | "Living Systems Constitution" as governance identity | Competing identity / unsupported claim | Present the Bridge Builders Constitution as the governing document; the phrase may describe a framework only if separately adopted through canonical governance |
| 3 | Mission line ("presence becomes contribution…") | Acceptable supporting language | May remain; candidate for vocabulary adoption (separate founder approval) |
| 4 | Hand-built navigation set (8 items + More) | Navigation mismatch | Derive navigation from the canonical registry (names, order, statuses) or mirror it exactly; hand-written environment lists are defects per `ECOSYSTEM_REGISTRY_STANDARD.md` |
| 5 | "Media" nav label | Terminology drift | Canonical media branch is **BRIDGEview**; label follows the registry (or a navLabel adopted by steward decision) |
| 6 | "Community" nav label | Terminology drift (minor) | Align to registered branch naming (`community-stewardship`) or adopt a navLabel by decision |
| 7 | "Rosetta" nav label | Navigation mismatch (pending decision) | `navLabel: 'Rosetta'` exists only in the quarantined registry change; adopt via the Synaptic Bridge packet item 2 or use "System Rosetta Stone" |
| 8 | "Ten distinct environments" framing | Registry alignment requirement | Ecosystem catalog must reflect the canonical registry (currently 25 committed entries) with honest statuses |
| 9 | Trust language ("Stewarded, not owned…") | Acceptable supporting language | May remain; connect to the committed Trust Center sources (`docs/TRUST_CENTER_INDEX.md`) |
| 10 | SOPHIA framing (advisory; humans decide) | Conforms | None; keep consistent with Constitution §9 |
| 11 | Program lifecycle vocabulary ("Called → Convened → …") | Terminology drift | Not in the canonical vocabulary; adopt via `CHANGE_AUTHORITY.md` or remove from primary public framing (separate founder approval) |
| 12 | Site not generated from this repository | Deployment mismatch (root cause) | See §4 |
| 13 | Trust/policy pages (privacy, terms, accessibility, consent) | Missing canonical content (verification needed) | Root experience must surface the committed policy set with honest draft statuses; page-by-page verification is part of implementation |

## 4. Deployment ownership (the structural choice)

SD-2026-07-27-02 §4 fixes *what* the root must serve, not *which codebase*
serves it. Two conforming architectures; choosing one is a **separate
founder approval**:

- **(a) Repository front door at root** — deploy this repository's `dist/`
  at the root; the application lives at an approved subdomain/path recorded
  in the registry, linked as a participation destination.
- **(b) Application adopted as canonical front door** — amend
  `docs/FRONT_DOOR_BOUNDARY.md` per its own procedure (import/record source,
  branch, commit), bring the application into conformance with §3, and make
  it consume the canonical registry (e.g., `dist/ecosystem.json` or the
  typed registry) rather than hand-written lists.

Until one is chosen and evidenced, C-021 remains open and the live site
remains non-canonical in identity terms even where its content is good.

## 5. Registry alignment requirements

All public environment names, statuses, descriptions, and destinations shown
at the root must match the committed registry. Status raises (Academy,
Living Archive, Programs, Sun Reset) currently sit in the quarantined
working change — they enter the registry only through the Synaptic Bridge
packet countersign, never via the website first.

## 6. Trust and boundary language

The root must carry: honest environment statuses and access notices;
`PUBLIC_CLAIMS_STANDARD.md`-compliant claims only; SOPHIA advisory boundary;
consent language consistent with `PRIVACY_POLICY.md`; and the contribution
pathway's true current state.

## 7. Validation criteria (implementation is done only when)

1. Root URL serves the canonical front door per SD-2026-07-27-02 §4.
2. Identity spot-check: canonical identity leads; §3 items 1–2 corrected.
3. Ecosystem catalog matches `validate:registry` output (names, statuses).
4. No hand-written environment list diverges from the registry.
5. No claim without its evidence class; no prohibited claims.
6. Trust routes reachable; policy statuses honest.
7. Evidence recorded in `docs/VERIFICATION_EVIDENCE.md` (URLs, dates,
   screenshots) and `DOMAIN_ACTIVATION_CHECKLIST.md` steps 2–15 progressed.
8. C-021 updated to Resolved in the conflict register.

## 8. Rollback requirements

If conformance work breaks the live experience, restore the prior deploy and
record the incident; the canonical decision stands regardless of deployment
state. Registry destinations revert to `null` (statuses adjust) if routes go
dark.

## 9. Files and systems likely to require changes

Live application (identity copy, navigation source, catalog data source,
trust pages); hosting configuration (root routing, redirects, HTTPS);
this repository if architecture (a) is chosen (`PUBLIC_APP_URL`, deploy
config) or (b) (`docs/FRONT_DOOR_BOUNDARY.md` amendment, registry
`destination` fields via countersigned decisions); `docs/VERIFICATION_EVIDENCE.md`.

## 10. Items requiring separate founder approval

Architecture choice (a)/(b); adoption or removal of "Living Systems
Constitution" and lifecycle vocabulary; navLabel adoptions; the Synaptic
Bridge packet (registration + status raises); mission-line vocabulary
adoption; registrar-evidence attachment for checklist step 1.
