import os
import shutil
import json
import pytest

PROJECT_DIR = "/home/user/app"

def test_node_binary_available():
    assert shutil.which("node") is not None, "node binary not found in PATH."

def test_npm_binary_available():
    assert shutil.which("npm") is not None, "npm binary not found in PATH."

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."

def test_llm_response_file_exists():
    file_path = os.path.join(PROJECT_DIR, "llm_response.json")
    assert os.path.isfile(file_path), f"File {file_path} does not exist."
    with open(file_path) as f:
        content = json.load(f)
    assert content.get("action") == "SLACK_SEND_MESSAGE", "Expected action 'SLACK_SEND_MESSAGE' in llm_response.json."
