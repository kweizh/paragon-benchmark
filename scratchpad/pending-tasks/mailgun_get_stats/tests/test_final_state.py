import os
import subprocess
import json
import pytest

PROJECT_DIR = "/home/user/project"
STATS_FILE = os.path.join(PROJECT_DIR, "stats.json")

def test_script_execution():
    """Run the user script and check if it exits with 0."""
    result = subprocess.run(
        ["node", "index.js"],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True
    )
    assert result.returncode == 0, f"Script execution failed. stdout: {result.stdout}, stderr: {result.stderr}"

def test_stats_json_exists():
    """Verify that stats.json was created."""
    assert os.path.isfile(STATS_FILE), f"Expected file {STATS_FILE} does not exist."

def test_stats_json_content():
    """Verify that stats.json contains valid JSON with a 'stats' field."""
    with open(STATS_FILE, "r") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError as e:
            pytest.fail(f"stats.json does not contain valid JSON: {e}")
    
    assert "stats" in data, f"Expected 'stats' field in JSON, but got keys: {list(data.keys())}"
