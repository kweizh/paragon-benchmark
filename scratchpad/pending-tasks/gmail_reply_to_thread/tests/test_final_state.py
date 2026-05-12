import os
import subprocess
import time
import socket
import pytest
from pochi_verifier import PochiVerifier

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

    # Wait for the app to be ready on both backend and frontend ports if possible,
    # but at least check 3000
    if not wait_for_port(3000, timeout=120):
        # Kill the process group before failing
        import signal
        os.killpg(os.getpgid(process.pid), signal.SIGTERM)
        pytest.fail("App failed to start and listen on port 3000.")

    yield

    # Shut down the app
    import signal
    try:
        os.killpg(os.getpgid(process.pid), signal.SIGTERM)
        process.wait(timeout=30)
    except Exception:
        pass

def test_gmail_reply_ui(start_app):
    reason = "The application should have a Connect Gmail button, and input fields for threadId and message, and a Reply button."
    truth = "Navigate to http://localhost:3000. Verify that a 'Connect Gmail' button is visible. Verify that there is an input field for 'threadId' and an input field for 'message'. Verify that there is a 'Reply' button. Fill in '18a1b2c3d4e5f6g7' for threadId and 'This is a test reply.' for message, then click the Reply button."

    verifier = PochiVerifier()
    result = verifier.verify(
        reason=reason,
        truth=truth,
        use_browser_agent=True,
        trajectory_dir="/logs/verifier/pochi/test_gmail_reply_ui"
    )
    assert result.status == "pass", f"Browser verification failed: {result.reason}"

def test_backend_paragon_token_endpoint(start_app):
    """Priority 3 fallback: Verify the backend token generation endpoint."""
    import urllib.request
    import json
    
    try:
        req = urllib.request.Request("http://localhost:3001/api/paragon-token")
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            assert "token" in data, "Expected 'token' in response from /api/paragon-token"
    except Exception as e:
        pytest.fail(f"Failed to fetch token from backend: {e}")
