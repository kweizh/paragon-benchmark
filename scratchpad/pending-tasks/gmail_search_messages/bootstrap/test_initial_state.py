import os
import shutil
import json
import pytest

PROJECT_DIR = "/home/user/app"

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."

def test_package_json_exists():
    package_json_path = os.path.join(PROJECT_DIR, "package.json")
    assert os.path.isfile(package_json_path), f"package.json not found in {PROJECT_DIR}."

def test_paragon_sdk_installed():
    package_json_path = os.path.join(PROJECT_DIR, "package.json")
    with open(package_json_path) as f:
        data = json.load(f)
    deps = data.get("dependencies", {})
    assert "@useparagon/connect" in deps, "Expected '@useparagon/connect' in dependencies of package.json."
    assert "jsonwebtoken" in deps, "Expected 'jsonwebtoken' in dependencies of package.json."
