import os
import subprocess
import time
import socket
import pytest
import requests
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
        # Kill the process group before failing
        import signal
        os.killpg(os.getpgid(process.pid), signal.SIGTERM)
        pytest.fail("App failed to start and listen on required ports.")

    yield

    # Shut down the app
    import signal
    os.killpg(os.getpgid(process.pid), signal.SIGTERM)
    process.wait(timeout=30)

def test_ui_elements_present(start_app):
    """Verify that the UI has the required elements for connecting Gmail and deleting a message."""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        try:
            page.goto("http://localhost:3000", timeout=10000)
            
            # Check for Connect Gmail button
            connect_button = page.locator("button", has_text="Connect Gmail")
            assert connect_button.count() > 0, "Connect Gmail button not found on the page."
            
            # Check for input field (assuming it has some placeholder or label, but we can just check for any input)
            # A more robust check might look for specific attributes, but since we don't control the implementation,
            # we check for an input element and a delete button.
            inputs = page.locator("input")
            assert inputs.count() > 0, "Input field for Message ID not found."
            
            delete_button = page.locator("button", has_text="Delete Message")
            assert delete_button.count() > 0, "Delete Message button not found on the page."
            
        finally:
            browser.close()

def test_backend_token_generation(start_app):
    """Verify the backend generates a token using PARAGON_SIGNING_KEY."""
    # The exact endpoint isn't specified, but we can check if the code contains jwt.sign
    # and PARAGON_SIGNING_KEY.
    import glob
    
    found_jwt_sign = False
    found_signing_key = False
    
    # Search for backend files (usually index.js, server.js, app.js, or inside routes/api)
    for ext in ["**/*.js", "**/*.ts"]:
        for filepath in glob.glob(os.path.join(PROJECT_DIR, ext), recursive=True):
            if "node_modules" in filepath or ".next" in filepath:
                continue
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                    if "jwt.sign" in content:
                        found_jwt_sign = True
                    if "PARAGON_SIGNING_KEY" in content:
                        found_signing_key = True
            except Exception:
                pass
                
    assert found_jwt_sign, "Could not find 'jwt.sign' in the project code. The backend must generate a signed JWT."
    assert found_signing_key, "Could not find 'PARAGON_SIGNING_KEY' in the project code. The backend must use the signing key from environment variables."
