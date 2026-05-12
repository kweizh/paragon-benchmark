import os
import subprocess
import json
import pytest

PROJECT_DIR = "/home/user/project"
OUTPUT_FILE = os.path.join(PROJECT_DIR, "tools.json")

def test_convert_script_execution():
    """Priority 1: Run the node script and verify it executes successfully."""
    script_path = os.path.join(PROJECT_DIR, "convert.js")
    assert os.path.isfile(script_path), f"Script {script_path} does not exist."

    # The environment variables PARAGON_PROJECT_ID and PARAGON_USER_TOKEN 
    # should be provided by the environment, so we just run the script.
    result = subprocess.run(
        ["node", "convert.js"],
        capture_output=True, text=True, cwd=PROJECT_DIR
    )
    assert result.returncode == 0, f"'node convert.js' failed: {result.stderr}"

def test_tools_json_output():
    """Priority 3: Verify the generated tools.json file matches the expected schema."""
    assert os.path.isfile(OUTPUT_FILE), f"Output file {OUTPUT_FILE} was not created."

    with open(OUTPUT_FILE, "r") as f:
        try:
            tools = json.load(f)
        except json.JSONDecodeError as e:
            pytest.fail(f"tools.json is not valid JSON: {e}")

    assert isinstance(tools, list), "Expected tools.json to contain a JSON array."
    assert len(tools) > 0, "Expected tools array to not be empty."

    for i, tool in enumerate(tools):
        assert "type" in tool, f"Item at index {i} is missing 'type' property."
        assert tool["type"] == "function", f"Item at index {i} has type '{tool['type']}', expected 'function'."
        
        assert "function" in tool, f"Item at index {i} is missing 'function' property."
        func = tool["function"]
        assert isinstance(func, dict), f"Item at index {i} 'function' property is not an object."
        
        assert "name" in func, f"Item at index {i} 'function' is missing 'name' property."
        assert "description" in func, f"Item at index {i} 'function' is missing 'description' property."
        assert "parameters" in func, f"Item at index {i} 'function' is missing 'parameters' property."
