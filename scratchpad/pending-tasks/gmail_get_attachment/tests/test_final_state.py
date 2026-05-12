import os
import subprocess
import time
import socket
import pytest
from playwright.sync_api import sync_playwright

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
        pytest.fail("App failed to start and listen on port 3000.")

    yield

    # Shut down the app
    import signal
    os.killpg(os.getpgid(process.pid), signal.SIGTERM)
    process.wait(timeout=30)

def test_fetch_attachment(start_app):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # Navigate to the app
        page.goto("http://localhost:3000")
        
        # Wait for the Paragon SDK to initialize and the user to be authenticated
        # The app should automatically authenticate the user on load.
        # We don't click Connect Gmail because it opens a popup that requires manual interaction.
        # Assuming the user 'test-user' is already connected to Gmail in the Paragon project,
        # clicking "Fetch Attachment" should just work.
        
        # Click the fetch button
        page.click("button#fetch-btn")
        
        # Wait for the attachment data to be populated
        page.wait_for_selector("div#attachment-data", timeout=15000)
        
        # Verify the content
        content = page.locator("div#attachment-data").inner_text()
        assert len(content) > 0, "Expected attachment data to be present in the div."
        
        browser.close()
