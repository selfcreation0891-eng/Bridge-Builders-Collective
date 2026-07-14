# Frontend Audit

## Frontend reality check

The repository does **not** contain a runnable frontend. It contains one placeholder file named `frontend\README.md`, not a `frontend/` directory.

## Observed frontend evidence

| Area | Finding | Evidence |
| --- | --- | --- |
| Framework | Documented as Lovable + React + Node.js | `frontend\README.md:17-21`; `doc/ARCHITECTURE.md:32-35` |
| Application root | Missing | repository listing |
| Source directories | Missing | no `src/`, `app/`, `pages/`, `components/`, or `public/` directories found |
| Routes | Missing | no routing files or page files found |
| Layouts | Missing | no application code found |
| Components | Missing | no application code found |
| Styling system | Unverified | only descriptive language exists |
| Responsive behavior | Unverified | `frontend\README.md:14`; `ACCESSIBILITY_STANDARD.md:32-46` are aspirational only |
| Accessibility implementation | Unverified | no UI implementation to inspect |
| Data sources | Documented Supabase integration only | `frontend\README.md:21` |
| Build scripts | Missing | no `package.json` |
| Test coverage | Missing | no tests detected |

## Route and public-surface classification

| Intended route/capability | Status | Evidence |
| --- | --- | --- |
| Public home | placeholder | minimal `README.md`, no web app |
| Ecosystem explorer | missing | no implementation files |
| Programs | missing | no route/content implementation |
| Participation pathways | missing | no forms or intake flows |
| Community | missing | no UI implementation |
| Stewardship | documented only | governance docs only |
| Public Knowledge | missing | no implementation |
| Trust Center | missing | no route or public content |
| Media and stories | documented only | `MEDIA_LICENSING_POLICY.md:1-82`; no frontend |
| Research | missing | no implementation |
| Contact | missing | terms/accessibility docs still contain placeholders |

## Placeholder content findings

- The frontend README describes responsibilities such as onboarding, steward dashboards, archive interaction, and H-ROI visualization, but none of those surfaces exist in tracked code. (Evidence: `frontend\README.md:5-15`)
- No navigation model, menu structure, page hierarchy, or route contract is present.

## Validation and build evidence

- No dependency installation method could be run because no package manifest or lockfile exists.
- No `typecheck`, `lint`, `test`, or `build` script exists.

## Conclusion

**Frontend status: blocked.** The repository currently documents a frontend concept but does not contain a canonical frontend application root.
