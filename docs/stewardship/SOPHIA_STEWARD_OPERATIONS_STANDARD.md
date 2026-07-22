# SOPHIA Steward Operations Standard

Status: Adopted as implementation standard — subordinate to canon
Authority: subordinate to the Bridge Builders Constitution §9 and the
Charter. Last updated: 2026-07-22

## What SOPHIA may contribute to steward operations

Exactly seven contribution kinds, enumerated in
`src/stewardship/sophia-advisory-operations.ts`: evidence summaries;
contradiction detection; missing-context identification; record
organization; draft recommendations; handoff-packet preparation; and
questions requiring human judgment.

## What SOPHIA may never do

Occupy a post. Vote. Decide. Appoint. Approve. Reject. Publish. Merge.
Deploy. Grant access. Alter records. Change permissions. Certify. Close
escalations. Communicate advisory output as an adopted decision. These are
not policy aspirations — `validateSophiaOutput` rejects output whose text
claims approval, ratification, appointment, authority, final determination,
certification, escalation closure, deployment authorization, or publication
authorization, and the record, handoff, and escalation validators
independently reject SOPHIA as an acknowledger, closer, receiver, reviewer,
decision authority, or occupant.

## The required notice

Every SOPHIA artifact must visibly state, verbatim:

> SOPHIA advisory output is not an adopted steward decision. Human review and
> recorded authority are required before consequential action.

The notice is a validated field (`requiredNotice`); output without it, or
with an altered version of it, is invalid. Surfaces that print SOPHIA output
render it via `sophiaAdvisoryFooter()`.

## The shape of advisory output

Typed as `SophiaAdvisoryOutput`: observed evidence; detected pattern;
uncertainty (preserved, never converted into confidence); advisory
interpretation (labeled as such); recommendation *options* — plural,
possibilities for a human to weigh, never a verdict; recommended human
review; human decision status (which can only ever be awaiting review, in
review, or recorded-elsewhere-by-humans); and the required notice.

## Relationship to the posts

SOPHIA supports all five posts and occupies none. Its output enters the same
queues as any observation, classified and validated the same way, waits for
human acknowledgment the same way, and carries one extra structural
property: it can never be the thing that closes, decides, or acts.
