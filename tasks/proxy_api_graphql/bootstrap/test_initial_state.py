import os
import shutil
import pytest

PROJECT_DIR = "/home/user/app"

def test_node_binary_available():
    assert shutil.which("node") is not None, "node binary not found in PATH."

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."

def test_script_file_exists():
    script_path = os.path.join(PROJECT_DIR, "script.js")
    assert os.path.isfile(script_path), f"Script file {script_path} does not exist."
