import os
import subprocess
import json
import pytest

PROJECT_DIR = "/home/user/actionkit-project"
ACTIONS_FILE = os.path.join(PROJECT_DIR, "actions.json")

def test_script_execution():
    """Priority 1: Run the script to verify it handles the token and succeeds."""
    result = subprocess.run(
        ["node", "fetch_actions.js"],
        capture_output=True, text=True, cwd=PROJECT_DIR
    )
    assert result.returncode == 0, \
        f"'node fetch_actions.js' failed with exit code {result.returncode}. Stderr: {result.stderr}"

def test_actions_json_exists():
    """Priority 3: Check if actions.json was created."""
    assert os.path.isfile(ACTIONS_FILE), \
        f"Expected {ACTIONS_FILE} to be created, but it was not found."

def test_actions_json_content():
    """Priority 3: Check if actions.json contains valid JSON."""
    with open(ACTIONS_FILE) as f:
        content = f.read()
    
    try:
        data = json.loads(content)
    except json.JSONDecodeError:
        pytest.fail(f"{ACTIONS_FILE} does not contain valid JSON.")
    
    assert isinstance(data, (dict, list)), \
        f"Expected {ACTIONS_FILE} to contain a JSON object or array, got {type(data)}."
