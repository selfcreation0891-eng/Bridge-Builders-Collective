# Steward Eligibility, Orientation, and Appointment Process — Ratification Packet

> **Historical record.** This packet was prepared for founding-steward review and served its purpose: the decision it proposed was adopted on July 21, 2026 by Maurice Jackson, founding steward (`docs/stewardship/decisions/SD-2026-07-21-01-steward-eligibility-orientation-appointment-process-v1.md`). The packet is preserved unmodified below as the historical record of what was reviewed. Where its text says "pending ratification," that described the pre-adoption state. Adoption opened no candidacy and appointed no one.

Prepared for founding-steward review per `docs/canonical/CHANGE_AUTHORITY.md`. Nothing in this packet is a decision. Every document listed here remains **Pending Ratification** and **inactive** until a human ratification decision is recorded. Adoption of this process appoints no one.

## Decision purpose

Adopt the Steward Eligibility, Orientation, and Appointment Process v1 as a subordinate governance standard: the accessible, accountable, human-led pathway from vacancy → voluntary candidacy → eligibility review → orientation → evidence-based readiness review → recorded human appointment decision → acceptance → least-privilege access → observation-only onboarding, for the five Permanent Steward Posts.

## Files created

- `docs/stewardship/STEWARD_ELIGIBILITY_ORIENTATION_AND_APPOINTMENT_PROCESS.md` — the primary process standard: purpose, scope, candidate pathways, fifteen stages, non-appointment outcomes, controlling distinctions.
- `docs/stewardship/STEWARD_ELIGIBILITY_STANDARD.md` — shared eligibility (ten areas), the prohibited-requirements list, role-specific criteria for all five posts, and the open age/safeguarding question.
- `docs/stewardship/STEWARD_ORIENTATION_CURRICULUM.md` — fourteen modules with the full module structure, ten required scenarios, and format-flexible accessibility.
- `docs/stewardship/STEWARD_ROLE_READINESS_REVIEW_PROTOCOL.md` — evidence-based readiness review, allowed findings, "not currently ready" requirements, no ranking, no anonymous rejection.
- `docs/stewardship/STEWARD_APPOINTMENT_AND_ONBOARDING_PROTOCOL.md` — appointment authority (existing, not new), decision requirements, multiple-post concentration review, interim appointments, access separation and least privilege, candidate privacy, and SOPHIA support boundaries.
- Ten templates under `docs/stewardship/templates/`: nomination/application, candidate consent, conflict disclosure, orientation completion, role-readiness review, appointment recommendation, appointment decision, appointment acceptance, access-and-authority acknowledgment, onboarding continuity record.
- `src/stewardship/steward-appointment-process.ts` — typed candidacy states with machine-checked invariants (see SOPHIA boundary below) and a pre-ratification guard holding all five posts at `vacant`.
- `tests/steward-appointment.test.ts` — tests for every invariant, including that no path skips the human decision stage.
- This packet.

## Files modified

- `docs/canonical/ECOSYSTEM_AUTHORITY_ORDER.md` — one sentence added to the subordinate-standards note referencing the process (pending ratification).
- `docs/canonical/CHANGE_AUTHORITY.md` — paragraph added under "Steward posts": the process elaborates Charter §9.2 once ratified, creates no new approval authority, grants nothing pre-ratification.
- `docs/canonical/PERMANENT_STEWARD_POSTS_CHARTER.md` — one cross-reference paragraph added to §9.2; no Charter rule changed.
- `docs/stewardship/STEWARD_POSTS_AUTHORITY_MATRIX.md` — "Appointment process reference" note; matrix rows unchanged.
- `docs/stewardship/OBSERVATION_ONLY_OPERATING_PROTOCOL.md` — "Appointment and this mode" note: appointment never changes mode.
- `docs/stewardship/CONTINUITY_CERTIFICATION_STANDARD.md` — onboarding-record relationship note.
- `doc/GOVERNANCE.md` — one sentence in the Permanent Steward Posts section.
- `CLAUDE.md` — AI boundary extended: no candidacy, completion, readiness, or appointment records may be created by AI; decisions remain human after ratification.
- `docs/CANONICAL_CONFLICT_REGISTER.md` — C-013 (drafted-before-adoption, deferred) and C-014 (age/safeguarding open question, deferred) recorded.

Deliberately untouched: `docs/canonical/CANONICAL_VOCABULARY.md` (no new canonical term is required by this build), the Constitution, the ecosystem registry, public routes, programs, payments, archive permissions, deployment configuration, participant access, branding, and the five vacancy records in `docs/stewardship/posts/` (preserved exactly as ratified).

## Authority implications

None new. The founding steward remains the appointment decision authority (Charter §9.2; authority matrix). An occupied Institutional Steward may review and recommend within delegated authority. Self-appointment is prohibited. Eligibility, orientation completion, and readiness findings confer no authority and no right to appointment. Appointment grants only the post's existing observation-only authority. Every appointment requires its own recorded human decision and recorded acceptance.

## Privacy implications

Candidate applications, accommodation details, conflict disclosures, and unsuccessful-candidacy records are private, minimally collected, correctable, retained per `DATA_RETENTION_POLICY.md`, and never exposed through public routes. Public appointment records carry only accountability essentials (post, occupant, decision authority, date, scope, mode, review date). Private candidate files live in designated private stewardship storage, not this repository's public tree.

## Accessibility implications

Orientation is format-flexible (written, audio, discussion, summary, walkthrough, demonstration, supported reading, documented accommodation). Accommodation use never counts against a candidate; accommodations are recorded as support the post provides. No degree, license, credential, communication style, or freedom-from-disability requirement exists.

## SOPHIA boundary

SOPHIA may organize, summarize, prepare exercises, flag gaps and possible conflicts, and draft packets — always with the required advisory notice. SOPHIA may not recruit, rank, score human worth, infer hidden traits, diagnose, decide eligibility, make readiness findings, approve orientation completion without human review, recommend removal as final, appoint, reject, access private candidate records without authorized access, communicate an appointment before a human decision, grant access, create credentials, resolve conflicts of interest, act as Institutional Steward, or replace a human reviewer. Enforced in: the appointment protocol's SOPHIA section; the process standard §6; templates (human-only signature/authority fields); `steward-appointment-process.ts` (`sophiaAppointmentAuthority: false`, SOPHIA-as-authority rejected by validator); `tests/steward-appointment.test.ts`.

## What the process establishes

Consent-first candidacy pathways; fifteen ordered stages with no skippable human decision; a ten-area shared eligibility standard plus role-specific criteria; a fourteen-module accessible orientation curriculum with ten required scenarios; evidence-based readiness review with dignified findings; appointment decisions with required content and the observation-only statement; acceptance as a condition of effectiveness; concentration-of-authority review for multiple-post occupancy; accountable interim appointments; least-privilege access separated from appointment; candidate privacy rules; and SOPHIA's administrative-support-only role.

## What the process does not establish

It appoints no one (all five posts remain vacant). It creates no employment, compensation, licensing, or credentials. It grants no authority beyond each post's existing observation-only mandate. It does not change Observation-Only Mode. It does not replace the Charter's rotation, absence, removal, or succession procedures. It gives SOPHIA nothing.

## Open questions

- Age, safeguarding, and legal-capacity requirements (C-014) — requires an adopted steward decision informed by applicable law before any affected candidacy opens.
- Where private candidate records physically live (designated private storage) — the decision authority designates the location before the first candidacy opens.
- Who facilitates orientation while all five posts are vacant — the founding steward, or reviewers the founding steward designates.
- Whether the founding steward intends to open candidacies for all five posts at once or sequence them.

## Risks

- **Vacancy bootstrap** — with every post vacant, the founding steward temporarily carries facilitation, review, and decision roles; the concentration-of-authority and recusal rules mitigate but do not remove this until first appointments exist.
- **Process weight** — fifteen stages could deter volunteers; the accessibility commitments and non-stigmatizing outcomes are the counterweight, and the process can be amended (never weakened below the Charter) if it proves heavy.
- **Privacy drift** — candidate records must not accumulate in the public repository; the packet's privacy rules place them in designated private storage.
- **Pending-marker debt** — as with the Charter, ratification must sweep the pending markers; the post-ratification steps below list every location.

## Post-ratification next steps

1. Change the process standard and its companions from `Pending Ratification` to ratified/active wording (process standard, eligibility standard, curriculum, readiness protocol, appointment protocol, ten templates).
2. Record the adopted decision using the steward decision template in `docs/stewardship/decisions/`.
3. Update `APPOINTMENT_PROCESS_STATUS` in `src/stewardship/steward-appointment-process.ts` to `'ratified'` and update the corresponding test expectation.
4. Update the pending-ratification references added to the authority order, change authority, Charter §9.2, authority matrix, observation-only protocol, certification standard, GOVERNANCE.md, and CLAUDE.md.
5. Resolve C-013 in the conflict register; C-014 remains open until separately decided.
6. Add a continuity note recording the adoption.
7. Designate private candidate-record storage and orientation facilitation before opening any candidacy.
8. Open candidacies only when the founding steward chooses — adoption itself opens none.

## Proposed decision language

```text
Adopted Steward Decision —
Steward Eligibility, Orientation, and Appointment Process v1

The founding steward adopts the Steward Eligibility, Orientation, and
Appointment Process v1 as a subordinate governance standard of Bridge Builders
Collective.

The process establishes accessible and accountable requirements for candidate
consent, eligibility review, orientation, role-readiness review, appointment
decisions, appointment acceptance, access acknowledgment, and continuity
onboarding for the five Permanent Steward Posts.

Adoption of this process does not appoint any person.

All five Permanent Steward Posts remain vacant until a separate authorized
human appointment decision is recorded for each occupant.

Any future occupant enters the post in its current Observation-Only Mode and
receives no authority beyond the ratified Charter, authority matrix, and
operating protocols.

SOPHIA may support documentation and orientation but may not determine
eligibility, make readiness findings, select, reject, appoint, grant access, or
exercise governance authority.

Adoption date: [DATE]

Decision authority: [NAME OR RECORDED STEWARD ID]

Rationale: [RATIONALE]
```
