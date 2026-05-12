import os
import shutil
import pytest

PROJECT_DIR = "/home/user/project"

def test_node_installed():
    assert shutil.which("node") is not None, "node binary not found in PATH."
    assert shutil.which("npm") is not None, "npm binary not found in PATH."

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."

def test_paragon_env_vars():
    assert "PARAGON_PROJECT_ID" in os.environ, "PARAGON_PROJECT_ID environment variable is missing."
    assert "PARAGON_SIGNING_KEY" in os.environ, "PARAGON_SIGNING_KEY environment variable is missing."

def test_slack_env_vars():
    assert "SLACK_TOKEN" in os.environ, "SLACK_TOKEN environment variable is missing."
