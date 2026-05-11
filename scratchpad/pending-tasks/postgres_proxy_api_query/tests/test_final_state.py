import os
import json
import subprocess
import pytest

PROJECT_DIR = "/home/user/project"
SCRIPT_FILE = os.path.join(PROJECT_DIR, "query.js")
LOG_FILE = os.path.join(PROJECT_DIR, "output.json")

def test_script_exists():
    """Priority 3 fallback: Verify that the script exists."""
    assert os.path.isfile(SCRIPT_FILE), f"Script file {SCRIPT_FILE} does not exist."

def test_script_content_for_proxy_url():
    """Priority 3: Verify the script uses the correct Proxy API endpoint and headers."""
    with open(SCRIPT_FILE, "r") as f:
        content = f.read()

    assert "proxy.useparagon.com/projects/" in content, "Script does not use the Paragon Proxy API endpoint."
    assert "sdk/proxy/postgres" in content, "Script does not target the Postgres proxy integration."
    assert "/query" in content, "Script does not use the /query endpoint for Postgres."

def test_script_execution():
    """Priority 3 fallback: Run the script and check if it succeeds."""
    result = subprocess.run(
        ["node", "query.js"],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True
    )
    assert result.returncode == 0, f"Script failed to execute: {result.stderr}"

def test_result_file_exists_and_is_valid_json():
    """Priority 3 fallback: Check if output.json exists and is valid JSON."""
    assert os.path.isfile(LOG_FILE), f"Log file {LOG_FILE} does not exist."
    
    with open(LOG_FILE, "r") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            pytest.fail(f"Log file {LOG_FILE} is not valid JSON.")
    
    # We just expect it to be a dict or a list (a valid JSON response)
    assert isinstance(data, (dict, list)), f"Expected JSON response to be a dict or list, got: {type(data)}"
