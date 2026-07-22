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

Current state for all five posts: **`temporarily-routed`** — adopted by
SD-2026-07-22-02 (July 22, 2026): Maurice Jackson, founding steward, is the
temporary receiver of record. Routing, not occupancy; routed matters receive
a documented weekly review; self-conflict matters enter
independent-human-review-required; routing ends per post upon appointment or
a later adopted decision.

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

## How incoming matters flow now

Records enter the destination post's observation queue, the receiver of
record acknowledges and routes them, they appear in weekly review packets,
and urgent safety escalation routes per the escalation engine regardless of
coverage. A missed review changes nothing about an open matter, and nothing
the receiver does converts routing into post authority.

Decision history: proposal packet
`docs/stewardship/decision-packets/VACANCY_COVERAGE_DECISION_PACKET.md`
(receiver-of-record option adopted); adopted decision
`docs/stewardship/decisions/SD-2026-07-22-02-vacancy-coverage-receiver-of-record.md`.
