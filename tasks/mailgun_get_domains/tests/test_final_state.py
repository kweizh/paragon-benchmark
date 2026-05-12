import os
import subprocess
import json
import pytest

PROJECT_DIR = "/home/user/app"
OUTPUT_FILE = os.path.join(PROJECT_DIR, "output.json")

def test_script_execution_and_output():
    # Priority 3: Run the script and check the output file
    # Ensure env vars are passed
    env = os.environ.copy()
    
    result = subprocess.run(
        ["node", "index.js"],
        capture_output=True, text=True, cwd=PROJECT_DIR, env=env
    )
    assert result.returncode == 0, f"'node index.js' failed: {result.stderr}"
    
    assert os.path.isfile(OUTPUT_FILE), f"Output file not found at {OUTPUT_FILE}"
    
    with open(OUTPUT_FILE) as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            pytest.fail(f"Output file {OUTPUT_FILE} is not valid JSON.")
            
    # Mailgun get domains response typically contains 'items' or 'total_count'
    # Since we just need to verify it's a Mailgun response, we can check for common keys
    # or just ensure it's a dict/list.
    assert isinstance(data, (dict, list)), "Output JSON should be a dictionary or list."
