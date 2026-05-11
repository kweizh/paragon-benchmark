import os
import json
import subprocess
import pytest

PROJECT_DIR = "/home/user/project"
LOG_FILE = os.path.join(PROJECT_DIR, "result.json")

def test_script_execution():
    """Priority 3 fallback: Run the script and check if it succeeds."""
    result = subprocess.run(
        ["node", "index.js"],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True
    )
    assert result.returncode == 0, f"Script failed to execute: {result.stderr}"

def test_result_file_exists_and_contains_alice():
    """Priority 3 fallback: Check if result.json exists and contains the inserted row."""
    assert os.path.isfile(LOG_FILE), f"Log file {LOG_FILE} does not exist."
    
    with open(LOG_FILE, "r") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            pytest.fail(f"Log file {LOG_FILE} is not valid JSON.")
            
    content = json.dumps(data).lower()
    assert "alice" in content, f"Expected 'Alice' in the query result, got: {data}"
    assert "alice@example.com" in content, f"Expected 'alice@example.com' in the query result, got: {data}"
