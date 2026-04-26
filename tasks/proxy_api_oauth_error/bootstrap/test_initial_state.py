import os
import shutil
import pytest

PROJECT_DIR = "/home/user/app"

def test_node_available():
    assert shutil.which("node") is not None, "node binary not found in PATH."

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."

def test_fetch_data_script_exists():
    script_path = os.path.join(PROJECT_DIR, "fetch_data.js")
    assert os.path.isfile(script_path), f"Script file {script_path} does not exist."
    with open(script_path) as f:
        content = f.read()
    assert "https://proxy.useparagon.com/projects/TEST_PROJECT/sdk/proxy/slack/users.identity" in content, \
        "Expected fetch_data.js to contain the proxy API URL."
