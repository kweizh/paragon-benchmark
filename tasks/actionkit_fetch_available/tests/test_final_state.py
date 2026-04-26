import os
import json
import pytest

PROJECT_DIR = "/home/user"
ACTIONS_FILE = os.path.join(PROJECT_DIR, "actions.json")

def test_actions_file_exists():
    """Priority 3: Check if the actions.json file was created."""
    assert os.path.isfile(ACTIONS_FILE), f"Expected file {ACTIONS_FILE} does not exist."

def test_actions_file_is_valid_json():
    """Priority 3: Check if the actions.json file contains valid JSON."""
    with open(ACTIONS_FILE, "r") as f:
        content = f.read()
    
    assert len(content.strip()) > 0, f"File {ACTIONS_FILE} is empty."
    
    try:
        json.loads(content)
    except json.JSONDecodeError as e:
        pytest.fail(f"File {ACTIONS_FILE} does not contain valid JSON. Error: {e}\nContent: {content}")
