# Steward Operations Registry Standard

Status: Adopted as implementation standard — subordinate to canon
Authority: the Permanent Steward Posts Charter and
`docs/canonical/CHANGE_AUTHORITY.md` outrank this standard and the registry
code. Last updated: 2026-07-22

## Purpose

One typed registry — `src/stewardship/steward-operations-registry.ts` — is the
single source of operational truth for the five Permanent Steward Posts.
Every operational surface reads it; no page, summary, packet, or test states
post status on its own authority.

## What the registry represents

For each post: post ID; canonical name; institutional state; occupancy state;
operating mode; human-only status; current occupant reference; vacancy
coverage (including temporary receiver state and reference); last and next
review dates; authority source; current authority scope; authority expansion
(always `none`); SOPHIA advisory status (always advisory, never decisional).
Open observation, handoff, escalation, and unresolved-decision counts are
*derived* from records at read time (`StewardOperationsCounts`) — counts are
never stored as truth.

## Rules

1. **Derived, never duplicated.** The registry derives from the ratified post
   registry (`steward-posts.ts`). Canonical names and authority sources are
   validated to match; a second hand-maintained copy of operational truth
   anywhere in the repository is a defect.
2. **Truthful current state.** As of SD-2026-07-22-01/-02: infrastructure
   status `adopted-active`; institutional state `active`; occupancy `vacant`;
   operating mode `observation-only`; occupant `null`; authority expansion
   `none`; SOPHIA decision authority `false`; vacancy coverage
   `temporarily-routed` to the founding steward as receiver of record
   (routing, never occupancy).
3. **Change requires recorded human decision.** Editing the registry's
   current-state values is a human act performed alongside an adopted steward
   decision per `CHANGE_AUTHORITY.md`. No automation, scheduled process, or
   AI session may do it.
4. **Occupancy discipline.** `occupied` requires a recorded appointment
   reference; `vacant` forbids one. An occupant reference naming SOPHIA is
   always invalid.
5. **Validation is the contract.** `validateOperationsRegistry` returns
   human-readable violations; CI runs it in the test suite. An empty result
   is the definition of a well-formed registry.

## Consumers

`src/site/stewardship-pages.ts` (public status surface), review-packet
preparation (`observation-queues.ts`), and the test suites. Future consumers
(an authenticated steward workspace) must read the same registry through the
same module.
