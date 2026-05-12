import os
import subprocess
import time
import socket
import pytest
import urllib.request
import json
import base64
from pochi_verifier import PochiVerifier

PROJECT_DIR = "/home/user/project"

def wait_for_port(port, timeout=60):
    start_time = time.time()
    while time.time() - start_time < timeout:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            if sock.connect_ex(('localhost', port)) == 0:
                return True
        time.sleep(1)
    return False

@pytest.fixture(scope="module")
def start_app():
    # Start the app
    process = subprocess.Popen(
        ["node", "server.js"],
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

def test_api_token_is_expired(start_app):
    """Priority 3: Verify the generated token is expired."""
    try:
        req = urllib.request.Request("http://localhost:3000/api/token")
        with urllib.request.urlopen(req) as response:
            content = response.read().decode('utf-8')
            
        # The endpoint should return either just the token string or a JSON with the token
        # Let's handle both
        token = ""
        try:
            data = json.loads(content)
            token = data.get("token", content)
        except json.JSONDecodeError:
            token = content.strip()
            
        # Extract payload from JWT
        parts = token.split('.')
        assert len(parts) == 3, "Response is not a valid JWT format."
        
        # Decode payload
        payload_b64 = parts[1]
        # Add padding if necessary
        payload_b64 += "=" * ((4 - len(payload_b64) % 4) % 4)
        payload_json = base64.b64decode(payload_b64).decode('utf-8')
        payload = json.loads(payload_json)
        
        assert "exp" in payload, "Token payload does not contain 'exp' claim."
        exp_time = payload["exp"]
        current_time = int(time.time())
        assert exp_time < current_time, f"Token is not expired. exp: {exp_time}, current: {current_time}"
        
    except Exception as e:
        pytest.fail(f"Failed to fetch or parse token from /api/token: {e}")

def test_browser_handles_expired_token(start_app):
    """Priority 2: Use browser verifier to check the UI handles the error."""
    reason = "The client application should attempt to authenticate with the Paragon SDK and gracefully handle the error caused by the expired token."
    truth = "Navigate to http://localhost:3000. Wait for the page to load and execute the authentication script. Verify that the element with ID 'error-message' contains text indicating an authentication failure or expired token."

    verifier = PochiVerifier()
    result = verifier.verify(
        reason=reason,
        truth=truth,
        use_browser_agent=True,
        trajectory_dir="/logs/verifier/pochi/test_browser_handles_expired_token"
    )
    assert result.status == "pass", f"Browser verification failed: {result.reason}"
