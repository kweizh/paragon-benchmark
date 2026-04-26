import os
import pytest

PROJECT_DIR = "/home/user/project"
SCRIPT_FILE = os.path.join(PROJECT_DIR, "send_proxy_post.js")

def test_script_exists():
    assert os.path.isfile(SCRIPT_FILE), f"Script file {SCRIPT_FILE} does not exist."

def test_script_contains_correct_url():
    with open(SCRIPT_FILE, 'r') as f:
        content = f.read()
    assert "https://proxy.useparagon.com/projects/" in content, "Script does not contain the correct Proxy API base URL."
    assert "process.env.PARAGON_PROJECT_ID" in content or "PARAGON_PROJECT_ID" in content, "Script does not use PARAGON_PROJECT_ID for the URL."
    assert "/sdk/proxy/slack" in content, "Script does not target the slack integration via the Proxy API."

def test_script_contains_proxy_url_header():
    with open(SCRIPT_FILE, 'r') as f:
        content = f.read()
    assert "X-Paragon-Proxy-Url" in content or "x-paragon-proxy-url" in content, "Script is missing the X-Paragon-Proxy-Url header."
    assert "https://slack.com/api/chat.postMessage" in content, "Script does not contain the correct Slack API URL in the proxy header."

def test_script_contains_auth_header():
    with open(SCRIPT_FILE, 'r') as f:
        content = f.read()
    assert "Authorization" in content or "authorization" in content, "Script is missing the Authorization header."
    assert "Bearer" in content, "Script is missing the Bearer token format in the Authorization header."
    assert "process.env.PARAGON_USER_TOKEN" in content or "PARAGON_USER_TOKEN" in content, "Script does not use PARAGON_USER_TOKEN in the Authorization header."

def test_script_contains_json_payload():
    with open(SCRIPT_FILE, 'r') as f:
        content = f.read()
    assert "#general" in content, "Script payload missing the '#general' channel."
    assert "Hello via Proxy API!" in content, "Script payload missing the correct text."
    assert "Content-Type" in content or "content-type" in content, "Script missing Content-Type header."
    assert "application/json" in content, "Script missing application/json in Content-Type header."
