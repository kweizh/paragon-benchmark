import os
import subprocess
import json
import pytest

PROJECT_DIR = "/home/user/project"
OUTPUT_FILE = os.path.join(PROJECT_DIR, "output.json")

def test_trigger_script_exists():
    script_path = os.path.join(PROJECT_DIR, "trigger.js")
    assert os.path.isfile(script_path), f"trigger.js not found at {script_path}"

def test_script_execution():
    """Run the trigger script and verify it executes successfully."""
    result = subprocess.run(
        ["node", "trigger.js"],
        capture_output=True, text=True, cwd=PROJECT_DIR
    )
    assert result.returncode == 0, f"trigger.js failed to execute: {result.stderr}"

def test_output_file_exists_and_valid_json():
    """Verify that output.json is created and contains valid JSON."""
    assert os.path.isfile(OUTPUT_FILE), f"Output file {OUTPUT_FILE} was not created."
    
    with open(OUTPUT_FILE, "r") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            pytest.fail(f"output.json does not contain valid JSON.")
    
    assert isinstance(data, (dict, list)), "output.json should contain a JSON object or array."
