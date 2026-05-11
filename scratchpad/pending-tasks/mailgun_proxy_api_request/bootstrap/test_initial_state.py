import os
import shutil
import pytest

PROJECT_DIR = "/home/user/project"

def test_node_binary_available():
    assert shutil.which("node") is not None, "node binary not found in PATH."
    assert shutil.which("npm") is not None, "npm binary not found in PATH."

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."

def test_index_js_not_exists():
    index_path = os.path.join(PROJECT_DIR, "index.js")
    assert not os.path.isfile(index_path), f"File {index_path} should not exist before the task."