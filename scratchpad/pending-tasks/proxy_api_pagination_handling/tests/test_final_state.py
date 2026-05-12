import os
import json
import subprocess
import pytest

PROJECT_DIR = "/home/user/project"
OUTPUT_FILE = os.path.join(PROJECT_DIR, "output.json")

def test_script_execution():
    """Priority 1: Run the node script and verify it executes successfully."""
    # Run npm install first in case there's a package.json
    subprocess.run(
        ["npm", "install"],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True
    )
    
    result = subprocess.run(
        ["node", "fetch_all_records.js"],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True
    )
    assert result.returncode == 0, f"'node fetch_all_records.js' failed with output: {result.stderr}"

def test_output_file_exists():
    """Priority 3 fallback: basic file existence check."""
    assert os.path.isfile(OUTPUT_FILE), f"Output file not found at {OUTPUT_FILE}"

def test_output_is_valid_json_array():
    """Priority 3 fallback: file content check."""
    with open(OUTPUT_FILE, "r") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError as e:
            pytest.fail(f"Failed to parse {OUTPUT_FILE} as JSON: {e}")
    
    assert isinstance(data, list), f"Expected {OUTPUT_FILE} to contain a JSON array, got {type(data).__name__}"
    assert len(data) > 0, "Expected the JSON array to contain at least one record, but it was empty."
