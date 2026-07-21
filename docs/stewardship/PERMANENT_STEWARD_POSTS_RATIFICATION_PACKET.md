# Permanent Steward Posts — Ratification Packet

Prepared for founding-steward review per `docs/canonical/CHANGE_AUTHORITY.md`. Nothing in this packet is a decision. The Charter and every document listed here remain **Pending Ratification** and **inactive** until a human ratification decision is recorded.

## Purpose of the decision

Adopt the Permanent Steward Posts Charter v1 as a subordinate canonical governance standard, establishing five permanent human stewardship posts that begin in observation-only mode, with SOPHIA advisory to all five and holding no governance authority.

## Files created

- `docs/canonical/PERMANENT_STEWARD_POSTS_CHARTER.md` — the Charter: purpose, shared definition, five post definitions, SOPHIA advisory relationship, appointment/rotation/absence/removal/succession, review cadence.
- `docs/stewardship/STEWARD_POSTS_AUTHORITY_MATRIX.md` — action-by-action authority and prohibition matrix.
- `docs/stewardship/STEWARD_HANDOFF_AND_ESCALATION_PROTOCOL.md` — standard handoff packet and required routes.
- `docs/stewardship/OBSERVATION_ONLY_OPERATING_PROTOCOL.md` — the mandatory initial operating mode and its exit conditions.
- `docs/stewardship/CONTINUITY_CERTIFICATION_STANDARD.md` — internal continuity certification criteria, statuses, and roles.
- `docs/stewardship/templates/STEWARD_OBSERVATION_RECORD_TEMPLATE.md`
- `docs/stewardship/templates/STEWARD_HANDOFF_RECORD_TEMPLATE.md`
- `docs/stewardship/templates/STEWARD_DECISION_RECORD_TEMPLATE.md`
- `docs/stewardship/templates/STEWARD_SUCCESSION_HANDOFF_TEMPLATE.md`
- `docs/stewardship/templates/CONTINUITY_CERTIFICATION_REVIEW_TEMPLATE.md`
- `src/stewardship/steward-posts.ts` — typed registry encoding the Charter's structural invariants (five posts, human-only, observation-only, SOPHIA decision authority always false, handoff routes present).
- `tests/stewardship.test.ts` — machine checks of those invariants, including that the Charter remains pending and posts inactive pre-ratification.
- `docs/stewardship/PERMANENT_STEWARD_POSTS_RATIFICATION_PACKET.md` — this packet.

## Files amended

- `docs/canonical/ECOSYSTEM_AUTHORITY_ORDER.md` — added a "Subordinate canonical standards" note referencing the Charter (level 5 upon ratification); the numbered order is unchanged.
- `docs/canonical/CHANGE_AUTHORITY.md` — added a "Steward posts (pending ratification)" section stating that ratification, amendment, appointments, and removals route through this document; grants nothing pre-ratification.
- `docs/canonical/CANONICAL_VOCABULARY.md` — added "Permanent Steward Post" entry, explicitly marked pending ratification (see conflict C-011).
- `doc/GOVERNANCE.md` — added a "Permanent Steward Posts (pending ratification)" reference section; changed Advisory Participants "May assist with" to "May support (advisory only)" per Constitution §3 principle 8 (see conflict C-012).
- `STEWARD_ESCALATION_MATRIX.md` — added a cross-reference to the handoff protocol; tiers unchanged.
- `docs/POST_RELEASE_CONTINUITY_PLAN.md` — added a cross-reference aligning the posts' cadence with the existing weekly cycle; cycle unchanged.
- `CLAUDE.md` — added a "Stewardship Posts Boundary" section prohibiting AI self-ratification, activation, or appointment.
- `docs/CANONICAL_CONFLICT_REGISTER.md` — recorded conflicts C-010, C-011, C-012.

Deliberately untouched: `docs/canonical/BRIDGE_BUILDERS_CONSTITUTION.md` (amendment not needed and not authorized), `README.md` (no public claim about unratified governance), `src/ecosystem/ecosystem-registry.ts` and all public routes (the posts are not a public environment or navigation destination), and all unrelated architecture, branding, and program files.

## Conflicts resolved

- **C-010** — Vocabulary Steward vs the vocabulary approval authority reserved by `CHANGE_AUTHORITY.md`: resolved in Charter §4.3; the post proposes, it does not approve.
- **C-011** — vocabulary entry drafted before its approving decision: deferred, marked pending, canonized by this ratification decision if adopted.
- **C-012** — "assist" vs "support" advisory wording in `doc/GOVERNANCE.md`: resolved; Constitution text untouched.

## Authority implications

The Charter grants no new approval authority. All approval authorities in `CHANGE_AUTHORITY.md` are unchanged. The five posts hold observation, recording, recommendation, handoff, and escalation responsibilities only. The Institutional Steward gains review-and-routing responsibility, not constitutional authority. Founding-steward authority remains exactly as existing canonical documents define it.

## What the Charter establishes

Five and only five permanent human stewardship posts (Orientation, Continuity, Vocabulary, Product, Institutional); their shared and specific responsibilities and prohibitions; SOPHIA's advisory relationship to all five; handoff and escalation routes; observation-only as the mandatory initial mode; appointment, rotation, absence, removal, and succession processes; internal continuity certification; and a minimum review cadence.

## What the Charter does not establish

It does not appoint anyone to any post (all posts are vacant at ratification). It does not activate the posts before ratification. It does not create approval, publication, merge, discipline, or certification authority for any post in observation-only mode. It does not modify the Constitution, the authority order's numbered ranking, consent requirements, archive protections, accessibility obligations, or public-claims boundaries. It does not expose the posts as a public environment. It does not give SOPHIA any authority.

## Observation-only safeguards

All posts begin observation-only. The mode prohibits unilateral publishing, approving, rejecting, merging, deploying, access or permission changes, canonical or public-status changes, content removal, discipline, appointment/removal, self-certification, closing serious escalations, and representing recommendations as decisions. Exit requires recorded human review, maintained records, exercised handoffs, no unresolved constitutional conflict, completed orientation, continuity readiness, and an adopted steward decision defining the exact expanded authority. Default remains observation-only.

## SOPHIA boundary

SOPHIA supports all five posts (context, comparison, contradiction detection, summaries, recommendation options, evidence organization, handoff packet preparation) and may not occupy a post, vote, appoint, remove, approve, ratify, publish, merge, deploy, change canonical records or permissions, discipline, diagnose, certify continuity, close escalations, make final determinations, or communicate a recommendation as an adopted decision. Every SOPHIA artifact must separate observed evidence, detected pattern, uncertainty, advisory interpretation, recommended human review, and human decision status, and must carry the required advisory notice. Enforced in: Constitution §9 (root); Charter "SOPHIA Advisory Relationship"; authority matrix (every row); observation-only protocol; certification standard; decision/handoff/certification templates; `src/stewardship/steward-posts.ts` (`sophiaDecisionAuthority: false`, validated); `tests/stewardship.test.ts`.

## Open questions

- Who will be appointed to each post, and when? (Separate appointment decisions per Charter §9.2; not part of ratification.)
- Should the first 30-day observation cycle begin at ratification or on a set date? (Human steward instruction required.)
- When the Rosetta Stone environment stewards are constituted (`CHANGE_AUTHORITY.md`), how will their vocabulary approval authority relate to the Vocabulary Steward post? (Recorded as C-010; current answer: the post proposes only.)
- Does the founding steward want the posts referenced from the public Trust Center after ratification? (Not done in this build.)

## Risks

- **Vacancy risk** — ratifying with all posts vacant creates named responsibilities no one holds; mitigated by vacancy/interim records at activation and Charter §9.4.
- **Confusion risk** — "Vocabulary Steward" vs Rosetta approval authority (C-010) could be misread despite explicit wording; watch at quarterly authority review.
- **Drift risk** — the typed registry mirrors the Charter; if either changes without the other, tests catch structural drift but not wording drift.
- **Representation risk** — any public description of the posts as operational before appointment would violate `PUBLIC_CLAIMS_STANDARD.md`; nothing public was changed in this build.

## Proposed ratification language

```text
Adopted Steward Decision — Permanent Steward Posts Charter v1

The founding steward adopts the Permanent Steward Posts Charter v1 as a subordinate canonical governance standard of Bridge Builders Collective.

The Charter establishes five permanent human stewardship posts:

1. Orientation Steward
2. Continuity Steward
3. Vocabulary Steward
4. Product Steward
5. Institutional Steward

SOPHIA remains advisory to all five posts and holds no independent approval, publication, disciplinary, appointment, certification, or governance authority.

Upon activation, each post begins in observation-only mode. Expanded authority requires a separate recorded steward decision consistent with the Bridge Builders Constitution and Change Authority.

Adoption date: [DATE]
Decision authority: [NAME OR RECORDED STEWARD ID]
Rationale: [RATIONALE]
```

## Post-ratification activation checklist

To be executed only after the ratification decision is supplied by the human steward:

1. Change Charter status line from `Pending Ratification` to `Ratified — Observation-Only Activation`.
2. Record the adopted decision using `docs/stewardship/templates/STEWARD_DECISION_RECORD_TEMPLATE.md`, with the supplied date, authority, and rationale.
3. Update `CHARTER_STATUS` in `src/stewardship/steward-posts.ts` to `'ratified-observation-only'` and update the corresponding test expectation.
4. Update the pending-ratification markers in the amended documents (authority order note, change authority section, vocabulary entry, governance reference, escalation matrix reference, continuity plan reference) to reflect adoption.
5. Create the first continuity record in `docs/continuity/`.
6. Mark all five posts `Active — Observation Only`.
7. Do not appoint individuals unless separately instructed; create an initial vacancy or interim-status record for each unoccupied post.
8. Begin the first 30-day observation cycle only if instructed by the human steward.
9. Do not expand authority; do not describe observation-only posts as empowered to execute actions.
