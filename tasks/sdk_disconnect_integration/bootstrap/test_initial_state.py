import os
import shutil
import subprocess
import pytest

PROJECT_DIR = "/home/user/app"

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."

def test_disconnect_file_exists():
    file_path = os.path.join(PROJECT_DIR, "disconnect.js")
    assert os.path.isfile(file_path), f"File {file_path} does not exist."

def test_package_json_exists():
    file_path = os.path.join(PROJECT_DIR, "package.json")
    assert os.path.isfile(file_path), f"File {file_path} does not exist."
