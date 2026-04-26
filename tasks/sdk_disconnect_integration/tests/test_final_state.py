import os
import re
import pytest

PROJECT_DIR = "/home/user/app"

def test_disconnect_slack_implementation():
    file_path = os.path.join(PROJECT_DIR, "disconnect.js")
    with open(file_path, "r") as f:
        content = f.read()
    
    # Check if paragon.uninstallIntegration('slack') is called.
    # Use regex to match the function call with any quotes and optional whitespace.
    pattern = r"paragon\.uninstallIntegration\s*\(\s*['\"`]slack['\"`]\s*\)"
    match = re.search(pattern, content)
    
    assert match is not None, "Expected paragon.uninstallIntegration('slack') to be called."
