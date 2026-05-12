import os
import subprocess
import time
import socket
import pytest
import json
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

def test_web_ui_elements(start_app):
    reason = "The application should feature a UI to authenticate and update a Gmail draft."
    truth = "Navigate to http://localhost:3000. Verify that a 'Connect Gmail' button is visible. Verify that there is an input field for the Draft ID and an 'Update Draft' button."

    verifier = PochiVerifier()
    result = verifier.verify(
        reason=reason,
        truth=truth,
        use_browser_agent=True,
        trajectory_dir="/logs/verifier/pochi/test_web_ui_elements"
    )
    assert result.status == "pass", f"Browser verification failed: {result.reason}"

def test_backend_token_generation(start_app):
    # Test the /api/paragon-token endpoint
    import urllib.request
    try:
        req = urllib.request.Request("http://localhost:3000/api/paragon-token")
        response = urllib.request.urlopen(req)
        data = json.loads(response.read().decode('utf-8'))
        assert "token" in data, "The /api/paragon-token endpoint did not return a token."
        
        # Verify it's a valid JWT structure
        token = data["token"]
        parts = token.split(".")
        assert len(parts) == 3, "The token is not a valid JWT."
    except Exception as e:
        pytest.fail(f"Failed to fetch or parse token from backend: {e}")
