import os
import subprocess
import time
import socket
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
    # Install dependencies
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

def test_event_listener(start_app):
    reason = "The application should initialize Paragon SDK and set up event listeners. Clicking the connect button should trigger Paragon Connect, and the event listener should update the event log."
    truth = "Navigate to http://localhost:3000. Verify that a button with ID 'connect-slack-btn' exists. Click the '#connect-slack-btn' button. Since this is an evaluation environment without actual user interaction in the popup, you should simulate a Paragon connection event on the page (e.g. by dispatching a custom event or mocking the SDK behavior if necessary) or simply observe if the initialization succeeds. Verify that the DOM element with ID 'event-log' gets updated with text containing 'slack: success' or similar based on the event listener. Note: The exact mock might depend on how Paragon SDK is loaded, but verify that the event listener logic is present and updates the DOM."

    verifier = PochiVerifier()
    result = verifier.verify(
        reason=reason,
        truth=truth,
        use_browser_agent=True,
        trajectory_dir="/logs/verifier/pochi/test_event_listener"
    )
    assert result.status == "pass", f"Browser verification failed: {result.reason}"
