# Participation Pathway Verification — v0.1.0

Verified: 2026-07-15 · Branch `activation/canonical-front-door-v0.1`

## What was sought

The smallest legitimate public participation pathway: contact form, interest form, updates form, or an
honest equivalent, working from submission to receipt.

## What exists (verified)

| Pathway | State | Evidence |
|---|---|---|
| Reading the public repository (all governance, standards, and site source) | WORKS — public | Repository fetched unauthenticated 2026-07-15; `repository_public: true` |
| Reading the front door (all 32 pages, trust center, statuses) | WORKS once deployed — built and link-validated locally | build + `validate:links` output |
| GitHub issue creation | DOES NOT WORK for the public | Issues page fetched 2026-07-15 shows "Issue creation is restricted in this repository" |
| GitHub Discussions | NOT ENABLED | No Discussions tab on repository (fetched 2026-07-15) |
| Contact email | DOES NOT EXIST | `[INSERT CONTACT EMAIL]` placeholders in TERMS_OF_SERVICE.md and ACCESSIBILITY_STANDARD.md; no address anywhere in repo |
| Web form | NOT BUILT — deliberately | No backend, no consent capture, no retention treatment, no spam protection, no follow-up ownership exist; building a form without them is prohibited by the activation rules and the Trust Center would have to lie about it |

## Decision

v0.1.0 ships a **truthful contact pathway page** (`/contribute/`) that says plainly: the repository is
readable now; posting is not open yet; opening a channel is a named steward action. No fake form, no
dead mailto, no restricted link presented as open.

## The gate

Phase 9 gate is met under its second clause: *"…or a clearly documented external dependency remains."*

**External dependency (B-EXT-7)** — responsible party: repository owner (Maurice). Choose at least one:
1. Enable public issue creation (GitHub → repo Settings → Features/Moderation), or
2. Enable GitHub Discussions, or
3. Publish a monitored contact email (fills `[INSERT CONTACT EMAIL]` in TERMS_OF_SERVICE.md and
   ACCESSIBILITY_STANDARD.md, plus the registry `contribution` entry and `/contribute/` page).

**Closure evidence required**: an unauthenticated fetch of the chosen channel showing a public
submission control, plus one test submission received. Then update the `contribution` environment's
pathways (`availableNow: true`, real `href`) and rebuild — tests enforce consistency.

## Data-collection guardrails (restated for the first real form)

Purpose statement, consent notice, privacy link, required-field clarity, success and error states,
storage/delivery destination, spam protection, retention treatment, and follow-up ownership must all
exist before any form ships. No sensitive health, trauma, identity, youth, or cultural data in the
initial public form.
