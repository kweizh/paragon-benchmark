import os
import subprocess
import time
import socket
import pytest
import uuid
import json
import urllib.request
import urllib.error

PROJECT_DIR = "/home/user/app"

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
    # Install dependencies if package.json exists
    if os.path.exists(os.path.join(PROJECT_DIR, "package.json")):
        subprocess.run(["npm", "install"], cwd=PROJECT_DIR)

    # Start the app
    process = subprocess.Popen(
        ["npm", "start"],
        cwd=PROJECT_DIR,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        preexec_fn=os.setsid
    )

    # Wait for the app to be ready
    if not wait_for_port(3000):
        import signal
        os.killpg(os.getpgid(process.pid), signal.SIGTERM)
        pytest.fail("App failed to start and listen on port 3000.")

    yield

    # Shut down the app
    import signal
    os.killpg(os.getpgid(process.pid), signal.SIGTERM)
    process.wait(timeout=30)

def test_gmail_create_label(start_app):
    from playwright.sync_api import sync_playwright

    label_name = f"test-label-{uuid.uuid4().hex[:8]}"

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        try:
            page.goto("http://localhost:3000")
            
            # Wait for Paragon to initialize (might take a moment)
            page.wait_for_timeout(3000)
            
            # Fill the label name
            page.fill("#label-name", label_name)
            
            # Click create button
            page.click("#create-label")
            
            # Wait for success status
            page.wait_for_selector("#status:has-text('Success')", timeout=15000)
            
        except Exception as e:
            pytest.fail(f"Browser automation failed: {e}")
        finally:
            browser.close()

    # Now verify the label was actually created using Paragon Proxy API from backend
    project_id = os.environ.get("NEXT_PUBLIC_PARAGON_PROJECT_ID")
    user_id = os.environ.get("PARAGON_USER_ID")
    signing_key = os.environ.get("PARAGON_SIGNING_KEY")
    
    if not project_id or not user_id or not signing_key:
        pytest.fail("Missing required Paragon environment variables for verification.")
        
    import jwt
    token = jwt.encode(
        {
            "sub": user_id,
            "iat": int(time.time()),
        },
        signing_key.replace('\\n', '\n'),
        algorithm="RS256"
    )
    
    url = f"https://proxy.useparagon.com/projects/{project_id}/sdk/proxy/gmail"
    req = urllib.request.Request(url, headers={
        "Authorization": f"Bearer {token}",
        "X-Paragon-Proxy-Url": "https://gmail.googleapis.com/gmail/v1/users/me/labels"
    })
    
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            labels = data.get("labels", [])
            label_names = [l.get("name") for l in labels]
            assert label_name in label_names, f"Label '{label_name}' not found in Gmail. Found: {label_names}"
    except urllib.error.URLError as e:
        pytest.fail(f"Failed to fetch labels via Proxy API: {e.read().decode() if hasattr(e, 'read') else str(e)}")
