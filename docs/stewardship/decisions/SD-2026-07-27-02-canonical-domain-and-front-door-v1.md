# Adopted Steward Decision SD-2026-07-27-02

## Canonical Domain and Public Front Door v1

- Decision identifier: SD-2026-07-27-02
- Status: **Approved**
- Authority: Founder and Canonical Steward (Maurice), by written directive of
  2026-07-27 (Pacific), recorded per `docs/canonical/CHANGE_AUTHORITY.md`
- Effective date: 2026-07-27 (Pacific)
- Decision source: `docs/stewardship/decision-packets/CANONICAL_DOMAIN_DECISION_PACKET.md`
  (evidence gathered 2026-07-27; no repository evidence contradicts this decision)
- Review date: 2026-10-27 (with the Relational File Stewardship Standard review)

## 1. Canonical public domain

`bridgebuilderscollective.com` is the canonical public domain for Bridge
Builders Collective.

## 2. Canonical organizational email domain

`@bridgebuilderscollective.com` is the canonical organizational email domain.
Approved organizational addresses may include role-based addresses such as
`support@`, `academy@`, and `billing@bridgebuilderscollective.com`, and other
addresses approved through operations and stewardship. (This supplies the
canonical email domain that external blocker B-EXT-3 and the C-007 policy
placeholders have awaited; mailbox provisioning remains an operational task.)

## 3. Domain authority

The `Bridge-Builders-Collective` repository owns the canonical declaration
of: the public root domain; public environment routes; approved subdomains;
public destination mappings; canonical redirects; domain-related identity
language; and link-validation rules. External deployment systems implement
these decisions; they do not independently define canonical domain truth.

## 4. Root-domain function (front-door rule)

`bridgebuilderscollective.com` must serve the canonical Bridge Builders
Collective public front door. The root domain must not present a separate
competing identity, product, program, or technology platform as though it
were the whole organization. The public front door must lead with: the
canonical Bridge Builders Collective identity (Constitution §1); whom the
Collective serves; what changes through participation; why the connected
ecosystem matters; clear pathways into its environments and programs; human
stewardship and technology boundaries; and current participation
opportunities.

"Multimedia stewardship platform" may be retained only as subordinate
supporting language describing part of the digital experience; it must not
replace the canonical identity. "Living Systems Constitution" must not be
presented as the primary public identity unless separately adopted through
canonical governance; it may be described as a governance or constitutional
framework where accurate.

## 5. Subdomain policy

Subdomains are permitted only when they: serve a defined canonical
environment or operational function; inherit the Collective's identity and
trust requirements; are recorded in the canonical registry or an approved
deployment record; and do not create an independent or competing front door.

## 6. `.org` policy

The `.org` domain is not the active canonical organizational domain. Any
`.org` reference must be classified individually as historical,
redirect-only, deprecated, external, erroneous, or explicitly approved by a
separate decision. Historical evidence is never silently replaced; `.org` is
not used for new canonical public links or business email addresses. (Audit
2026-07-27: zero `bridgebuilders*.org` references exist in this repository.)

## 7. Deployment inheritance

Registry destinations, built sitemap/robots output (`PUBLIC_APP_URL`),
policy documents, email templates, external profiles, downstream
environments, and any payment or registration surfaces inherit the canonical
domain rule.

## 8. Exception process

Any non-canonical domain use requires a recorded steward approval under
`CHANGE_AUTHORITY.md` before publication.

## 9. Link validation

`npm run validate:links` remains the internal gate for generated output;
external destinations are reviewed against the registry at the standard
review cadence; domain evidence follows
`docs/DOMAIN_ACTIVATION_CHECKLIST.md` (this decision satisfies step 1;
steps 2–15 require their own evidence).

## 10. Change authority, rollback, and amendment

Domain changes are steward decisions under `CHANGE_AUTHORITY.md`, recorded
with evidence and version increment. This decision may be amended or
revoked only by a subsequent recorded founder decision; if the domain is
ever lost or retired, registry destinations revert to `null` and statuses
adjust per `ENVIRONMENT_STATUS_STANDARD.md` under the urgent-corrections
rule.

## What this decision resolves and does not resolve

- **Resolves C-018** (canonical domain undeclared) and governs all future
  public links and organizational email references.
- Establishes the front-door rule against which C-021 is reconciled
  (`docs/FRONT_DOOR_RECONCILIATION_SPEC.md`); it does **not** by itself
  declare the live site conformant, and C-021 remains open until the live
  root experience meets §4.
- Does **not** automatically approve every current route or public page.
- Does **not** approve the Synaptic Bridge registration or any registry
  status change (see `SYNAPTIC_BRIDGE_REGISTRATION_DECISION_PACKET.md`);
  it provides the domain authority that decision requires.
- Registrar ownership confirmation remains checklist step 1 evidence to
  attach (the live site serving the founder's content corroborates control;
  registrar records live outside this repository).
