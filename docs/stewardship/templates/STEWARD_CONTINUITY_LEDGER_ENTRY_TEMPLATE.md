# Continuity Ledger Entry — Template

> The ledger is append-only. A correction appends a new entry naming what it
> supersedes; the superseded entry is never edited or deleted. References
> are privacy-safe — record IDs, decision paths, `private-record://`
> pointers — never personal data. Typed mirror:
> `src/stewardship/continuity-ledger.ts`.

- Sequence (assigned at append; never renumbered):
- Kind (observation-lineage / handoff-lineage / escalation-lineage /
  decision-reference / unresolved-commitment / consent-reference /
  succession-risk / single-person-dependency / record-location-reference /
  review-history / correction):
- Recorded at (date):
- Originating post (or founding-steward / sophia-advisory):

## What this entry preserves

One privacy-safe paragraph a future steward can act on: what happened, what
it connects to, and what would be lost if this entry did not exist.

## References

- Record / decision / document references:
- If kind is correction — supersedes sequence: (the earlier entry remains
  readable; this entry states what was wrong and what is right)

## Unresolved

Anything this entry knowingly leaves open, so it can be found again.
