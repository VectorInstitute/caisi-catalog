# Contributing to the CAISI Research Catalog

Thank you for contributing! This guide covers how to add or update repository entries.

## Adding a New Repository

1. Create a new file in `repositories/` named `<repo-name>.yaml`
2. Fill in all required fields (see [README.md](README.md) for the schema)
3. Run `python scripts/sync_repositories_to_json.py` to regenerate the JSON
4. Verify the catalog builds: `cd catalog && npm run build`
5. Open a pull request

## Code Style

Python code is formatted with `ruff`. Install pre-commit hooks to auto-format:

```bash
pip install pre-commit
pre-commit install
```

## Commit Messages

Use conventional commit prefixes:

- `feat:` — new feature or repository entry
- `fix:` — bug fix
- `chore:` — maintenance (deps, CI)
- `docs:` — documentation only
- `style:` — formatting, no logic change

## Questions?

Open an issue using the [bug report](.github/ISSUE_TEMPLATE/bug_report.md) or [feature request](.github/ISSUE_TEMPLATE/feature_request.md) template.
