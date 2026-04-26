import os
import pytest

SCRIPT_FILE = "/home/user/project/batch_execute.js"

def test_script_exists():
    assert os.path.isfile(SCRIPT_FILE), f"The script file does not exist at {SCRIPT_FILE}"

def test_script_exports_function():
    with open(SCRIPT_FILE, "r") as f:
        content = f.read()
    assert "module.exports" in content, "The script must export a function using module.exports."
    assert "executeActions" in content, "The script must define and export the 'executeActions' function."

def test_script_uses_correct_url():
    with open(SCRIPT_FILE, "r") as f:
        content = f.read()
    assert "https://actionkit.useparagon.com/projects" in content, "The script must use the correct Paragon ActionKit API URL."

def test_script_includes_authorization_header():
    with open(SCRIPT_FILE, "r") as f:
        content = f.read()
    assert "Authorization" in content, "The script must include the 'Authorization' header."
    assert "Bearer" in content, "The authorization header must use 'Bearer' token."
