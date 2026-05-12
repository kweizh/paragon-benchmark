import os
import subprocess
import pytest

PROJECT_DIR = "/home/user/project"
SCRIPT_PATH = os.path.join(PROJECT_DIR, "create_webhook.js")
LOG_PATH = os.path.join(PROJECT_DIR, "output.log")

def test_script_exists():
    """Verify that the script was created."""
    assert os.path.isfile(SCRIPT_PATH), f"Script {SCRIPT_PATH} does not exist."

def test_script_execution():
    """Run the script and verify it executes successfully."""
    result = subprocess.run(
        ["node", "create_webhook.js"],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True
    )
    assert result.returncode == 0, f"Script execution failed with error: {result.stderr}"

def test_output_log_contains_success_status():
    """Verify that the script wrote a success status code to output.log."""
    assert os.path.isfile(LOG_PATH), f"Log file {LOG_PATH} does not exist."
    
    with open(LOG_PATH, "r") as f:
        content = f.read().strip()
    
    assert "200" in content or "201" in content, f"Expected success status code (200 or 201) in output.log, got: {content}"
