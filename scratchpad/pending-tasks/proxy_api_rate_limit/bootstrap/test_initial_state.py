import os
import shutil

def test_node_installed():
    assert shutil.which("node") is not None, "Node.js is not installed."
    assert shutil.which("npm") is not None, "npm is not installed."

def test_project_directory_exists():
    assert os.path.isdir("/home/user/app"), "/home/user/app directory does not exist."
