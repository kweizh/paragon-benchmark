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
        pytest.fail("App failed to start and listen on required ports.")

    yield

    # Shut down the app
    import signal
    os.killpg(os.getpgid(process.pid), signal.SIGTERM)
    process.wait(timeout=30)

def test_gmail_read_recent_messages(start_app):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # Navigate to the app
        page.goto("http://localhost:3000")
        
        # Wait for the Connect Gmail button to be visible
        connect_btn = page.locator("text='Connect Gmail'")
        assert connect_btn.is_visible(), "Connect Gmail button is not visible on the page."
        
        # Since we cannot easily automate the Paragon OAuth popup in a headless test without credentials,
        # we will check if the Fetch Recent Messages button is present and click it.
        # Note: In a real environment, the user might need to be authenticated first.
        # We will assume the application handles state gracefully or shows an error,
        # but the button should exist.
        fetch_btn = page.locator("text='Fetch Recent Messages'")
        assert fetch_btn.is_visible(), "Fetch Recent Messages button is not visible on the page."
        
        # We click the fetch button and wait for the messages list to populate or show an error
        fetch_btn.click()
        
        # Wait for messages-list to be populated
        page.wait_for_selector("#messages-list", timeout=10000)
        messages_list = page.locator("#messages-list")
        assert messages_list.is_visible(), "Messages list container is not visible."
        
        browser.close()
