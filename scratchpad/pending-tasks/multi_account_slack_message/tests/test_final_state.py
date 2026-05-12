import os
import subprocess
import time
import socket
import json
import pytest
from pochi_verifier import PochiVerifier

PROJECT_DIR = "/home/user/project"
TRIAL_ID_FILE = "/logs/artifacts/trial_id"

def get_trial_id():
    if os.path.exists(TRIAL_ID_FILE):
        with open(TRIAL_ID_FILE, "r") as f:
            return f.read().strip()
    return "test-trial-id"

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
    try:
        os.killpg(os.getpgid(process.pid), signal.SIGTERM)
        process.wait(timeout=30)
    except Exception:
        pass

def test_browser_interaction(start_app):
    trial_id = get_trial_id()
    reason = "The application should display a list of connected Slack accounts, allow selecting one, and sending a message."
    truth = f"Navigate to http://localhost:3000. Verify that the page loads and displays a dropdown for selecting a Slack account. Select a Slack account from the dropdown. Enter a message containing the text '{trial_id}' in the message input field. Submit the form. Verify that the form submission is successful."

    verifier = PochiVerifier()
    result = verifier.verify(
        reason=reason,
        truth=truth,
        use_browser_agent=True,
        trajectory_dir="/logs/verifier/pochi/test_browser_interaction"
    )
    assert result.status == "pass", f"Browser verification failed: {result.reason}"

def test_slack_message_sent():
    # Allow some time for the message to be delivered
    time.sleep(5)
    trial_id = get_trial_id()
    slack_token = os.environ.get("SLACK_TOKEN", "")
    assert slack_token, "SLACK_TOKEN environment variable is missing."

    # First, get the list of channels to find the ID of #general
    channels_result = subprocess.run([
        "curl", "-sS", "-H", f"Authorization: Bearer {slack_token}",
        "https://slack.com/api/conversations.list?limit=200&types=public_channel,private_channel"
    ], capture_output=True, text=True)
    assert channels_result.returncode == 0, f"curl conversations.list failed: {channels_result.stderr}"
    
    channels_data = json.loads(channels_result.stdout)
    assert channels_data.get("ok"), f"Slack API error (conversations.list): {channels_data}"
    
    channel_id = None
    for channel in channels_data.get("channels", []):
        if channel["name"] == "general":
            channel_id = channel["id"]
            break
            
    assert channel_id is not None, "Could not find #general channel in Slack workspace."

    # Next, get the history of the channel to verify the message
    history_result = subprocess.run([
        "curl", "-sS", "-H", f"Authorization: Bearer {slack_token}",
        f"https://slack.com/api/conversations.history?channel={channel_id}&limit=20"
    ], capture_output=True, text=True)
    assert history_result.returncode == 0, f"curl conversations.history failed: {history_result.stderr}"
    
    history_data = json.loads(history_result.stdout)
    assert history_data.get("ok"), f"Slack API error (conversations.history): {history_data}"
    
    messages = history_data.get("messages", [])
    found = False
    for msg in messages:
        if trial_id in msg.get("text", ""):
            found = True
            break
            
    assert found, f"Expected to find a message containing '{trial_id}' in #general, but it was not found. Recent messages: {[m.get('text') for m in messages[:5]]}"
