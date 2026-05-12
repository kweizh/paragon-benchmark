import os
import subprocess
import json
import pytest

SCRIPT_PATH = "/home/user/project/fetch_custom_object.js"

def test_script_exists():
    """Priority 3: Verify the script file exists."""
    assert os.path.isfile(SCRIPT_PATH), f"Script not found at {SCRIPT_PATH}"

def test_script_execution():
    """Priority 1: Execute the script and verify it outputs valid JSON."""
    result = subprocess.run(
        ["node", SCRIPT_PATH],
        capture_output=True,
        text=True,
        cwd="/home/user/project"
    )
    assert result.returncode == 0, f"Script execution failed: {result.stderr}"
    
    try:
        output_data = json.loads(result.stdout)
        assert isinstance(output_data, dict) or isinstance(output_data, list), "Output must be a JSON object or array"
    except json.JSONDecodeError:
        pytest.fail(f"Script output is not valid JSON: {result.stdout}")

def test_script_content_for_proxy_url():
    """Priority 3: Verify the script uses the correct Proxy API endpoint and headers."""
    with open(SCRIPT_PATH, "r") as f:
        content = f.read()
    
    assert "proxy.useparagon.com/projects/" in content, "Script does not use the Paragon Proxy API endpoint."
    assert "sdk/proxy/salesforce" in content, "Script does not target the Salesforce proxy integration."
    assert "X-Paragon-Proxy-Url" in content, "Script is missing the X-Paragon-Proxy-Url header."
    assert "PARAGON_PROJECT_ID" in content, "Script does not read PARAGON_PROJECT_ID from the environment."
    assert "PARAGON_USER_TOKEN" in content, "Script does not read PARAGON_USER_TOKEN from the environment."
