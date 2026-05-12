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

def test_gmail_untrash_message_ui(start_app):
    message_id = os.environ.get("TEST_GMAIL_MESSAGE_ID", "dummy_message_id")
    reason = "The application should authenticate the user using Paragon SDK and provide an input for message ID and a button to untrash the message via the Paragon Proxy API."
    truth = f"Navigate to http://localhost:3000. Wait for the application to authenticate with Paragon. Enter the message ID '{message_id}' into the input field with ID 'message-id-input'. Click the button with ID 'untrash-message-btn'. Verify that the message is successfully untrashed by checking that a success message is displayed in the element with ID 'untrash-result'."

    verifier = PochiVerifier()
    result = verifier.verify(
        reason=reason,
        truth=truth,
        use_browser_agent=True,
        trajectory_dir="/logs/verifier/pochi/test_gmail_untrash_message_ui"
    )
    assert result.status == "pass", f"Browser verification failed: {result.reason}"
