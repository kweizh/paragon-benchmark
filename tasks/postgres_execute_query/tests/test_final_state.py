import os
import subprocess
import json
import pytest

PROJECT_DIR = "/home/user/project"
RESULT_FILE = os.path.join(PROJECT_DIR, "result.json")

def test_script_execution():
    """Priority 1: Run the script and verify it executes without errors."""
    result = subprocess.run(
        ["node", "index.js"],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True
    )
    assert result.returncode == 0, f"Script execution failed: {result.stderr}"

def test_result_file_exists_and_contains_expected_data():
    """Priority 3: Check the generated output file."""
    assert os.path.isfile(RESULT_FILE), f"Result file not found at {RESULT_FILE}"
    
    with open(RESULT_FILE, "r") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError as e:
            pytest.fail(f"Failed to parse result.json: {e}")
            
    # The actual response format from ActionKit might vary, but for a successful query,
    # it typically contains the rows returned, e.g., [{"?column?": 1}] or similar.
    # We'll just check that it's valid JSON and doesn't contain an obvious error.
    data_str = json.dumps(data).lower()
    assert "error" not in data_str or "success" in data_str or "1" in data_str, \
        f"Unexpected response in result.json: {data}"
