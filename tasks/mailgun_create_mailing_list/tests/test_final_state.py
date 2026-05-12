import os
import json
import subprocess
import pytest

PROJECT_DIR = "/home/user/project"
OUTPUT_FILE = os.path.join(PROJECT_DIR, "output.json")

def test_output_file_exists_and_successful():
    """Priority 3: Check if output.json exists and has success response."""
    assert os.path.isfile(OUTPUT_FILE), f"Output file {OUTPUT_FILE} does not exist. Did the script run and save the output?"
    
    with open(OUTPUT_FILE, "r") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            pytest.fail(f"Output file {OUTPUT_FILE} is not valid JSON.")
    
    # ActionKit usually returns the result in a specific format, but we just check it's a dict and maybe has 'list' or similar success indicator.
    assert isinstance(data, dict), "Output JSON should be an object."

def test_mailing_list_created_via_proxy():
    """Priority 1: Use Paragon Proxy API via curl to verify the mailing list exists."""
    project_id = os.environ.get("PARAGON_PROJECT_ID")
    user_token = os.environ.get("PARAGON_USER_TOKEN")
    mailgun_domain = os.environ.get("MAILGUN_DOMAIN")
    
    assert project_id, "PARAGON_PROJECT_ID environment variable is missing."
    assert user_token, "PARAGON_USER_TOKEN environment variable is missing."
    assert mailgun_domain, "MAILGUN_DOMAIN environment variable is missing."
    
    list_address = f"harbor-test-list@{mailgun_domain}"
    proxy_url = f"https://proxy.useparagon.com/projects/{project_id}/sdk/proxy/mailgun/v3/lists/{list_address}"
    
    # We use curl to make the request to the proxy API
    curl_cmd = [
        "curl", "-s", "-o", "/dev/null", "-w", "%{http_code}",
        "-H", f"Authorization: Bearer {user_token}",
        proxy_url
    ]
    
    result = subprocess.run(curl_cmd, capture_output=True, text=True)
    assert result.returncode == 0, f"curl command failed: {result.stderr}"
    
    http_code = result.stdout.strip()
    assert http_code == "200", f"Expected HTTP 200 from Proxy API for the mailing list, got {http_code}. The mailing list may not have been created."
