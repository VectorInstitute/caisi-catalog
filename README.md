# CAISI Research Catalog

A curated catalog of AI safety research implementations and tools developed under the **Canadian AI Safety Institute (CAISI) Research Program at CIFAR**.

## Web Interface

The catalog is an interactive static website featuring:

- **Fast Search** — instant full-text search powered by Pagefind
- **Filtering** — browse by type (applied-research, bootcamp, tool)
- **Responsive Design** — works on all devices
- **Static Deployment** — zero backend, deployable to GCS or GitHub Pages

### Local Development

```bash
# 1. Install Python dependencies and sync repositories data
pip install pyyaml
python scripts/sync_repositories_to_json.py

# 2. Build and serve the catalog
cd catalog
npm install
npm run build   # builds Next.js + generates search index
npm run serve   # serves the static output on http://localhost:3001
```

For hot-reload during frontend development (search won't work without a build):

```bash
cd catalog
npm run dev
```

## Adding a Repository

Create a new YAML file in `repositories/` named `<repo-name>.yaml`:

```yaml
name: my-safety-tool              # Required: short identifier
repo_id: VectorInstitute/my-repo  # Required: GitHub org/repo
description: "Brief description"  # Required
implementations:                  # Required: list of algorithms/techniques
  - name: Safety Evaluation Suite
    url: null                     # Optional URL to specific implementation
type: tool                        # Required: tool | bootcamp | applied-research
year: 2025                        # Required: publication/release year
github_url: https://...           # Optional: overrides repo_id URL
paper_url: https://...            # Optional: associated paper link
bibtex: citation-key              # Optional: key in catalog/public/data/papers.bib
platform_url: https://...         # Optional: deployment platform URL
public_datasets:                  # Optional: datasets used
  - name: Dataset Name
    url: https://...
```

After adding a YAML file, regenerate the JSON:

```bash
python scripts/sync_repositories_to_json.py
```

### Required Fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Repository identifier |
| `repo_id` | string | GitHub `org/repo` |
| `description` | string | Brief description |
| `implementations` | list | ML/AI techniques implemented |
| `type` | string | `tool`, `bootcamp`, or `applied-research` |
| `year` | integer | Publication/release year |

## GitHub Actions

| Workflow | Trigger | Purpose |
|---|---|---|
| `code_checks.yml` | Push/PR | Runs ruff, typos, Next.js lint, pip-audit |
| `collect-metrics.yml` | Weekly (Mon 12:00 UTC) | Collects GitHub stars/forks/traffic |
| `deploy-catalog-gcp.yml` | Push to main / metrics update | Builds and deploys to GCS |

## Required Secrets

For deployment, configure these GitHub Actions secrets:

| Secret | Description |
|---|---|
| `GCP_WORKLOAD_IDENTITY_PROVIDER` | GCP Workload Identity Federation provider |
| `GCP_SERVICE_ACCOUNT` | GCP service account email |
| `GCS_BUCKET` | Target GCS bucket name |
| `METRICS_GITHUB_TOKEN` | PAT with `repo` scope for traffic data |
