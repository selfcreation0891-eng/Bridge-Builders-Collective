# Steward Review Cadence Operating Guide

Status: Adopted as implementation standard — subordinate to canon
Authority: subordinate to the Charter §10 and
`CONTINUITY_CERTIFICATION_STANDARD.md`. Last updated: 2026-07-22

## The ratified cadence

| Review | Frequency | Convener (Charter §10) |
| --- | --- | --- |
| Observation review | Weekly | Continuity Steward post |
| Cross-post continuity review | Monthly | Continuity Steward post |
| Authority review | Quarterly | Institutional Steward post |

While the convening posts are vacant, convening is a responsibility awaiting
a human. The calendar can compute dates; only a human can hold a review.

## What the calendar does and does not do

`src/stewardship/review-calendar.ts` generates deterministic review dates
from a supplied anchor date (weekly every 7 days; monthly and quarterly on
the anchor's day-of-month, clamped to short months). It never reads the
clock, never notifies (the repository has no notification system and none
was invented), and never marks a review as held.

## A review event records

Review type; scheduled date; convener and convener state; required records;
participating posts; unresolved-item carryforward; conflict and recusal
declarations; evidence reviewed; recommendations drafted; decisions adopted
*by humans*; and the next review date. Validation requires held reviews to
record their evidence and participants.

## The rule that outranks the calendar

**A scheduled or completed meeting is not proof of continuity.** The
`certifiesContinuity` field is structurally `false` on every review event;
continuity certification follows `CONTINUITY_CERTIFICATION_STANDARD.md` —
evidence plus human review, recorded separately. Unresolved items carry
forward explicitly; nothing is dropped because a meeting happened.

## Templates

`docs/stewardship/templates/STEWARD_REVIEW_AGENDA_TEMPLATE.md` and
`STEWARD_REVIEW_OUTCOME_TEMPLATE.md`, with recusal declarations in
`STEWARD_RECUSAL_DECLARATION_TEMPLATE.md`.
