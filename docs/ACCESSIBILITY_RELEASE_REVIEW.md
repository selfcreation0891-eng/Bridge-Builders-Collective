# Accessibility Release Review — v0.1.0

Reviewed: 2026-07-15 · Branch `activation/canonical-front-door-v0.1` · Scope: every page of the built front door (`dist/`, 32 pages).

## Automated checks (executed locally; see docs/VERIFICATION_EVIDENCE.md)

| Check | Method | Result |
|---|---|---|
| `lang` attribute, `<title>`, meta description on every page | `tests/routes.test.ts` | PASS (32/32) |
| Skip-to-content link and `<main>` landmark on every page | `tests/routes.test.ts` | PASS |
| Exactly one `<h1>` per page; no `<h3>` before `<h2>` | `tests/routes.test.ts` | PASS |
| Status badges always carry text (never color alone) | `tests/routes.test.ts` | PASS |
| No banned/manipulative CTA text, no placeholders | `tests/routes.test.ts` | PASS |
| Internal link integrity (no dead links) | `scripts/validate-links.ts` | PASS (1,109 references) |

## Manual checks (structural review of source and rendered HTML)

- Semantic headings and landmarks: header/nav/main/footer used consistently — PASS
- Keyboard navigation: all interactive elements are native links/`<summary>`; visible `:focus-visible` outlines — PASS
- Meaningful link labels: no "click here"; mobile menu summary has `aria-label` — PASS
- Images: the only non-text glyphs are decorative emoji inside headings/link text; no `<img>` elements are used — PASS (no missing alt attributes possible)
- Forms: no forms exist in v0.1.0 (deliberate; see participation pathway verification) — N/A
- Error messaging: no forms; 404 page is clear and oriented — PASS
- Contrast: ink #24312e on paper #faf8f4 ≈ 12.9:1; secondary #4c5a56 ≈ 7.4:1; accent #2f5d50 on white ≈ 7.0:1 — PASS (WCAG AA/AAA for text)
- Text resizing: all sizes in rem; layout uses max-width in rem/ch — PASS
- Reduced motion: `prefers-reduced-motion` disables all animation/transitions (none are essential) — PASS
- Touch targets: nav and CTA elements min-height 44px — PASS
- Mobile navigation: no-JavaScript `<details>` menu at ≤720px, same registry-generated items as desktop (tested) — PASS
- Horizontal overflow: fluid layout, `max-width:100%` images, grid `minmax` — PASS (structural; see limitations)
- Hover-only interactions: none — PASS
- Autoplaying audio / flashing content: none exists — PASS
- Status not conveyed by color alone: badge glyph + text label — PASS

## Unresolved concerns / limitations (non-critical, recorded honestly)

1. No human screen-reader (NVDA/VoiceOver) session has been run — structural checks only. Remediation: steward or contributor performs a screen-reader pass before or shortly after domain activation.
2. No real-device mobile test (sandbox has no browser); mobile behavior verified structurally via CSS review at 380–720px breakpoints. Remediation: steward opens the preview deployment on a phone (checklist item in `docs/DOMAIN_ACTIVATION_CHECKLIST.md`).
3. Automated axe-core/Lighthouse audits could not run locally (npm registry blocked — blocker B-EXT-2). Remediation: run in CI once pushed (job included in `.github/workflows/ci.yml` as a non-blocking step) or locally by the steward.
4. English-only content.

## Verdict

No known critical accessibility failures. Remaining items are documented, non-critical, and assigned.
