import os
import subprocess
import pytest

PROJECT_DIR = "/home/user/app"
DOWNLOADED_FILE = os.path.join(PROJECT_DIR, "downloaded.txt")

def test_download_script_execution():
    """Run the download.js script and verify it executes successfully."""
    result = subprocess.run(
        ["node", "download.js"],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True
    )
    assert result.returncode == 0, f"node download.js failed with error: {result.stderr}\nOutput: {result.stdout}"

def test_downloaded_file_exists():
    """Verify that the downloaded.txt file was created."""
    assert os.path.isfile(DOWNLOADED_FILE), f"File {DOWNLOADED_FILE} does not exist. The script did not save the file."

def test_downloaded_file_content():
    """Verify that the downloaded file contains the exact content uploaded to Slack."""
    with open(DOWNLOADED_FILE, "r") as f:
        content = f.read().strip()
    
    expected_content = "Hello Proxy API Download!"
    assert content == expected_content, f"Expected file content '{expected_content}', but got '{content}'."
