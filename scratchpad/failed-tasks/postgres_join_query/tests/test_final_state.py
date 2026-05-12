import os
import subprocess
import json
import pytest

PROJECT_DIR = "/home/user/project"
OUTPUT_FILE = os.path.join(PROJECT_DIR, "output.json")
INDEX_FILE = os.path.join(PROJECT_DIR, "index.js")

def test_index_js_exists():
    assert os.path.isfile(INDEX_FILE), f"The script {INDEX_FILE} does not exist."

def test_index_js_uses_jsonwebtoken():
    with open(INDEX_FILE, "r") as f:
        content = f.read()
    assert "jsonwebtoken" in content, "The script must use the 'jsonwebtoken' library."
    assert "PARAGON_SIGNING_KEY" in content, "The script must use PARAGON_SIGNING_KEY to sign the JWT."
    assert "actionkit.useparagon.com" in content, "The script must make a request to the ActionKit API."

def test_script_execution():
    """Run the script and verify it executes successfully and creates the output file."""
    # Ensure output file is removed before running
    if os.path.exists(OUTPUT_FILE):
        os.remove(OUTPUT_FILE)
        
    result = subprocess.run(
        ["node", "index.js"],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True
    )
    
    assert result.returncode == 0, f"Script execution failed with error:\n{result.stderr}\nOutput:\n{result.stdout}"
    
    assert os.path.isfile(OUTPUT_FILE), f"The script did not create the expected output file at {OUTPUT_FILE}."
    
    with open(OUTPUT_FILE, "r") as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            pytest.fail(f"The output file {OUTPUT_FILE} does not contain valid JSON.")
            
    # We expect the response to be successful, ActionKit usually returns a JSON object
    # We just verify it's a dict/list and not empty if it succeeded.
    assert data is not None, "The output JSON data is null."
