import os
import pytest

PROJECT_DIR = "/home/user/app"

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."

def test_app_js_exists():
    app_js_path = os.path.join(PROJECT_DIR, "src", "App.js")
    assert os.path.isfile(app_js_path), f"File {app_js_path} does not exist."

def test_paragon_imported_in_app_js():
    app_js_path = os.path.join(PROJECT_DIR, "src", "App.js")
    with open(app_js_path) as f:
        content = f.read()
    assert "import { paragon } from '@useparagon/connect'" in content or "import { paragon } from \"@useparagon/connect\"" in content, \
        "Expected @useparagon/connect import in App.js."
