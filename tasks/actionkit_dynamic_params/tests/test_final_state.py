import os
import subprocess
import json
import time

TRAIL_ID_FILE = "/logs/artifacts/trial_id"
PROJECT_DIR = "/home/user/project"
SCRIPT_FILE = os.path.join(PROJECT_DIR, "send_message.js")
LOG_FILE = os.path.join(PROJECT_DIR, "output.log")
CHANNEL_BASENAME = "test-channel"

def get_trail_id():
    with open(TRAIL_ID_FILE, "r") as f:
        return f.read().strip()

def test_script_exists():
    assert os.path.isfile(SCRIPT_FILE), f"Script file {SCRIPT_FILE} not found."

def test_script_reads_trail_id():
    with open(SCRIPT_FILE, "r") as f:
        content = f.read()
    assert "/logs/artifacts/trial_id" in content, "Expected script to read from /logs/artifacts/trial_id"

def test_log_file_exists():
    assert os.path.isfile(LOG_FILE), f"Log file {LOG_FILE} not found."

def test_slack_message_sent():
    trail_id = get_trail_id()
    channel_name = f"{CHANNEL_BASENAME}-{trail_id}"
    slack_token = os.environ.get("SLACK_TOKEN")
    assert slack_token, "SLACK_TOKEN environment variable is not set."

    # 1. Get channel ID
    result = subprocess.run([
        "curl", "-sS", "-H", f"Authorization: Bearer {slack_token}",
        "https://slack.com/api/conversations.list?limit=200&types=public_channel,private_channel"
    ], capture_output=True, text=True)
    assert result.returncode == 0, f"curl conversations.list failed: {result.stderr}"
    data = json.loads(result.stdout)
    assert data.get("ok"), f"Slack API error: {data}"

    channels = data.get("channels", [])
    channel_id = None
    for c in channels:
        if c["name"] == channel_name:
            channel_id = c["id"]
            break

    assert channel_id is not None, f"Expected channel '{channel_name}' not found in Slack workspace."

    # 2. Get messages from channel
    history_result = subprocess.run([
        "curl", "-sS", "-H", f"Authorization: Bearer {slack_token}",
        f"https://slack.com/api/conversations.history?channel={channel_id}&limit=50"
    ], capture_output=True, text=True)
    assert history_result.returncode == 0, f"curl conversations.history failed: {history_result.stderr}"
    history_data = json.loads(history_result.stdout)
    assert history_data.get("ok"), f"Slack API history error: {history_data}"

    messages = history_data.get("messages", [])
    message_found = False
    for msg in messages:
        if "Hello from ActionKit!" in msg.get("text", ""):
            message_found = True
            break

    assert message_found, f"Expected message 'Hello from ActionKit!' not found in channel '{channel_name}'"

def test_cleanup_slack_channel():
    trail_id = get_trail_id()
    channel_name = f"{CHANNEL_BASENAME}-{trail_id}"
    slack_token = os.environ.get("SLACK_TOKEN")
    assert slack_token, "SLACK_TOKEN environment variable is not set."

    # 1. Get channel ID
    result = subprocess.run([
        "curl", "-sS", "-H", f"Authorization: Bearer {slack_token}",
        "https://slack.com/api/conversations.list?limit=200&types=public_channel,private_channel"
    ], capture_output=True, text=True)
    assert result.returncode == 0, f"curl conversations.list failed: {result.stderr}"
    data = json.loads(result.stdout)
    assert data.get("ok"), f"Slack API error: {data}"

    channels = data.get("channels", [])
    channel_id = None
    for c in channels:
        if c["name"] == channel_name:
            channel_id = c["id"]
            break

    if channel_id:
        # 2. Archive the channel
        archive_result = subprocess.run([
            "curl", "-sS", "-X", "POST",
            "-H", f"Authorization: Bearer {slack_token}",
            "-H", "Content-Type: application/json; charset=utf-8",
            "-d", json.dumps({"channel": channel_id}),
            "https://slack.com/api/conversations.archive"
        ], capture_output=True, text=True)
        assert archive_result.returncode == 0, f"curl conversations.archive failed: {archive_result.stderr}"
        archive_data = json.loads(archive_result.stdout)
        assert archive_data.get("ok") or archive_data.get("error") == "already_archived", f"Failed to archive channel: {archive_data}"
