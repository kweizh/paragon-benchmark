import os
import shutil
import pytest

PROJECT_DIR = "/home/user/project"

def test_node_available():
    assert shutil.which("node") is not None, "Node.js is not installed or not in PATH."
    assert shutil.which("npm") is not None, "npm is not installed or not in PATH."

def test_project_directory_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."

def test_environment_variables_set():
    assert "PARAGON_SIGNING_KEY" in os.environ, "PARAGON_SIGNING_KEY environment variable is not set."
    assert "PROJECT_ID" in os.environ, "PROJECT_ID environment variable is not set."
