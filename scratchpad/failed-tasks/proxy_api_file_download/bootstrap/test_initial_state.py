import os
import shutil
import subprocess
import json

PROJECT_DIR = "/home/user/app"

def test_node_binary_available():
    assert shutil.which("node") is not None, "node binary not found in PATH."

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."

def test_create_slack_file():
    slack_token = os.environ.get("SLACK_TOKEN")
    assert slack_token, "SLACK_TOKEN environment variable is not set."

    # Upload a file to Slack
    result = subprocess.run([
        "curl", "-sS", "-X", "POST",
        "-H", f"Authorization: Bearer {slack_token}",
        "-F", "content=Hello Proxy API Download!",
        "-F", "filename=test_download.txt",
        "https://slack.com/api/files.upload"
    ], capture_output=True, text=True)
    assert result.returncode == 0, f"curl files.upload failed: {result.stderr}"
    data = json.loads(result.stdout)
    assert data.get("ok"), f"Failed to upload file to Slack: {data}"
    
    url_private = data.get("file", {}).get("url_private")
    assert url_private, f"url_private not found in response: {data}"
    
    url_file_path = os.path.join(PROJECT_DIR, "file_url.txt")
    with open(url_file_path, "w") as f:
        f.write(url_private)
    
    assert os.path.isfile(url_file_path), f"Failed to create {url_file_path}"
