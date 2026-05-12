import os
import subprocess
import time
import socket
import json
import base64
import urllib.request
import pytest
from pochi_verifier import PochiVerifier

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
    # Ensure dependencies are installed
    subprocess.run(["npm", "install"], cwd=PROJECT_DIR, check=True)
    
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

def test_jwt_generation(start_app):
    """Test the /auth/token endpoint returns a valid JWT with sub and iat."""
    try:
        req = urllib.request.Request("http://localhost:3000/auth/token")
        with urllib.request.urlopen(req) as response:
            assert response.status == 200, f"Expected status 200, got {response.status}"
            data = json.loads(response.read().decode('utf-8'))
            
            # The token might be in a 'token' field or returned as a raw string
            token = data.get('token') if isinstance(data, dict) and 'token' in data else data
            
            # Basic JWT structure check (header.payload.signature)
            parts = token.split('.')
            assert len(parts) == 3, f"Token does not look like a JWT: {token}"
            
            # Decode payload
            payload_b64 = parts[1]
            # Add padding if necessary
            payload_b64 += '=' * (-len(payload_b64) % 4)
            payload_json = base64.b64decode(payload_b64).decode('utf-8')
            payload = json.loads(payload_json)
            
            assert payload.get('sub') == 'test-user-id', f"Expected sub='test-user-id', got {payload.get('sub')}"
            assert 'iat' in payload, "Expected 'iat' in JWT payload"
            
    except Exception as e:
        pytest.fail(f"Failed to fetch or parse JWT from /auth/token: {e}")

def test_frontend_initialization(start_app):
    """Priority 2: Browser verification to check SDK initialization."""
    reason = "The frontend should fetch the JWT and use it to initialize the Paragon SDK, then display a success message."
    truth = "Navigate to http://localhost:3000. Wait for the page to load and authenticate. Verify that the text 'Paragon SDK Initialized' appears on the page."

    verifier = PochiVerifier()
    result = verifier.verify(
        reason=reason,
        truth=truth,
        use_browser_agent=True,
        trajectory_dir="/logs/verifier/pochi/test_frontend_initialization"
    )
    assert result.status == "pass", f"Browser verification failed: {result.reason}"
