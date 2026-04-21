#!/usr/bin/env python3
"""Collect GitHub metrics for all repositories in the catalog.

Fetches stars, forks, watchers, and traffic data via the GitHub API (gh CLI).
Writes snapshot and rolling history JSON files used by the analytics dashboard.
"""

import datetime
import json
import subprocess
from pathlib import Path
from typing import Any, Dict, List, Optional


MAX_HISTORY_ENTRIES = 400


def run_gh_command(args: List[str]) -> Optional[Dict[str, Any]]:
    """Run a gh CLI command and return parsed JSON output.

    Parameters
    ----------
    args : List[str]
        Arguments to pass to the gh CLI.

    Returns
    -------
    Optional[Dict[str, Any]]
        Parsed JSON response or None on failure.

    """
    try:
        result = subprocess.run(
            ["gh"] + args,
            capture_output=True,
            text=True,
            check=True,
        )
        return json.loads(result.stdout)
    except (subprocess.CalledProcessError, json.JSONDecodeError) as e:
        print(f"Warning: gh command failed: {e}")
        return None


def get_repo_info(repo_id: str) -> Optional[Dict[str, Any]]:
    """Fetch basic repository info (stars, forks, watchers).

    Parameters
    ----------
    repo_id : str
        Repository identifier in org/repo format.

    Returns
    -------
    Optional[Dict[str, Any]]
        Repository metadata or None on failure.

    """
    data = run_gh_command([
        "api", f"repos/{repo_id}",
        "--jq", "{stargazers_count, forks_count, subscribers_count, open_issues_count}",
    ])
    return data


def get_traffic_views(repo_id: str) -> Optional[Dict[str, Any]]:
    """Fetch repository traffic view counts.

    Parameters
    ----------
    repo_id : str
        Repository identifier in org/repo format.

    Returns
    -------
    Optional[Dict[str, Any]]
        Traffic view data or None on failure.

    """
    return run_gh_command(["api", f"repos/{repo_id}/traffic/views"])


def get_traffic_clones(repo_id: str) -> Optional[Dict[str, Any]]:
    """Fetch repository traffic clone counts.

    Parameters
    ----------
    repo_id : str
        Repository identifier in org/repo format.

    Returns
    -------
    Optional[Dict[str, Any]]
        Traffic clone data or None on failure.

    """
    return run_gh_command(["api", f"repos/{repo_id}/traffic/clones"])


def load_repositories() -> List[Dict[str, Any]]:
    """Load repository list from the JSON data file.

    Returns
    -------
    List[Dict[str, Any]]
        List of repository dictionaries.

    """
    data_path = Path("catalog/public/data/repositories.json")
    with open(data_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data["repositories"]


def collect_metrics() -> Dict[str, Any]:
    """Collect GitHub metrics for all repositories.

    Returns
    -------
    Dict[str, Any]
        Metrics snapshot with repo data and timestamp.

    """
    repositories = load_repositories()
    repos_metrics: Dict[str, Any] = {}

    for repo in repositories:
        repo_id = repo["repo_id"]
        print(f"Collecting metrics for {repo_id}...")

        info = get_repo_info(repo_id)
        views = get_traffic_views(repo_id)
        clones = get_traffic_clones(repo_id)

        repos_metrics[repo_id] = {
            "name": repo["name"],
            "stars": info.get("stargazers_count", 0) if info else 0,
            "forks": info.get("forks_count", 0) if info else 0,
            "watchers": info.get("subscribers_count", 0) if info else 0,
            "open_issues": info.get("open_issues_count", 0) if info else 0,
            "views_total": views.get("count", 0) if views else 0,
            "views_unique": views.get("uniques", 0) if views else 0,
            "clones_total": clones.get("count", 0) if clones else 0,
            "clones_unique": clones.get("uniques", 0) if clones else 0,
        }

    return {
        "repos": repos_metrics,
        "last_updated": datetime.datetime.now(datetime.timezone.utc).isoformat(),
    }


def update_history(
    current: Dict[str, Any], history_path: Path
) -> List[Dict[str, Any]]:
    """Append current metrics to history, keeping the last MAX_HISTORY_ENTRIES.

    Parameters
    ----------
    current : Dict[str, Any]
        Current metrics snapshot.
    history_path : Path
        Path to the history JSON file.

    Returns
    -------
    List[Dict[str, Any]]
        Updated history list.

    """
    history: List[Dict[str, Any]] = []

    if history_path.exists():
        with open(history_path, "r", encoding="utf-8") as f:
            history = json.load(f)

    history.append(current)

    if len(history) > MAX_HISTORY_ENTRIES:
        history = history[-MAX_HISTORY_ENTRIES:]

    return history


def main() -> None:
    """Collect and persist GitHub metrics."""
    print("Collecting GitHub metrics...")

    metrics = collect_metrics()

    output_dir = Path("catalog/public/data")
    output_dir.mkdir(parents=True, exist_ok=True)

    snapshot_path = output_dir / "github_metrics.json"
    with open(snapshot_path, "w", encoding="utf-8") as f:
        json.dump(metrics, f, indent=2)
    print(f"Wrote snapshot to {snapshot_path}")

    history_path = output_dir / "github_metrics_history.json"
    history = update_history(metrics, history_path)
    with open(history_path, "w", encoding="utf-8") as f:
        json.dump(history, f, indent=2)
    print(f"Updated history at {history_path} ({len(history)} entries)")

    print("Done.")


if __name__ == "__main__":
    main()
