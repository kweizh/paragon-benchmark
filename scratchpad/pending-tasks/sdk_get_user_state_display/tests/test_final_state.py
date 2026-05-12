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
    # Check if package.json exists to determine if we should run npm install
    if os.path.exists(os.path.join(PROJECT_DIR, "package.json")):
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

def test_user_state_display(start_app):
    reason = "The application must authenticate with the Paragon SDK and display the user state."
    truth = "Navigate to http://localhost:3000. Wait for the Paragon SDK to authenticate and fetch the user state. Verify that an element with the ID `user-state-display` exists. Verify that its text content contains a valid JSON representation of the user state. Verify that the JSON contains the user ID `test-user-123` and an `authenticated` property set to `true`."

    verifier = PochiVerifier()
    result = verifier.verify(
        reason=reason,
        truth=truth,
        use_browser_agent=True,
        trajectory_dir="/logs/verifier/pochi/test_user_state_display"
    )
    assert result.status == "pass", f"Browser verification failed: {result.reason}"
