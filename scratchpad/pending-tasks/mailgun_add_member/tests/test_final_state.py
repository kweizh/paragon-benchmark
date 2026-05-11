import os
import subprocess
import json
import urllib.request
import urllib.error
import pytest

PROJECT_DIR = "/home/user/project"

def test_script_exists_and_log_contains_200():
    """Verify that the script exists and the log file contains 200."""
    script_path = os.path.join(PROJECT_DIR, "add_member.js")
    assert os.path.isfile(script_path), f"Script not found at {script_path}"
    
    log_path = os.path.join(PROJECT_DIR, "output.log")
    assert os.path.isfile(log_path), f"Log file not found at {log_path}"

    with open(log_path, "r") as f:
        content = f.read()
    
    assert "200" in content, f"Expected '200' in output.log, got: {content}"

def test_member_exists_in_mailgun():
    """Verify that the member was actually added to the Mailgun list via Paragon Proxy API."""
    project_id = os.environ.get("PARAGON_PROJECT_ID")
    user_token = os.environ.get("PARAGON_USER_TOKEN")
    list_address = os.environ.get("MAILGUN_LIST_ADDRESS")
    member_email = os.environ.get("MEMBER_EMAIL")
    
    assert project_id, "PARAGON_PROJECT_ID is not set"
    assert user_token, "PARAGON_USER_TOKEN is not set"
    assert list_address, "MAILGUN_LIST_ADDRESS is not set"
    assert member_email, "MEMBER_EMAIL is not set"
    
    proxy_url = f"https://api.mailgun.net/v3/lists/{list_address}/members/{member_email}"
    paragon_url = f"https://proxy.useparagon.com/projects/{project_id}/sdk/proxy/mailgun"
    
    req = urllib.request.Request(paragon_url, method="GET")
    req.add_header("Authorization", f"Bearer {user_token}")
    req.add_header("X-Paragon-Proxy-Url", proxy_url)
    
    try:
        with urllib.request.urlopen(req) as response:
            status_code = response.getcode()
            body = response.read().decode('utf-8')
            assert status_code == 200, f"Expected 200 OK from Mailgun, got {status_code}"
            
            data = json.loads(body)
            assert "member" in data, f"Expected 'member' in response, got: {data}"
            assert data["member"]["address"] == member_email, f"Expected member address {member_email}, got: {data['member'].get('address')}"
    except urllib.error.HTTPError as e:
        pytest.fail(f"Failed to fetch member from Mailgun: {e.code} {e.reason} - {e.read().decode('utf-8')}")
    except Exception as e:
        pytest.fail(f"Error checking Mailgun member: {str(e)}")
