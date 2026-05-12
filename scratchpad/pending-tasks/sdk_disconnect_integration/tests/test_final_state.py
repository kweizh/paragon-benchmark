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
    # Setup commands: npm install, npm run build, npm start
    subprocess.run(["npm", "install"], cwd=PROJECT_DIR, check=True)
    
    # Run build if package.json has a build script, ignore if it fails or doesn't exist
    try:
        subprocess.run(["npm", "run", "build"], cwd=PROJECT_DIR, check=True)
    except subprocess.CalledProcessError:
        pass

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
        pytest.fail("App failed to start and listen on required port 3000.")
    
    yield
    
    # Shut down the app
    import signal
    os.killpg(os.getpgid(process.pid), signal.SIGTERM)
    process.wait(timeout=30)

def test_sdk_disconnect_integration(start_app):
    reason = "The application should have a 'Disconnect Slack' button that triggers the Paragon disconnect flow."
    truth = "Navigate to http://localhost:3000. Verify that the 'Disconnect Slack' button (id: `disconnect-slack`) is present on the page. Verify that the status div (id: `status`) is present. Click the 'Disconnect Slack' button. Verify that the status div updates to 'Disconnected', indicating that `paragon.uninstallIntegration('slack')` was successfully triggered and resolved."

    verifier = PochiVerifier()
    result = verifier.verify(
        reason=reason,
        truth=truth,
        use_browser_agent=True,
        trajectory_dir="/logs/verifier/pochi/test_sdk_disconnect_integration"
    )
    assert result.status == "pass", f"Browser verification failed: {result.reason}"
