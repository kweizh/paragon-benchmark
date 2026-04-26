import os
import subprocess
import json
import pytest

PROJECT_DIR = "/home/user/app"
SCRIPT_FILE = os.path.join(PROJECT_DIR, "script.js")
LOG_FILE = os.path.join(PROJECT_DIR, "output.log")

def test_script_execution():
    """Priority 1: Run the script and verify output."""
    # Ensure PARAGON_PROJECT_ID and PARAGON_USER_TOKEN are set
    env = os.environ.copy()
    assert "PARAGON_PROJECT_ID" in env, "PARAGON_PROJECT_ID environment variable is required"
    assert "PARAGON_USER_TOKEN" in env, "PARAGON_USER_TOKEN environment variable is required"

    # Run the script and capture the output to output.log as described in the truth
    with open(LOG_FILE, "w") as f:
        result = subprocess.run(
            ["node", "script.js"],
            cwd=PROJECT_DIR, env=env, stdout=f, stderr=subprocess.PIPE
        )
    assert result.returncode == 0, f"'node script.js' failed with exit code {result.returncode}: {result.stderr.decode() if result.stderr else ''}"

def test_output_json_validity():
    """Verify that the output is a valid JSON object containing the expected data."""
    assert os.path.isfile(LOG_FILE), f"Log file {LOG_FILE} not found."
    with open(LOG_FILE, "r") as f:
        content = f.read()

    try:
        output_data = json.loads(content)
    except json.JSONDecodeError:
        pytest.fail(f"Output is not valid JSON: {content}")

    assert "data" in output_data, "Expected 'data' in GraphQL response"
    assert "viewer" in output_data["data"], "Expected 'viewer' in GraphQL response data"
    assert "login" in output_data["data"]["viewer"], "Expected 'login' in GraphQL response data.viewer"
