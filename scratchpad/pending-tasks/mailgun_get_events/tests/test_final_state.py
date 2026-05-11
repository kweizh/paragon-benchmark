import os
import subprocess
import json
import pytest

PROJECT_DIR = "/home/user/project"
SCRIPT_FILE = os.path.join(PROJECT_DIR, "fetch_events.js")
OUTPUT_FILE = os.path.join(PROJECT_DIR, "events.json")

def test_script_execution():
    """Priority 1: Run the user's script and verify it succeeds."""
    assert os.path.isfile(SCRIPT_FILE), f"Script not found at {SCRIPT_FILE}"
    
    result = subprocess.run(
        ["node", "fetch_events.js"],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True
    )
    assert result.returncode == 0, f"Script execution failed with error: {result.stderr}\nOutput: {result.stdout}"

def test_output_file_exists():
    """Priority 3: Verify the output file is created."""
    assert os.path.isfile(OUTPUT_FILE), f"Output file not found at {OUTPUT_FILE}"

def test_output_file_contains_valid_json():
    """Priority 3: Verify the output file contains valid JSON."""
    with open(OUTPUT_FILE, "r") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError as e:
            pytest.fail(f"Failed to parse events.json as JSON: {e}")
    
    # The Mailgun events API usually returns an object with an 'items' array
    assert isinstance(data, dict), "Expected JSON response to be an object."
