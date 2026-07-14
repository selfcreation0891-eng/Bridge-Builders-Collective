# CI Workflow

## Workflow file

`.github/workflows/ci.yml`

## Triggers

| Event | Condition |
|---|---|
| `pull_request` | Targeting `main` |
| `push` | To `main` |
| `workflow_dispatch` | Manual execution from the Actions tab |

Superseded runs for the same branch or pull request are automatically cancelled.

## Repository and environment

| Setting | Value |
|---|---|
| Runner | `ubuntu-latest` |
| Package manager | None — this is a documentation-only repository |
| Node.js | Not required |

## Validations performed

### YAML syntax (`yamllint --strict`)

All `.yml` and `.yaml` files in the repository are validated against strict YAML syntax rules using `yamllint`, which is pre-installed on `ubuntu-latest`.

### Markdown linting (`markdownlint-cli2`)

All `.md` files are linted using the [`DavidAnson/markdownlint-cli2-action`](https://github.com/DavidAnson/markdownlint-cli2-action) against the rules defined in `.markdownlint.json`.

Active rule overrides:

| Rule | Setting | Reason |
|---|---|---|
| MD013 (line length) | disabled | Documentation files use long prose lines |
| MD033 (inline HTML) | disabled | Policy documents use HTML formatting |
| MD041 (first-line heading) | disabled | Some files begin with a badge or frontmatter |

## Validations intentionally omitted

| Check | Reason |
|---|---|
| Dependency installation | No `package.json` exists; this is a documentation-only repository |
| TypeScript typecheck | No TypeScript source files |
| Unit or integration tests | No test suite |
| Build | No build step |
| Deployment | Out of scope for CI; no secrets or deploy configuration added |
| Link checking | Requires external network access; deferred to a future dedicated workflow |

## Running the same checks locally

```bash
# YAML linting
find . -name '*.yml' -o -name '*.yaml' | grep -v '^\./\.git/' | xargs yamllint --strict

# Markdown linting (requires Node.js)
npx markdownlint-cli2 --config .markdownlint.json "**/*.md"
```

## Inspecting a failed GitHub Actions run

1. Open the repository on GitHub.
2. Click the **Actions** tab.
3. Select the failed workflow run.
4. Expand the failed job and failed step to read the error output.
5. Fix the issue locally, push the fix, and the workflow reruns automatically.

## Rerunning a failed job

1. Open the failed workflow run on the Actions tab.
2. Click **Re-run jobs** → **Re-run failed jobs** (or **Re-run all jobs**).

## Enabling required status checks

Do not enable required status checks in branch protection until the CI workflow has produced at least one successful run on GitHub Actions. After a successful run:

1. Go to **Settings → Rules → Rulesets → Main Branch Protection**.
2. Edit the ruleset.
3. Enable **Require status checks to pass**.
4. Click **Add checks** and select the exact check names produced by the successful run.
5. Enable **Require branches to be up to date before merging** only after at least one required check has been selected.
6. Save the ruleset.
