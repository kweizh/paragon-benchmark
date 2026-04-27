import os
import pytest

PROJECT_DIR = "/home/user/paragon-app"

def test_install_script_exists():
    script_path = os.path.join(PROJECT_DIR, "install.js")
    assert os.path.isfile(script_path), f"install.js not found at {script_path}"

def test_install_script_content():
    script_path = os.path.join(PROJECT_DIR, "install.js")
    with open(script_path, "r") as f:
        content = f.read()

    assert "installAction" in content, "Expected 'installAction' to be called in the script."
    assert "slack" in content or "'slack'" in content or "\"slack\"" in content, "Expected 'slack' integration type in the script."
    assert "send_message" in content or "'send_message'" in content or "\"send_message\"" in content, "Expected 'send_message' action ID in the script."
    assert "channel" in content and "#general" in content, "Expected parameters to include channel: '#general'."
    assert "PARAGON_PROJECT_ID" in content, "Expected PARAGON_PROJECT_ID environment variable to be used."
    assert "PARAGON_USER_TOKEN" in content, "Expected PARAGON_USER_TOKEN environment variable to be used."

def test_script_execution():
    import subprocess
    result = subprocess.run(["node", "install.js"], cwd=PROJECT_DIR, capture_output=True, text=True)
    assert result.returncode == 0, f"Script execution failed with error: {result.stderr}"

def test_log_file_exists():
    log_path = os.path.join(PROJECT_DIR, "output.log")
    assert os.path.isfile(log_path), f"Log file not found at {log_path}"
    with open(log_path, "r") as f:
        content = f.read()
    assert content.strip() != "", "Expected output.log to contain the result."
