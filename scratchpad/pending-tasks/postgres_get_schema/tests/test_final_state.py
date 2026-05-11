import os
import json
import pytest

PROJECT_DIR = "/home/user/paragon-postgres"
SCHEMA_FILE = os.path.join(PROJECT_DIR, "schema.json")

def test_schema_file_exists():
    assert os.path.isfile(SCHEMA_FILE), f"The file {SCHEMA_FILE} was not created."

def test_schema_file_is_valid_json():
    with open(SCHEMA_FILE, "r") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError as e:
            pytest.fail(f"The file {SCHEMA_FILE} does not contain valid JSON: {e}")
    
    # Check if it has some expected structure, though we don't know the exact structure returned by Paragon ActionKit for Postgres get schema.
    # We can at least ensure it's a dict or list.
    assert isinstance(data, (dict, list)), f"Expected JSON object or array, got {type(data)}"
