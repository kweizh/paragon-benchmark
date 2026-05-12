import os
import subprocess
import json
import pytest

PROJECT_DIR = "/home/user/proxy_api_custom_headers"
SCRIPT_PATH = os.path.join(PROJECT_DIR, "index.js")
OUTPUT_FILE = os.path.join(PROJECT_DIR, "output.json")

def test_script_exists():
    assert os.path.isfile(SCRIPT_PATH), f"Script not found at {SCRIPT_PATH}"

def test_script_execution_and_custom_header():
    # Prepare environment variables
    env = os.environ.copy()
    
    # Ensure required keys exist in the environment
    required_keys = ["PARAGON_PROJECT_ID", "PARAGON_USER_TOKEN"]
    for key in required_keys:
        assert key in env, f"Required environment variable {key} is missing for testing."

    # Set the target proxy URL to httpbin to inspect headers
    env["TARGET_PROXY_URL"] = "https://httpbin.org/headers"
    # Use a default integration if not provided
    if "TARGET_INTEGRATION" not in env:
        env["TARGET_INTEGRATION"] = "slack"

    # Remove old output.json if it exists
    if os.path.exists(OUTPUT_FILE):
        os.remove(OUTPUT_FILE)

    # Run the script
    result = subprocess.run(
        ["node", "index.js"],
        cwd=PROJECT_DIR,
        env=env,
        capture_output=True,
        text=True
    )
    
    assert result.returncode == 0, f"Script execution failed: {result.stderr}"
    assert os.path.isfile(OUTPUT_FILE), f"output.json was not created at {OUTPUT_FILE}"

    # Verify the output JSON
    with open(OUTPUT_FILE, "r") as f:
        try:
            response_data = json.load(f)
        except json.JSONDecodeError:
            pytest.fail("output.json does not contain valid JSON.")

    # httpbin.org/headers returns the headers in a "headers" object
    headers = response_data.get("headers", {})
    
    # httpbin capitalizes headers like "X-Custom-Header", but it's safer to check case-insensitively
    headers_lower = {k.lower(): v for k, v in headers.items()}
    
    assert "x-custom-header" in headers_lower, "The X-Custom-Header was not found in the target API request."
    assert headers_lower["x-custom-header"] == "Harbor-Test", f"Expected X-Custom-Header to be 'Harbor-Test', got: {headers_lower['x-custom-header']}"
