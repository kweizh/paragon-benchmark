import os
import json
import pytest

PROJECT_DIR = "/home/user/app"

def test_package_json_has_paragon_connect():
    package_json_path = os.path.join(PROJECT_DIR, "package.json")
    assert os.path.isfile(package_json_path), f"package.json not found at {package_json_path}"
    
    with open(package_json_path) as f:
        data = json.load(f)
    
    deps = data.get("dependencies", {})
    dev_deps = data.get("devDependencies", {})
    
    assert "@useparagon/connect" in deps or "@useparagon/connect" in dev_deps, \
        "Expected '@useparagon/connect' in package.json dependencies or devDependencies."

def _search_files(directory, extensions, search_string):
    for root, dirs, files in os.walk(directory):
        if "node_modules" in dirs:
            dirs.remove("node_modules")
        if ".git" in dirs:
            dirs.remove(".git")
        if "dist" in dirs:
            dirs.remove("dist")
            
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                file_path = os.path.join(root, file)
                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                    if search_string in content:
                        return True
    return False

def test_source_code_contains_authenticate():
    extensions = [".js", ".jsx", ".ts", ".tsx"]
    found = _search_files(PROJECT_DIR, extensions, "paragon.authenticate")
    assert found, "Expected to find a call to 'paragon.authenticate' in the source code."

def test_source_code_contains_get_user():
    extensions = [".js", ".jsx", ".ts", ".tsx"]
    found = _search_files(PROJECT_DIR, extensions, "paragon.getUser")
    assert found, "Expected to find a call to 'paragon.getUser' in the source code."

def test_source_code_contains_div_id():
    extensions = [".js", ".jsx", ".ts", ".tsx", ".html"]
    found = _search_files(PROJECT_DIR, extensions, "id=\"paragon-user-state\"") or \
            _search_files(PROJECT_DIR, extensions, "id='paragon-user-state'")
    assert found, "Expected to find an element with id='paragon-user-state' in the source code."
