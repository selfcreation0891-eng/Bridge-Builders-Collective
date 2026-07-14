# T-0 Activation Gate

| Gate | Current status | Evidence | Blockers | Responsible role | Decision authority | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| 1. Canonical repository confirmed | partial | `docs/audit/CANONICAL_REPOSITORY_DECISION.md` | steward approval still required | repository steward | human steward | approve or amend canonical decision |
| 2. Existing architecture understood | complete | `docs/audit/TECHNICAL_ARCHITECTURE_AUDIT.md` | none for understanding; implementation still absent | technical steward | repository steward | use audit as implementation baseline |
| 3. Documentation canon reconciled | partial | `docs/audit/DOCUMENTATION_CANON_AUDIT.md` | reconciliation is documented, not executed | documentation steward | human steward | approve canonical docs map |
| 4. Canonical terminology reviewed | partial | `docs/audit/CANONICAL_LANGUAGE_AUDIT.md`; `docs/canon/CANONICAL_TERMS.md` | pending steward confirmation for several terms | stewardship lead | human steward | approve term registry |
| 5. Ecosystem boundaries approved | partial | `docs/audit/ECOSYSTEM_BOUNDARY_MAP.md`; `docs/canon/REPOSITORY_BOUNDARY.md` | no human approval yet | ecosystem steward | human steward | approve boundary model |
| 6. Public frontend completed | blocked | `docs/audit/FRONTEND_AUDIT.md` | no frontend exists | frontend lead | repository steward | establish canonical app root |
| 7. Navigation completed | blocked | no implementation | no frontend/app IA | frontend lead | repository steward | design and implement site navigation |
| 8. Programs represented accurately | blocked | no implementation | program source of truth absent | program steward | human steward | define verified program inventory |
| 9. Participation pathways completed | blocked | no implementation | no intake flow or contact path | community steward | human steward | implement reviewed participation entry points |
| 10. Trust Center minimum published | blocked | root policy docs only | no Trust Center surface | trust/governance steward | human steward | create reviewed Trust Center IA |
| 11. Privacy reviewed | blocked | `PRIVACY_POLICY.md`; policy alignment audit | no legal/technical review proof | legal + privacy steward | qualified human reviewer | review and align privacy claims |
| 12. Terms reviewed | blocked | `TERMS_OF_SERVICE.md` | no legal review proof | legal steward | qualified human reviewer | review terms |
| 13. Licensing reviewed | blocked | `BRIDGE_BUILDERS_LICENSE.md`; `MEDIA_LICENSING_POLICY.md` | custom license and media rights need review | legal steward | qualified human reviewer | review licensing scope |
| 14. Consent workflow verified | blocked | conceptual only | no consent system exists | governance + technical steward | human steward | define consent workflow and evidence |
| 15. Attribution workflow verified | blocked | conceptual only | no attribution system exists | archive steward | human steward | define attribution workflow |
| 16. Steward review workflow verified | blocked | conceptual only | no steward tooling/process implementation | stewardship lead | human steward | implement steward review flow |
| 17. Accessibility review completed | blocked | accessibility audit shows no UI | no frontend to review | accessibility reviewer | human reviewer | perform UI accessibility review after build |
| 18. Supabase schema reviewed | blocked | no schema files | no schema exists here | backend lead | technical steward | create or connect real schema artifacts |
| 19. RLS runtime verified | blocked | no RLS files | no runtime verification possible | backend/security lead | technical steward | implement and verify RLS |
| 20. Security review completed | partial | `docs/audit/SECURITY_AND_SECRET_HYGIENE.md` | static review only; no runtime stack | security steward | human steward | complete implementation-aware security review |
| 21. External repository links verified | blocked | no canonical external links yet | integration map incomplete | ecosystem steward | human steward | define and verify external repo references |
| 22. Deployment environment verified | blocked | no deployment files | no stack to deploy | ops lead | technical steward | define deployment target |
| 23. Domain and DNS verified | blocked | no domain config | domain plan absent | ops lead | human steward | verify domain/DNS separately |
| 24. Monitoring verified | blocked | no monitoring config | no runtime environment | ops/security lead | technical steward | define monitoring baseline |
| 25. Public activation approved by a human steward | blocked | none | all earlier gates incomplete | human steward | human steward | do not activate publicly yet |
