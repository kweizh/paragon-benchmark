import os
import subprocess
import time
import socket
import pytest
import json
import base64
from playwright.sync_api import sync_playwright, expect

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

def test_gmail_send_html_email(start_app):
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        
        request_payloads = []
        
        def handle_request(request):
            if "proxy/gmail/users/me/messages/send" in request.url and request.method == "POST":
                request_payloads.append(request.post_data)
                
        page.on("request", handle_request)
        
        page.goto("http://localhost:3000")
        
        # Fill in the form
        page.fill("#to-input", "recipient@example.com")
        page.fill("#subject-input", "Test HTML Email")
        page.fill("#html-body-input", "<h1>Hello World</h1>")
        
        # Click send
        page.click("#send-email-btn")
        
        # Wait for the success message
        expect(page.locator("#success-message")).to_be_visible(timeout=10000)
        
        assert len(request_payloads) == 1, "Expected exactly one request to the Gmail proxy API."
        
        payload_data = json.loads(request_payloads[0])
        assert "raw" in payload_data, "Payload must contain 'raw' field."
        
        # Decode base64url
        raw_encoded = payload_data["raw"]
        # Add padding if necessary
        padding = 4 - (len(raw_encoded) % 4)
        if padding != 4:
            raw_encoded += "=" * padding
        raw_decoded = base64.urlsafe_b64decode(raw_encoded).decode('utf-8')
        
        assert "To: recipient@example.com" in raw_decoded, "Raw email must contain the correct 'To' header."
        assert "Subject: Test HTML Email" in raw_decoded, "Raw email must contain the correct 'Subject' header."
        assert "MIME-Version: 1.0" in raw_decoded, "Raw email must contain 'MIME-Version: 1.0'."
        assert "Content-Type: text/html" in raw_decoded, "Raw email must contain 'Content-Type: text/html'."
        assert "<h1>Hello World</h1>" in raw_decoded, "Raw email must contain the correct HTML body."
        
        browser.close()
