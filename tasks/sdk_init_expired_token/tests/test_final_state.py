import os
import subprocess
import pytest

PROJECT_DIR = "/home/user/app"
ERROR_LOG_FILE = os.path.join(PROJECT_DIR, "error.log")

def test_script_execution():
    """Priority 1: Run the script and verify it executes without crashing."""
    result = subprocess.run(["node", "index.js"], cwd=PROJECT_DIR, capture_output=True, text=True)
    assert result.returncode == 0, f"Script crashed with error: {result.stderr}"

def test_error_log_exists():
    """Priority 3: Verify the error log file was created."""
    assert os.path.isfile(ERROR_LOG_FILE), "error.log file was not created in the project directory."

def test_error_log_content():
    """Priority 3: Verify the error log contains authentication failure text."""
    with open(ERROR_LOG_FILE, "r") as f:
        content = f.read().lower()
        
    assert len(content) > 0, "error.log is empty."
    # The Paragon SDK should either return a 401, "unauthorized", "expired", or similar error text.
    # We check for general error indicators since the exact SDK error message may vary.
    assert any(keyword in content for keyword in ["error", "fail", "401", "unauthorized", "expired", "jwt"]), \
        f"error.log does not contain expected error keywords. Content: {content}"
