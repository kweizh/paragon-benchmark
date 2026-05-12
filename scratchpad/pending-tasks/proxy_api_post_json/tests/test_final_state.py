import os
import subprocess
import json
import pytest

PROJECT_DIR = "/home/user/app"
SCRIPT_FILE = os.path.join(PROJECT_DIR, "proxy_request.js")
OUTPUT_FILE = os.path.join(PROJECT_DIR, "output.json")

@pytest.fixture(scope="module", autouse=True)
def run_script():
    """Run the proxy_request.js script before tests."""
    assert os.path.isfile(SCRIPT_FILE), f"Script not found at {SCRIPT_FILE}"
    
    env = os.environ.copy()
    result = subprocess.run(
        ["node", "proxy_request.js"],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True,
        env=env
    )
    assert result.returncode == 0, f"Script execution failed: {result.stderr}"
    return result

def test_script_executes_successfully(run_script):
    """Verify that the script executes without errors."""
    assert run_script.returncode == 0

def test_output_file_exists_and_contains_success():
    """Verify that output.json is created and contains a successful Slack response."""
    assert os.path.isfile(OUTPUT_FILE), f"Output file not found at {OUTPUT_FILE}"
    
    with open(OUTPUT_FILE, "r") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            assert False, "output.json is not valid JSON"
            
    assert data.get("ok") is True, f"Expected 'ok': true in output.json, got: {data}"
