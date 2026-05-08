import os
import subprocess
import json

TRIAL_ID_FILE = "/logs/artifacts/trial_id"
PROJECT_DIR = "/home/user/paragon-task"
LOG_FILE = os.path.join(PROJECT_DIR, "output.log")
TARGET_CHANNEL_NAME = "general"

def get_trial_id():
    with open(TRIAL_ID_FILE, "r") as f:
        return f.read().strip()

def test_script_execution():
    """Run the user's script to ensure it executes without errors."""
    script_path = os.path.join(PROJECT_DIR, "index.js")
    assert os.path.isfile(script_path), "index.js not found."
    
    result = subprocess.run(
        ["node", "index.js"],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True
    )
    assert result.returncode == 0, f"Script execution failed: {result.stderr}"

def test_log_file_exists():
    assert os.path.isfile(LOG_FILE), f"Log file {LOG_FILE} not found."

def test_slack_message_sent():
    trial_id = get_trial_id()
    slack_token = os.environ.get("SLACK_TOKEN")
    assert slack_token is not None, "SLACK_TOKEN environment variable not set."

    # 1. Get channel list to find the ID of #general
    list_result = subprocess.run([
        "curl", "-sS", "-H", f"Authorization: Bearer {slack_token}",
        "https://slack.com/api/conversations.list?limit=200&types=public_channel,private_channel"
    ], capture_output=True, text=True)
    assert list_result.returncode == 0, f"curl conversations.list failed: {list_result.stderr}"
    
    list_data = json.loads(list_result.stdout)
    assert list_data.get("ok"), f"Slack API error: {list_data}"
    
    channels = list_data.get("channels", [])
    channel_id = None
    for c in channels:
        if c["name"] == TARGET_CHANNEL_NAME:
            channel_id = c["id"]
            break
            
    assert channel_id is not None, f"Channel #{TARGET_CHANNEL_NAME} not found."

    # 2. Get channel history to find the message
    history_result = subprocess.run([
        "curl", "-sS", "-H", f"Authorization: Bearer {slack_token}",
        f"https://slack.com/api/conversations.history?channel={channel_id}&limit=100"
    ], capture_output=True, text=True)
    assert history_result.returncode == 0, f"curl conversations.history failed: {history_result.stderr}"
    
    history_data = json.loads(history_result.stdout)
    assert history_data.get("ok"), f"Slack API error: {history_data}"
    
    messages = history_data.get("messages", [])
    message_found = False
    for msg in messages:
        if trial_id in msg.get("text", ""):
            message_found = True
            break
            
    assert message_found, f"Message containing trial_id '{trial_id}' not found in #{TARGET_CHANNEL_NAME}."
