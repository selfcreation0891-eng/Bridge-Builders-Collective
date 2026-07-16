# Preview Deployment Review — v0.1.0

Complete this review on the FIRST preview deployment (after CI passes, before any merge decision).
Every check requires: pass/fail, tested URL, device/browser, evidence (screenshot or note), and the
correction needed if failed. Do not mark a check passed without looking.

| # | Check | Pass/Fail | Tested URL | Device/Browser | Evidence | Correction needed |
|---|---|---|---|---|---|---|
| 1 | Homepage loads | | `<preview>/` | | | |
| 2 | All 16 required routes load (`/`, `/ecosystem/`, `/principles/`, `/academy/`, `/archive/`, `/rosetta/`, `/sophia/`, `/programs/`, `/community/`, `/stewardship/`, `/public-knowledge/`, `/research/`, `/contribute/`, `/trust/`, `/accessibility/`, `/sitemap/`) | | each | | | |
| 3 | Mobile menu works (≤720px, opens via Menu, all 7 items navigate) | | `<preview>/` | real phone | | |
| 4 | Desktop navigation works (all 7 header items) | | `<preview>/` | | | |
| 5 | Footer matches the registry (Ecosystem: Rosetta/Academy/Living Archive/SOPHIA; Participate: Programs/Community Stewardship/Contribution/All environments; Trust group) | | any page | | | |
| 6 | Sitemap page lists 31 pages; `/sitemap.xml` present once `PUBLIC_APP_URL` is set | | `<preview>/sitemap/` | | | |
| 7 | Status labels truthful (nothing shows "Available now" at v0.1.0) | | `<preview>/ecosystem/` | | | |
| 8 | No internal environments appear anywhere public | | `<preview>/ecosystem/`, footer, sitemap | | | |
| 9 | Trust Center loads with all 14 areas + honest draft/adopted statuses | | `<preview>/trust/` | | | |
| 10 | Accessibility page loads incl. known limitations | | `<preview>/accessibility/` | | | |
| 11 | Contribution page accurately states current limits (no open submission channel; repository read-only pathway) | | `<preview>/contribute/` | | | |
| 12 | No dead buttons/links (click every CTA; external links open the public repository) | | all | | | |
| 13 | No placeholder text (`[INSERT`, TODO, lorem) | | all | | | |
| 14 | No localhost/preview-host links in page content | | view-source | | | |
| 15 | No missing images (site uses no `<img>`; confirm no broken icon rendering) | | all | | | |
| 16 | No horizontal overflow on mobile (320–420px widths) | | `/`, `/ecosystem/`, `/trust/` | real phone | | |
| 17 | Keyboard navigation works (Tab through header, cards, footer; Enter activates) | | `/` and `/ecosystem/` | desktop | | |
| 18 | Focus states visible on every interactive element | | same | | | |
| 19 | Browser title and meta description correct per page | | spot-check 5 pages | | | |
| 20 | 404 page works (visit `<preview>/does-not-exist/`) | | | | | |
| 21 | HTTPS works in preview (padlock, no mixed content) | | any | | | |

Reviewed by: ______  Date: ______  Preview URL: ______  Commit SHA: ______
