import os
import subprocess
import time
import socket
import urllib.request
import json
import jwt
import pytest
from playwright.sync_api import sync_playwright

PROJECT_DIR = "/home/user/project"

def wait_for_port(port, timeout=60):
    start_time = time.time()
    while time.time() - start_time < timeout:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            if sock.connect_ex(('localhost', port)) == 0:
                return True
        time.sleep(5)
    return False

@pytest.fixture(scope="module")
def start_app():
    # Provide required environment variables for the test
    env = os.environ.copy()
    if "PARAGON_PROJECT_ID" not in env:
        pytest.fail("PARAGON_PROJECT_ID not set in environment")
    if "PARAGON_SIGNING_KEY" not in env:
        pytest.fail("PARAGON_SIGNING_KEY not set in environment")

    process = subprocess.Popen(
        ["npm", "start"],
        cwd=PROJECT_DIR,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env=env,
        preexec_fn=os.setsid
    )

    if not wait_for_port(3000):
        import signal
        os.killpg(os.getpgid(process.pid), signal.SIGTERM)
        pytest.fail("App failed to start and listen on port 3000.")

    yield env

    import signal
    os.killpg(os.getpgid(process.pid), signal.SIGTERM)
    process.wait(timeout=30)

def test_api_paragon_token(start_app):
    """Verify that the backend token endpoint returns a valid JWT."""
    req = urllib.request.Request("http://localhost:3000/api/paragon-token")
    try:
        with urllib.request.urlopen(req) as response:
            assert response.status == 200, "Expected 200 OK from /api/paragon-token"
            data = json.loads(response.read().decode())
            assert "token" in data, "Expected 'token' in response JSON"
            
            token = data["token"]
            # We cannot easily verify the signature without the public/private key pair if it's RS256,
            # but we can decode it without verification to check claims.
            decoded = jwt.decode(token, options={"verify_signature": False})
            assert "sub" in decoded, "JWT must contain 'sub' claim"
            assert "iat" in decoded, "JWT must contain 'iat' claim"
            assert decoded["sub"] == "test-user", "JWT 'sub' claim must be 'test-user'"
    except Exception as e:
        pytest.fail(f"Failed to fetch or parse token: {e}")

def test_frontend_ui_elements(start_app):
    """Verify the frontend UI has the required elements using Playwright."""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")
        
        # Check for Connect Gmail button
        connect_btn = page.locator("button", has_text="Connect Gmail")
        assert connect_btn.count() > 0, "Expected to find a 'Connect Gmail' button"
        
        # Check for form inputs
        assert page.locator("#message-id-input").count() > 0, "Expected to find input with id 'message-id-input'"
        assert page.locator("#label-id-input").count() > 0, "Expected to find input with id 'label-id-input'"
        assert page.locator("#add-label-btn").count() > 0, "Expected to find button with id 'add-label-btn'"
        
        browser.close()

def test_frontend_code_contains_proxy_request():
    """Verify the frontend code contains the paragon proxy API request."""
    # Since we can't easily mock the Paragon OAuth flow in the browser,
    # we verify the frontend source code implements the required paragon.request.
    found_request = False
    for root, _, files in os.walk(PROJECT_DIR):
        if "node_modules" in root:
            continue
        for file in files:
            if file.endswith((".js", ".jsx", ".ts", ".tsx", ".html")):
                path = os.path.join(root, file)
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                    # Check for proxy request to Gmail API
                    if "paragon.request" in content and "gmail" in content and "modify" in content and "addLabelIds" in content:
                        found_request = True
                        break
        if found_request:
            break
            
    assert found_request, "Expected to find frontend code calling paragon.request('gmail', '.../modify', ...) with addLabelIds"
