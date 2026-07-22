# Steward Operations Implementation Runbook

Status: Operational reference for maintainers and reviewers
Authority: implementation document; canon governs. Last updated: 2026-07-22

## Verifying the infrastructure

From the repository root (Node 22.18+):

```
npm run typecheck        # strict TypeScript, no emit
npm test                 # node --test tests/*.test.ts — includes dry-run scenarios
npm run validate:registry  # ecosystem registry invariants
npm run build            # generates dist/ including /stewardship/operations/
npm run validate:links   # every internal reference in dist/ resolves
```

All five must pass before merge. None of them deploys anything; deployment
remains a separate human act outside this repository's automation.

## Where things live

Code in `src/stewardship/` (one domain per module, each headed by its
authority citation); public surface in `src/site/stewardship-pages.ts`;
standards in `docs/stewardship/`; decision packets in
`docs/stewardship/decision-packets/`; templates in
`docs/stewardship/templates/`; tests in `tests/steward-*.test.ts`.

## Changing operational state (humans only)

To record a state change (for example, a human adopts vacancy routing):

1. Record the decision using the decision record template; commit it under
   `docs/stewardship/decisions/`.
2. Update the relevant current-state constant
   (`CURRENT_VACANCY_COVERAGE`, registry entries, or candidacy shells) in the
   same change, citing the decision record in the code comment.
3. Run the full verification suite; validators enforce that the new state
   carries the references the decision provides.
4. Append a continuity ledger entry / continuity doc recording the lineage.

There is no step where automation makes the decision. A pull request that
changes current-state constants without a decision record is invalid on its
face.

## External setup still required before live operation

- Human adoption of the four pending decision packets (vacancy coverage,
  candidacy sequencing, private storage designation, orientation reviewer
  designation) and resolution of C-014.
- Designation and configuration of the private candidate-record system
  (outside this repository; only the adapter interface lives here).
- Human appointment of stewards through the ratified process.
- A monitored contact pathway (already tracked as a pending steward action in
  the Trust Center).

## Failure modes to watch

- A new surface hard-coding post status instead of reading the registry —
  rejected by the duplicate-truth test; keep it that way.
- Fixtures drifting toward realistic personal data — the prohibited-field
  scan in tests is the backstop, not a license.
- "Temporary" states quietly becoming permanent — review dates and the
  quarterly authority review exist precisely to resurface them.
