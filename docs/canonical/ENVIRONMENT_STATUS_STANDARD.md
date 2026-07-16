# Environment Status Standard

Version 1.0 — 2026-07-15. Authority level 5. The only statuses an environment may carry:

| Status | Public meaning | Required evidence | Permitted calls to action | Access notice | Trust notice | Destination URL publishable | Prohibited claims |
|---|---|---|---|---|---|---|---|
| `public` | Available now to anyone | deployed + publicly accessible | Visit, participate, contribute | optional | required | required (must exist) | none beyond evidence |
| `public-preview` | Visible now, explicitly incomplete | deployed preview | Explore preview, give feedback | required ("preview") | required | yes | completeness, production-readiness |
| `steward-pilot` | Being tested with stewards | pilot record | Express interest | required | required | no (unless pilot-gated link) | public availability |
| `invitation-required` | Working, access by invitation | deployed + invite flow | Request invitation | required (how access works) | required | optional | open availability |
| `in-development` | Being built now | committed implementation work | Follow progress, share interest | required | optional | no | availability, outcomes |
| `internal` | Steward/operations only | — | none (not shown publicly) | n/a (hidden) | n/a | never | any public claim |
| `planned` | Adopted intention, not yet built | adopted steward decision | Share interest | required | optional | no | existence of software |
| `archived` | Preserved, no longer active | archival record | View record (if public) | required | optional | historical only | activity |

Rules: `internal` environments never appear in public navigation, cards, or the sitemap. `archived` environments never appear as active. Status changes are steward decisions recorded per `CHANGE_AUTHORITY.md`, with evidence class per `PUBLIC_CLAIMS_STANDARD.md`.
