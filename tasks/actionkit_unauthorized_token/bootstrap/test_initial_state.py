import os
import shutil
import subprocess
import pytest

PROJECT_DIR = "/home/user/actionkit-project"

def test_node_installed():
    assert shutil.which("node") is not None, "Node.js binary not found in PATH."

def test_npm_installed():
    assert shutil.which("npm") is not None, "npm binary not found in PATH."

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."

def test_fetch_actions_script_exists():
    script_path = os.path.join(PROJECT_DIR, "fetch_actions.js")
    assert os.path.isfile(script_path), f"Script {script_path} does not exist."

def test_package_json_exists():
    pkg_path = os.path.join(PROJECT_DIR, "package.json")
    assert os.path.isfile(pkg_path), f"package.json {pkg_path} does not exist."
