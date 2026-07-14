# Repository Completion Roadmap

## Phase A — Repository reconciliation
- **Objective:** resolve canonical structure blockers and repository boundary confusion.
- **Dependencies:** stewardship approval of audit findings.
- **Files affected:** `README.md`, canonical docs structure, malformed frontend path decision.
- **Work included:** approve canonical docs map, decide how to replace `frontend\README.md`, confirm retained root policy file locations.
- **Work excluded:** full frontend implementation.
- **Acceptance criteria:** canonical structure decisions are approved and documented.
- **Validation commands:** `git diff --check`, internal-link check.
- **Governance review:** required.
- **Estimated complexity:** medium.
- **Blocker status:** active.

## Phase B — Canonical truth and vocabulary
- **Objective:** approve canonical terms, ecosystem names, and trust-language boundaries.
- **Dependencies:** Phase A.
- **Files affected:** `docs/canon/*`, public copy specs.
- **Work included:** steward review of `CANONICAL_TERMS.md`, repo boundary, ecosystem registry.
- **Work excluded:** product UI implementation.
- **Acceptance criteria:** steward-approved vocabulary registry exists.
- **Validation commands:** internal-link check.
- **Governance review:** required.
- **Estimated complexity:** medium.
- **Blocker status:** active.

## Phase C — Public information architecture
- **Objective:** define the public-front-door content model and navigation system.
- **Dependencies:** Phases A-B.
- **Files affected:** README/public IA docs, future frontend route map.
- **Work included:** public home, principles, ecosystem explorer, trust-center IA, navigation plan.
- **Work excluded:** final deployment.
- **Acceptance criteria:** steward-approved IA and route inventory exists.
- **Validation commands:** documentation link check.
- **Governance review:** required.
- **Estimated complexity:** medium.
- **Blocker status:** active.

## Phase D — Frontend foundation repair or completion
- **Objective:** establish the real application root and baseline frontend structure.
- **Dependencies:** Phases A-C.
- **Files affected:** future frontend source tree and package manifest.
- **Work included:** select/confirm framework, create canonical app root, implement baseline pages and navigation shell.
- **Work excluded:** production activation.
- **Acceptance criteria:** app installs, builds, and serves locally with core routes.
- **Validation commands:** package-manager install, lint, typecheck, tests, build.
- **Governance review:** trust/accessibility review required.
- **Estimated complexity:** large.
- **Blocker status:** blocked until app-root decision.

## Phase E — Ecosystem registry and integration boundaries
- **Objective:** connect the public front door to adjacent ecosystem systems without duplication.
- **Dependencies:** Phases B-D.
- **Files affected:** public IA, boundary docs, integration surfaces.
- **Work included:** verified references for Archive, Academy, Rosetta Stone, SOPHIA, and external implementations.
- **Work excluded:** importing other applications wholesale.
- **Acceptance criteria:** every ecosystem reference has an approved boundary and owner.
- **Validation commands:** link check, content review.
- **Governance review:** required.
- **Estimated complexity:** medium.
- **Blocker status:** active.

## Phase F — Trust Center
- **Objective:** create the minimum public trust/governance surface.
- **Dependencies:** Phases B-E.
- **Files affected:** trust-center content and policy mapping.
- **Work included:** privacy, accessibility, AI boundaries, known limitations, readiness, change history.
- **Work excluded:** legal sign-off beyond reviewed scope.
- **Acceptance criteria:** reviewed Trust Center surface exists with explicit limitations.
- **Validation commands:** link check, content review.
- **Governance review:** required.
- **Estimated complexity:** medium.
- **Blocker status:** active.

## Phase G — Participation and contribution pathways
- **Objective:** implement safe public entry points.
- **Dependencies:** Phases C-F.
- **Files affected:** frontend forms/pages, process docs, consent materials.
- **Work included:** contact, contribution, partner, and participation flows.
- **Work excluded:** automated publication authority.
- **Acceptance criteria:** reviewed intake flows exist and route to human stewardship.
- **Validation commands:** lint, test, build, accessibility checks.
- **Governance review:** required.
- **Estimated complexity:** large.
- **Blocker status:** active.

## Phase H — Programs and public knowledge
- **Objective:** represent programs, media, stories, research, and public knowledge accurately.
- **Dependencies:** Phases C-G plus external content owners.
- **Files affected:** frontend content surfaces and supporting docs.
- **Work included:** approved program listings, public knowledge pages, partner/stories/research surfaces.
- **Work excluded:** private archive internals.
- **Acceptance criteria:** all public content has a verified source of truth and steward review path.
- **Validation commands:** lint, test, build, content review.
- **Governance review:** required.
- **Estimated complexity:** large.
- **Blocker status:** external dependency.

## Phase I — Supabase and governance verification
- **Objective:** build and verify backend support for consent, attribution, stewardship, and content-state handling.
- **Dependencies:** Phases D-G.
- **Files affected:** future Supabase config, migrations, functions, policies.
- **Work included:** schema, RLS, auth boundaries, consent/attribution workflow support.
- **Work excluded:** live-data migration without approved plan.
- **Acceptance criteria:** reviewed schema and runtime verification evidence exist.
- **Validation commands:** migration checks, tests, security review.
- **Governance review:** required.
- **Estimated complexity:** large.
- **Blocker status:** blocked until real backend assets exist.

## Phase J — Accessibility and responsive QA
- **Objective:** verify accessibility and mobile stability of implemented public surfaces.
- **Dependencies:** Phases D-I.
- **Files affected:** frontend routes, components, accessibility docs.
- **Work included:** keyboard, focus, semantic, contrast, reduced-motion, screen-reader, and mobile QA.
- **Work excluded:** unsupported conformance claims.
- **Acceptance criteria:** audit evidence exists for priority public routes.
- **Validation commands:** lint, tests, manual/automated accessibility checks, build.
- **Governance review:** accessibility review required.
- **Estimated complexity:** medium.
- **Blocker status:** blocked until frontend exists.

## Phase K — Security and privacy verification
- **Objective:** align public claims with actual technical controls.
- **Dependencies:** Phases F-I.
- **Files affected:** policy docs, backend config, frontend disclosures.
- **Work included:** privacy-rights handling, secret management, headers, route protection, logging review.
- **Work excluded:** legal determinations beyond reviewer authority.
- **Acceptance criteria:** security/privacy evidence supports published claims.
- **Validation commands:** security review, secret scan, tests, build.
- **Governance review:** legal + security review required.
- **Estimated complexity:** large.
- **Blocker status:** active.

## Phase L — Deployment and domain activation
- **Objective:** verify environments, domain, DNS, monitoring, and release flow.
- **Dependencies:** Phases D-K.
- **Files affected:** deployment config, CI, environment docs.
- **Work included:** environment setup, domain configuration, monitoring, release checks.
- **Work excluded:** public launch approval.
- **Acceptance criteria:** staging/production deployment path is verified.
- **Validation commands:** build, deploy-preview checks, monitoring smoke tests.
- **Governance review:** technical + stewardship review required.
- **Estimated complexity:** external dependency.
- **Blocker status:** blocked.

## Phase M — Controlled public pilot
- **Objective:** validate the public front door with a limited audience.
- **Dependencies:** Phases F-L.
- **Files affected:** launch docs, issue tracking, feedback surfaces.
- **Work included:** controlled rollout, limitation disclosure, feedback capture, steward review.
- **Work excluded:** unrestricted public activation.
- **Acceptance criteria:** pilot findings are documented and blockers resolved or accepted.
- **Validation commands:** pilot checklist, issue review, build/status verification.
- **Governance review:** required.
- **Estimated complexity:** medium.
- **Blocker status:** blocked.

## Phase N — Public activation
- **Objective:** approve and execute public launch.
- **Dependencies:** Phases A-M and T-0 gate completion.
- **Files affected:** launch status, public activation docs, final trust disclosures.
- **Work included:** steward approval, activation checklist completion, post-launch monitoring readiness.
- **Work excluded:** unreviewed feature expansion.
- **Acceptance criteria:** human steward marks activation approved and publicActivation can truthfully become `true`.
- **Validation commands:** final gate review, build, deployment verification.
- **Governance review:** human steward approval required.
- **Estimated complexity:** external dependency.
- **Blocker status:** blocked.
