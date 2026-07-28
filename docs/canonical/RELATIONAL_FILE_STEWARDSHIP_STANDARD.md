# Relational File Stewardship and Self-Audit Standard

## Document metadata

| Field | Value |
|---|---|
| Status | Canonical (subordinate canonical standard) |
| Owner | Bridge Builders Collective |
| Scope | Ecosystem-wide |
| Authority | Governance — authority level 5 per `ECOSYSTEM_AUTHORITY_ORDER.md` |
| Version | 1.0 |
| Effective date | 2026-07-28 |
| Last reviewed | 2026-07-28 |
| Next review | 2026-10-28 (quarterly, or upon any structural change) |
| Ratification | Adopted steward decision SD-2026-07-28-01 (`docs/stewardship/decisions/`), recording the founding steward's written directive of 2026-07-28 |
| Responsible steward | Founding steward (Maurice); Continuity Steward post advises when occupied |
| Related canonical files | `BRIDGE_BUILDERS_CONSTITUTION.md`, `ECOSYSTEM_AUTHORITY_ORDER.md`, `CHANGE_AUTHORITY.md`, `CANONICAL_VOCABULARY.md`, `ECOSYSTEM_REGISTRY_STANDARD.md`, `ENVIRONMENT_STATUS_STANDARD.md`, `PUBLIC_CLAIMS_STANDARD.md`, `docs/CANONICAL_CONFLICT_REGISTER.md`, `docs/COMPLETION_LEDGER.md`, `docs/stewardship/templates/ARTIFACT_STEWARDSHIP_AUDIT_TEMPLATE.md` |

## 1. Purpose

This standard creates one self-auditing discipline that continuously places every file, concept, prompt, design, repository artifact, curriculum component, operational document, and public asset into its correct relational project and completion scope.

It exists to prevent: duplicated work; disconnected projects; conflicting terminology; misplaced files; outdated versions appearing current; unfinished work presented as complete; new projects created when the work belongs inside an existing project; public-facing content drifting from canonical governance; overlooked dependencies; and important work becoming lost inside conversation history.

The guiding rule: **every artifact must have a home, a relationship, a status, an authority level, and a next action.**

## 2. Scope

This standard applies to every artifact produced for or within the Bridge Builders ecosystem, in any repository, storage system, design tool, AI conversation, or working environment. It governs classification, relation, review, creation, movement, merging, archiving, deprecation, and completion of artifacts. It does not govern environment status (see `ENVIRONMENT_STATUS_STANDARD.md`), public claims (see `PUBLIC_CLAIMS_STANDARD.md`), or record privacy classes (see `docs/stewardship/STEWARD_RECORD_CLASSIFICATION_STANDARD.md`); it composes with them.

## 3. Authority

This is a subordinate canonical governance standard at authority level 5, alongside `CANONICAL_VOCABULARY.md` and `PUBLIC_CLAIMS_STANDARD.md`. It never outranks the Constitution, adopted steward decisions, or canonical principles. Where this standard and the canonical ecosystem registry differ on the existence, name, status, or relationships of an ecosystem environment, the registry governs (`ECOSYSTEM_REGISTRY_STANDARD.md`). Changes to this standard follow `CHANGE_AUTHORITY.md` and require founding-steward approval.

## 4. Canonical project architecture

Every artifact is assigned first to one primary canonical home. The authoritative list of ecosystem environments and their relationships is the canonical ecosystem registry (`src/ecosystem/ecosystem-registry.ts`). This section describes stewardship ownership domains; it does not add, rename, or re-status any registry entry.

**A. Bridge Builders Collective** — the umbrella organization and public identity. Owns organizational identity, mission and public language, the front-door website, ecosystem navigation, organizational architecture, community participation pathways, partnerships, public trust information, contribution pathways, sponsorship and institutional communication, the shared design system, and the canonical project registry. Canonical repository: `Bridge-Builders-Collective` (this repository) — the authoritative source for public identity, navigation, shared terminology, ecosystem relationships, and front-door presentation (`docs/FRONT_DOOR_BOUNDARY.md`).

**B. BridgeBuilders Academy** — the education, capability-building, and participant-development environment. Owns courses, curriculum, onboarding, learning pathways, cohort structures, STEAM programming, facilitator materials, workbooks, session kits, participant progress structures, research-informed curriculum updates, and youth and adult learning programs. Registered branches that deliver learning (for example the Institute of Emotional Intelligence, Story Circle learning pathways, Pattern Sync for Self Build) have their educational components owned here.

**C. The Living Archive** — the long-term memory, cultural record, and stewardship environment. Owns submitted stories, oral histories, photography, community knowledge, wisdom nodes, archival metadata, contribution records, stewardship review, lineage records, preservation standards, archive governance, and public knowledge records. Artifacts enter the archive only when their source, context, consent, stewardship status, and relationship are known (Constitution §7, §5).

**D. System Rosetta Stone** — the meaning, language, orientation, and relationship layer. Owns human-meaning explanations, terminology maps, multilingual relationships, semantic graphs, concept relationships, interpretive pathways, visual relationship explorers, cross-project language alignment, and adaptive explanations. The Rosetta layer explains and relates concepts owned by their primary projects; it does not become the canonical owner of every concept. (The source protocol's working name "Rosetta Systems" is a non-canonical alias — see conflict C-015.)

**E. SOPHIA** — the advisory intelligence and continuity layer. Owns orientation assistance, ecosystem navigation support, continuity support, advisory synthesis, knowledge retrieval, steward-facing observations, relational recommendations, and review support. SOPHIA does not replace human judgment, professional care, community authority, governance decisions, consent, or stewardship review, and may not independently redefine canonical truth (Constitution §9).

**F. Media (BRIDGEview)** — the storytelling, publishing, visibility, and communication layer, registered as the BRIDGEview media branch. Owns editorial content, public stories, photography, video, social campaigns, podcast and interview content, campaign assets, launch media, and public educational media. Media assets must remain connected to the program, project, person, event, or archive record they represent. (Proposed media properties not in the registry — for example USvision — are classified Proposed until registered; see §12.)

**G. Programs** — delivered experiences inside the ecosystem (for example Sun Reset, Story Circle, Resonate Touch, Savage2Steward, and proposed programs such as Seed to Soup or STEAM programming). Programs are not automatically independent organizations or repositories. Each program must identify: organizational owner; educational owner; operational owner; public presentation location; archive relationship; research relationship; payment or registration relationship; and governance requirements.

**H. Research and Public Knowledge** — owns literature reviews, research briefs, evidence summaries, institutional sources, scientific references, community research, methodology, research limitations, the distinction between established and preliminary findings, and curriculum-update recommendations. Research informs programs and curriculum but does not silently overwrite them.

**I. Operations and Stewardship** — owns operating procedures, launch checklists, governance workflows, approval flows, role definitions, risk registers, compliance, financial operations, payment administration, communication workflows, partner management, review packets, and continuity plans. The steward-post infrastructure under `docs/stewardship/` and `src/stewardship/` lives here.

**J. Independent or participating systems** — products such as CloseOne Flow remain separate products or participating systems unless formally adopted into the Bridge Builders Collective architecture through a documented architecture decision recorded per `CHANGE_AUTHORITY.md`. They may share stewardship principles, templates, governance patterns, Rosetta explanations, and operational standards. They must not be blended into the canonical public repository without that explicit decision.

## 5. Mandatory artifact classification

Every artifact receives these fields (the reusable form is `docs/stewardship/templates/ARTIFACT_STEWARDSHIP_AUDIT_TEMPLATE.md`):

**Identity** — artifact name; plain-language description; artifact type; date created; date last reviewed; creator or source.

**Ownership** — primary canonical project (§4); secondary related projects; responsible steward; repository or storage location; intended audience.

**Authority** — exactly one of:

| Authority level | Meaning |
|---|---|
| Canonical | The approved source of truth. Requires registry/index support (§9) — a file may not claim canonical authority on its own. |
| Operational | Used to run current work; does not define ecosystem-wide truth. |
| Supporting | Provides research, explanation, examples, or evidence. |
| Draft | Still under development. |
| Reference | Retained for context; not actively implemented. |
| Archived | Preserved as historical material. |
| Deprecated | Replaced; no longer suitable for active use. |
| Quarantined | Contains unresolved conflict, risk, uncertain ownership, or incorrect architecture. |

This artifact-authority taxonomy is distinct from, and does not replace, environment statuses (`ENVIRONMENT_STATUS_STANDARD.md`) or record privacy classes (`STEWARD_RECORD_CLASSIFICATION_STANDARD.md`).

## 6. Scope classification

Every file is assigned one or more precise scopes: identity; governance; public website; program; curriculum; research; media; archive; technology; operations; finance; partnership; community; stewardship; legal or compliance; design system; communications; launch; historical reference. A file may not be classified only as "Bridge Builders" when a more precise scope is available.

## 7. Relational audit

Before approving, creating, or relocating an artifact, determine: **parent relationship** (what larger project, program, system, or objective it belongs to); **child relationships** (what files, components, pages, lessons, workflows, or records depend on it); **peer relationships** (what other artifacts address the same subject); **dependency relationships** (what must exist before it can function); **public relationship** (where the public encounters it); **operational relationship** (who uses it to deliver work); **archive relationship** (what should eventually be preserved); **governance relationship** (who approves changes); and **completion relationship** (what larger milestone it advances).

## 8. Duplicate and conflict handling

Each audit must search for: duplicate names; duplicated functions; nearly identical documents; competing canonical statements; conflicting program descriptions; conflicting pricing; conflicting route structures; old domains; inconsistent organization names; domain references that do not match the confirmed canonical domain (see the open domain decision, `docs/DOMAIN_ACTIVATION_CHECKLIST.md` step 1 and conflict C-018); contradictory governance; abandoned drafts still presented as active; multiple repositories claiming the same authority; designs that do not follow the canonical design system; curriculum content separated from its program; prompts that recreate completed work; and ideas that should be nested within an existing program.

When a conflict is found, it is never casually merged. It is recorded in `docs/CANONICAL_CONFLICT_REGISTER.md` per `CHANGE_AUTHORITY.md`, and receives exactly one disposition: **preserve canonical; merge into canonical; extract useful content; replace; archive; deprecate; or quarantine for steward decision.** No conflict may simply disappear.

## 9. Completion status

Every artifact receives one status: **Proposed** (an idea without an approved scope); **Scoped** (role and owner defined); **In development**; **Integrated** (connected to its parent project and dependencies); **Validated** (reviewed for content, technical function, governance, and relationship accuracy); **Ready for controlled use**; **Production ready**; **Live**; **Blocked** (cannot advance until a named dependency is resolved); **Superseded**; **Archived**.

"Built" does not mean "complete." Completion requires: correct ownership; correct placement; relational integration; terminology alignment; dependency resolution; validation; governance review where required; a working public or operational pathway; and a documented next stewardship responsibility. Public statements about completion additionally carry the evidence class required by `PUBLIC_CLAIMS_STANDARD.md` — *architecture exists ≠ software exists ≠ software builds ≠ deployed ≠ publicly available ≠ production-ready*.

## 10. Required self-audit questions

Before any work is declared complete, answer internally:

1. What canonical project owns this?
2. Does this already exist somewhere else?
3. Is this a project, program, component, file, feature, or idea?
4. Is a new repository actually necessary?
5. Does it use current canonical vocabulary (`CANONICAL_VOCABULARY.md`)?
6. Does it belong in the front door, Academy, Archive, Rosetta, SOPHIA, Media, Research, Operations, or an independent system?
7. What does it connect to?
8. What depends on it?
9. Is it canonical, operational, supporting, draft, reference, archived, deprecated, or quarantined?
10. What is missing for completion?
11. Does it create a public promise that operations cannot yet fulfill?
12. Does it conflict with an existing approved artifact?
13. Does it require human stewardship or professional review?
14. Has its next action been clearly assigned?
15. Can another person understand where it belongs without relying on conversation history?

If these questions cannot be answered, the artifact is not complete.

## 11. Standard audit output and file placement logic

Whenever a meaningful artifact or group of files is reviewed, the output includes: artifact (name and description); canonical home; related systems; authority status; completion status; conflicts found; missing dependencies; required action; and steward decision (only when human judgment or approval is required). The reusable form is `ARTIFACT_STEWARDSHIP_AUDIT_TEMPLATE.md`.

Placement order: identify what the artifact does; whom it serves; which project has authority over that function; whether it changes canonical truth or only supports it; its relationship to public presentation, program delivery, and archival continuity; its operational dependencies; its governance requirements. Then place it in the narrowest correct scope, add references from related projects rather than duplicating the file, and record its status and next action.

**One source, multiple views.** Canonical content lives once; related systems reference it; public pages render approved portions; the Rosetta layer explains it; SOPHIA helps people navigate it; the Academy teaches it; Media communicates it; The Living Archive preserves its evolution; Operations implements it; governance controls changes. Hand-written copies of canonical truth are defects (`ECOSYSTEM_REGISTRY_STANDARD.md` consumption rule).

## 12. New idea intake rule

Every new idea passes through an intake check before becoming a new project. Determine whether it is: a new organization; a new program; a course; a program module; a media campaign; a research topic; an archive collection; a software feature; an operational workflow; a product; a community event; or a supporting artifact.

Default assumption: **the idea belongs within an existing project** until evidence shows it requires independent governance, operations, audience, funding, technology, and continuity. An idea that names a new ecosystem environment enters the canonical registry only through a steward decision per `ECOSYSTEM_REGISTRY_STANDARD.md`; until then its artifacts carry completion status Proposed.

## 13. Conversation-to-system rule

Conversation history — including AI conversation history — is a development environment, not a permanent source of truth. When a decision becomes stable, it must be converted into one of: a canonical registry entry; a governance document; a program specification; a curriculum document; a repository issue; an implementation task; an architecture decision record; an operational procedure; an archive record; or a project status update. Important decisions made in conversation must not remain only in conversation.

## 14. Completion ledger

Each canonical project maintains a completion ledger. The ecosystem ledger is `docs/COMPLETION_LEDGER.md`. Every ledger entry assigns: canonical project; precise scope; authority level; lifecycle status; completion status; dependencies; conflicts; next action; responsible steward; and last verified date. Ledgers distinguish content completion, design completion, technical completion, operational completion, governance completion, and public launch readiness. The ledger records completion state; it does not itself confer authority (the registry and this standard's §5 do). The append-only steward continuity ledger (`src/stewardship/continuity-ledger.ts`) remains a separate instrument for stewardship lineage.

## 15. Repository boundary rules

1. The `Bridge-Builders-Collective` repository is the canonical public and relational front door (`docs/FRONT_DOOR_BOUNDARY.md`). No active front-door source may be maintained outside it.
2. Separate products or systems (for example CloseOne Flow) remain separate unless formally adopted through a documented architecture decision recorded per `CHANGE_AUTHORITY.md`. Sharing patterns is welcome; blending repositories is not.
3. Generated views (build output, exports, rendered pages) are never edited as sources; they are regenerated from canonical sources.

## 16. Standing instructions for AI assistance

For every Bridge Builders request, an AI session must:

1. Interpret the request relationally.
2. Identify the canonical project before creating new work.
3. Reuse existing architecture when appropriate.
4. Flag conflicts with prior decisions.
5. Separate concept creation from implementation completion.
6. State what is known, inferred, missing, and unverified.
7. Avoid declaring completion without evidence (`PUBLIC_CLAIMS_STANDARD.md`).
8. Produce the artifact in the correct scope.
9. Name dependencies and next actions.
10. Preserve human authority for governance and stewardship decisions (Constitution §8–§9).
11. Update the ecosystem model only when an approved structural change occurs.
12. Keep Bridge Builders Collective as the canonical public and relational front door.

These instructions elaborate, and never override, `CLAUDE.md` and the Constitution's human-authority boundaries.

## 17. Change control and steward approval

Amendments to this standard follow `CHANGE_AUTHORITY.md`: anyone may propose; founding steward(s) approve; changes are recorded with date, rationale, and version increment, and reconciled in the conflict register where they touch existing canon. Dispositions of Quarantined artifacts, adoption of independent systems, canonical-domain confirmation, registry additions, and vocabulary additions are steward decisions and are never made silently by an audit.

## 18. Core completion principle

A project is not complete because its files exist. A project is complete when: its purpose is clear; its files are correctly placed; its relationships are documented; its dependencies function; its language is aligned; its public pathway works; its operational pathway works; its governance is defined; its risks are acknowledged; and its stewardship can continue without depending on one conversation or one person's memory.

Nothing orphaned. Nothing falsely finished. Nothing duplicated without purpose. Everything relationally placed and stewarded toward completion.
