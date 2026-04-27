import os
import subprocess
import json
import pytest

PROJECT_DIR = "/home/user/project"
LOG_FILE = "/home/user/project/error_log.json"

def test_script_execution_success():
    """Priority 1: Use subprocess to run the script and verify it exits cleanly without crashing."""
    env = os.environ.copy()
    env["PROJECT_ID"] = env["PARAGON_PROJECT_ID"]

    result = subprocess.run(
        ["node", "call_action.js"],
        cwd=PROJECT_DIR,
        env=env,
        capture_output=True,
        text=True
    )
    assert result.returncode == 0, f"Script crashed or exited with non-zero code: {result.stderr}"

def test_error_log_exists():
    """Priority 3: Verify the error log file was created."""
    assert os.path.isfile(LOG_FILE), f"Error log file not found at {LOG_FILE}"

def test_error_log_contents():
    """Priority 3: Verify the error log contains the required JSON structure."""
    with open(LOG_FILE, "r") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            pytest.fail(f"File {LOG_FILE} does not contain valid JSON.")

    assert "status" in data, "Expected 'status' key in error_log.json."
    assert isinstance(data["status"], int), f"Expected 'status' to be an integer, got {type(data['status'])}."
    assert "message" in data, "Expected 'message' key in error_log.json."
    assert isinstance(data["message"], str), f"Expected 'message' to be a string, got {type(data['message'])}."
