# Decision Packet — Vacancy Coverage Routing

**ADOPTED — see adoption notice below** (original proposal text preserved
unchanged for history)

## Adoption notice (added 2026-07-22)

The receiver-of-record option (a variant of options 1 and 3 below: one named
human — the founding steward — receives matters for all five posts) was
adopted on July 22, 2026 by Maurice Jackson, founding steward, in
`docs/stewardship/decisions/SD-2026-07-22-02-vacancy-coverage-receiver-of-record.md`.
Operational effect: all five posts' coverage transitioned
awaiting-human-decision → temporarily-routed; every post remains vacant,
human-only, and observation-only. No appointment occurred and no authority
was expanded — receiving is not deciding, and routing is not occupancy.

---

Original packet as prepared (historical):

This packet prepares a decision; it makes none. No temporary receiver exists
until a recorded human decision adopts one. Prepared: 2026-07-22.
Decision authority: founding steward, per `docs/canonical/CHANGE_AUTHORITY.md`.

## Why vacancy routing is needed

All five Permanent Steward Posts are vacant. Observations, handoffs, and
escalations addressed to them accumulate in queues with no human designated
to acknowledge them. Records are preserved and urgent safety escalation
works regardless — but acknowledgment, review preparation, and continuity
judgment need a human. Until this decision, every post's coverage truthfully
reads `awaiting-human-decision`.

## Proposed options

1. **Single temporary receiver for all five posts.** One named human receives
   all queued matters. Simplest; highest concentration; requires explicit
   recusal rules where the receiver's own work is the subject.
2. **Per-post temporary receivers.** Up to five named humans. Least
   concentration; requires more people than may currently exist.
3. **Founding steward as receiver of record, with published review cadence.**
   Matters route to the founding steward's existing authority; the weekly
   review packet becomes the acknowledgment mechanism.
4. **No routing; queue-and-review only.** No receiver; a human reviews queues
   on the published cadence. Slowest acknowledgment; zero new authority.

This packet deliberately does not recommend a person. Naming one — including
Maurice Jackson — is exactly the decision reserved to a human.

## Scope boundaries (whichever option is adopted)

Receiving is not deciding. A temporary receiver may acknowledge, preserve,
request information, prepare packets, and escalate — the observation-mode
acts. A receiver gains no post authority, no occupancy, and no title. The
registry continues to show the post as vacant.

## Recusal requirements

A receiver must recuse from any matter concerning their own conduct, their
own prior decisions, or a conflict they have declared; recused matters enter
`conflict-restricted` and route to the escalation engine's independent-review
path where no impartial reviewer exists.

## Duration, review, and termination

Proposed duration: until appointment or explicit human revision, with a
review date no more than 90 days out (validation requires one). Routing
terminates automatically upon appointment to the affected post
(`terminatesUponAppointment`, structural).

## Prohibition

Temporary routing must never be represented — in code, on any surface, or in
any communication — as occupancy, appointment, or staffing of the post.

## To adopt

Record the decision with the decision record template (naming option,
receiver reference, scope, recusal terms, review date); commit it under
`docs/stewardship/decisions/`; update `CURRENT_VACANCY_COVERAGE` citing the
record; run the verification suite; append the continuity record.
