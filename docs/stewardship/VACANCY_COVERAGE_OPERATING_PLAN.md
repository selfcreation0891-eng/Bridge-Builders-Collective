# Vacancy Coverage Operating Plan

Status: Operating plan for a pending human decision — nothing here designates anyone
Authority: subordinate to the Charter (§9) and `CHANGE_AUTHORITY.md`.
Last updated: 2026-07-22

## The question vacancy coverage answers

All five Permanent Steward Posts are vacant. Matters addressed to a vacant
post must go somewhere — but *who receives them* is a human governance
decision that has not been made. This plan defines how coverage works once a
human decides, and how the system behaves honestly until then.

## Coverage states

Typed in `src/stewardship/vacancy-coverage.ts`:

| State | Meaning in plain language |
| --- | --- |
| `unassigned` | No temporary receiver exists and none has been proposed. |
| `awaiting-human-decision` | The routing question is with a human. The system will not invent an answer or proceed automatically. |
| `temporarily-routed` | A recorded human decision designated a receiver. Routing, not occupancy: the post stays vacant; no authority is conferred. |
| `conflict-restricted` | The receiver has a declared conflict; routing is restricted until a human resolves it. |
| `suspended` | Routing suspended by recorded human decision. |
| `ended-by-appointment` | A recorded appointment ended the routing. |

Current state for all five posts: **`awaiting-human-decision`**.

## Rules

1. Temporary routing exists only with a recorded human decision, a named
   receiver reference, explicit scope boundaries, recusal requirements where
   applicable, and a review date. Validation rejects anything less.
2. No person is a receiver by default. This plan does not assign Maurice
   Jackson or anyone else; the decision packet proposes options for a human
   to choose among.
3. SOPHIA is never a receiver. All five posts are human posts.
4. Routing terminates upon appointment, structurally (`terminatesUponAppointment`
   is always true).
5. Temporary routing is receipt, not authority. A receiver may acknowledge,
   preserve, and escalate — the same observation-mode acts as anyone else.
   Treating temporary routing as occupancy is prohibited and machine-rejected.

## Until the decision is made

Incoming matters are still safe: records enter the destination post's
observation queue, remain open, appear in review packets as unresolved, and
urgent safety escalation routes per the escalation engine regardless of
coverage. What no one may do is pretend a receiver exists.

The decision itself: see
`docs/stewardship/decision-packets/VACANCY_COVERAGE_DECISION_PACKET.md`
(DRAFT — HUMAN DECISION REQUIRED — NOT ADOPTED).
