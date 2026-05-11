import os
import shutil
import pytest

PROJECT_DIR = "/home/user/project"

def test_node_available():
    assert shutil.which("node") is not None, "node binary not found in PATH."

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."

def test_env_vars_exist():
    assert "PARAGON_PROJECT_ID" in os.environ, "PARAGON_PROJECT_ID environment variable is missing."
    assert "PARAGON_USER_TOKEN" in os.environ, "PARAGON_USER_TOKEN environment variable is missing."
    assert "MAILGUN_DOMAIN" in os.environ, "MAILGUN_DOMAIN environment variable is missing."
