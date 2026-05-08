import os
import shutil
import subprocess
import pytest

PROJECT_DIR = "/home/user/project"

def test_node_binary_available():
    assert shutil.which("node") is not None, "node binary not found in PATH."

def test_node_version_is_18_or_higher():
    result = subprocess.run(["node", "-v"], capture_output=True, text=True)
    assert result.returncode == 0, "Failed to get node version."
    version_str = result.stdout.strip().lstrip("v")
    major_version = int(version_str.split(".")[0])
    assert major_version >= 18, f"Node.js version must be 18 or higher, got {version_str}."

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."
