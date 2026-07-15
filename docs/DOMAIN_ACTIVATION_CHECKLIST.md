# Domain Activation Checklist (provider-neutral)

Responsible party: steward (Maurice). None of these steps can be completed from inside the repository;
each requires the registrar, DNS, or hosting provider. Record evidence for every step.

1. **Confirm canonical domain** — steward decision; record it as an adopted steward decision and set
   `PUBLIC_APP_URL`. Evidence: decision note + registrar record.
2. **Confirm deployment target** — choose the static host (see matrix). Evidence: hosting project created,
   connected to this repository, building `main` with `npm run build` → `dist/`.
3. **Obtain required DNS values** — from the host (A/AAAA/ALIAS/CNAME targets or nameservers).
4. **Configure DNS** — create the records at the registrar/DNS provider.
5. **Verify ownership** — complete the host's domain-verification (TXT record) if required.
6. **Enable HTTPS** — issue/attach the certificate; confirm no mixed content (site has none: one CSS file, no external assets).
7. **Set canonical URL** — set `PUBLIC_APP_URL` in the host's build environment; rebuild; confirm `sitemap.xml` and `robots.txt` contain the canonical origin.
8. **Redirect alternate hostnames** — 301 apex↔www (and any legacy hosts) to the canonical origin.
9. **Verify sitemap URL** — fetch `https://<domain>/sitemap.xml`; entries must match `/sitemap/` page.
10. **Verify robots configuration** — fetch `/robots.txt`; `Allow: /` plus Sitemap line.
11. **Verify social-preview metadata** — pages ship title + meta description; add Open Graph tags in a follow-up if desired (recorded as post-release improvement, not a blocker).
12. **Verify mobile access** — open `/`, `/ecosystem/`, `/trust/`, `/contribute/` on a real phone; check the ≤720px menu and no horizontal overflow (closes accessibility limitation #2).
13. **Verify trust routes** — `/trust/` and `/accessibility/` reachable and complete over HTTPS.
14. **Verify participation submission** — only after B-EXT-7 is closed (open a channel, test one submission end-to-end, then update the registry `contribution` entry).
15. **Record final production evidence** — URLs, dates, screenshots, and DNS records appended to `docs/VERIFICATION_EVIDENCE.md`; only then may any environment status move to `public`.

Domain activation may not be claimed complete until every step above has externally verifiable evidence.
