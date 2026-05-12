import os
import subprocess
import json
import pytest

PROJECT_DIR = "/home/user/project"
OUTPUT_FILE = os.path.join(PROJECT_DIR, "output.json")

def test_script_execution():
    """Run the user script and verify it executes successfully."""
    result = subprocess.run(
        ["node", "index.js"],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True
    )
    assert result.returncode == 0, f"Script failed to execute: {result.stderr}"

def test_output_file_exists():
    """Verify that output.json was created and contains valid JSON."""
    assert os.path.isfile(OUTPUT_FILE), f"Expected output file {OUTPUT_FILE} does not exist."
    with open(OUTPUT_FILE, "r") as f:
        try:
            data = json.load(f)
            assert isinstance(data, dict), "Output JSON should be an object."
        except json.JSONDecodeError:
            pytest.fail("output.json does not contain valid JSON.")

def test_member_deleted_via_proxy_api():
    """Use the Paragon Proxy API to verify the member was deleted (should return 404)."""
    project_id = os.environ.get("PARAGON_PROJECT_ID")
    user_token = os.environ.get("PARAGON_USER_TOKEN")
    list_address = os.environ.get("MAILGUN_LIST_ADDRESS")
    member_address = os.environ.get("MAILGUN_MEMBER_ADDRESS")

    assert project_id, "PARAGON_PROJECT_ID is not set in environment."
    assert user_token, "PARAGON_USER_TOKEN is not set in environment."
    assert list_address, "MAILGUN_LIST_ADDRESS is not set in environment."
    assert member_address, "MAILGUN_MEMBER_ADDRESS is not set in environment."

    proxy_url = f"https://proxy.useparagon.com/projects/{project_id}/sdk/proxy/mailgun"
    target_url = f"https://api.mailgun.net/v3/lists/{list_address}/members/{member_address}"

    # Use curl to get the HTTP status code
    result = subprocess.run([
        "curl", "-s", "-o", "/dev/null", "-w", "%{http_code}",
        "-H", f"Authorization: Bearer {user_token}",
        "-H", f"X-Paragon-Proxy-Url: {target_url}",
        proxy_url
    ], capture_output=True, text=True)

    status_code = result.stdout.strip()
    assert status_code == "404", f"Expected HTTP status 404 (Not Found) for deleted member, but got {status_code}."
