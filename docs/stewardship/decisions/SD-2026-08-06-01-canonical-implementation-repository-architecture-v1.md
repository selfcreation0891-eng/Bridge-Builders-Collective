# Adopted Steward Decision SD-2026-08-06-01

## Canonical and Implementation Repository Architecture v1

- Decision identifier: SD-2026-08-06-01
- Status: **Approved** (founder wording review completed with amendments,
  2026-08-06; committed after preservation PR #11 merged `main` at
  `9efce9c50bb17b62789431de99b0a362ecd669e3`)
- Authority: Founder and Canonical Steward (Maurice), per `CHANGE_AUTHORITY.md`
- Effective date: 2026-08-06 (Pacific)
- Decision source: `TWO_REPOSITORY_RECONCILIATION_AUDIT.md` (2026-08-06);
  founder countersign directive of 2026-08-06
- Review date: 2026-11-04 (90 days)

## 1. Repository roles

`selfcreation0891-eng/Bridge-Builders-Collective` is the **canonical
authority repository** for: identity; governance; the canonical ecosystem
registry; public vocabulary; environment and program statuses; steward
decisions; public-claims standards; and release requirements.

`selfcreation0891-eng/bridgebuilderscollective` is the **live Front Door
implementation repository**, deployed and synchronized by Lovable (project
`bridgebuilderscollective`, display name "Bridge Builders Ecosystem", full
verified Lovable project identifier
`a56e45b8-07ab-41f8-a76f-f8b144a3d76d`, workspace "Bridge Builders
Collective" `gQDsjkd3VhDCizHF6l7z`), serving `bridgebuilderscollective.com`.

The canonical repository's static/reference Front Door is **not a second
production deployment** and must not be published independently without a
separate recorded release decision.

## 2. Authority rule

The implementation repository consumes generated canonical artifacts; it
maintains no independent authority. Where implementation content conflicts
with canonical artifacts, the implementation is in error by definition
(Authority Order binding rule extended across repositories). In-app
operational tooling (including the Cornerstone surfaces) is operations
support only; decisions remain recorded in the canonical repository.

## 3. Synchronization requirements

The synchronization design (`CANONICAL_EXPORT_AND_DRIFT_DESIGN.md`) must
provide: a canonical registry export; a canonical identity export; an
explicit mapping between the canonical eight-status standard and the public
four-status vocabulary; drift detection in both repositories; CI failure
when implementation claims exceed canonical authorization; provenance
metadata identifying the canonical commit consumed; and a documented update
and rollback procedure.

The four-status public vocabulary is a **presentation mapping only**. It
does not replace, reduce, or redefine the canonical eight-status standard
(`ENVIRONMENT_STATUS_STANDARD.md`), which remains the sole status semantics.

**Release rule.** An implementation artifact may be temporarily stale during
ordinary development. Production publication is **blocked** whenever the
vendored artifact is stale relative to a canonical identity, registry,
status, or public-claims change. Unrelated canonical documentation commits
do not require an implementation artifact bump.

## 4. Protections

The current Lovable connection and live-domain configuration remain
untouched. A direct repository merge or framework migration is **not
authorized**; any future migration requires its own founder decision,
technical plan, rollback strategy, and verified release process.

## 5. What this decision resolves and does not resolve

Resolves the **structural** half of C-021 (the deployment-ownership
question) by legitimizing and governing the two-repository reality. Does
not resolve the **content** half of C-021: live-site conformance (identity
lead, status alignment, route classification) still requires evidence and
remains open until verified. Does not decide the consolidated identity
question (deferred C-022 item 6): Constitution §1 remains the canonical
lead identity; "multimedia stewardship platform" remains permitted
subordinate language; "multimedia knowledge institution" and "public
wellness" are not authorized to replace the canonical lead identity pending
the consolidated identity decision.

## 6. Rollback / amendment

Revisable only by a subsequent recorded founder decision. If synchronization
fails in practice, the implementation repository's last conforming state is
restored by reverting its artifact-bump commit; the canonical repository is
never altered to match implementation drift.
