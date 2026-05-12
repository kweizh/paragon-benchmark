import os
import shutil

PROJECT_DIR = "/home/user/project"

def test_node_installed():
    assert shutil.which("node") is not None, "node is not installed"
    assert shutil.which("npm") is not None, "npm is not installed"

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."

def test_package_json_exists():
    package_json = os.path.join(PROJECT_DIR, "package.json")
    assert os.path.isfile(package_json), f"{package_json} does not exist."
