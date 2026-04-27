import os
import shutil
import subprocess
import json

PROJECT_DIR = "/home/user/project"
TRAIL_ID_FILE = "/logs/artifacts/trial_id"
CHANNEL_BASENAME = "test-channel"

def get_trail_id():
    with open(TRAIL_ID_FILE, "r") as f:
        return f.read().strip()

def test_node_binary_available():
    assert shutil.which("node") is not None, "node binary not found in PATH."

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."

def test_create_slack_channel():
    trail_id = get_trail_id()
    channel_name = f"{CHANNEL_BASENAME}-{trail_id}"
    slack_token = os.environ.get("SLACK_TOKEN")
    assert slack_token, "SLACK_TOKEN environment variable is not set."

    # Create the channel
    result = subprocess.run([
        "curl", "-sS", "-X", "POST",
        "-H", f"Authorization: Bearer {slack_token}",
        "-H", "Content-Type: application/json; charset=utf-8",
        "-d", json.dumps({"name": channel_name}),
        "https://slack.com/api/conversations.create"
    ], capture_output=True, text=True)
    assert result.returncode == 0, f"curl conversations.create failed: {result.stderr}"
    data = json.loads(result.stdout)
    assert data.get("ok") or data.get("error") == "name_taken", f"Failed to create channel: {data}"
