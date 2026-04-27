import os
import subprocess
import json
import pytest

PROJECT_DIR = "/home/user/app"
EXECUTE_FILE = os.path.join(PROJECT_DIR, "execute.js")
PACKAGE_JSON = os.path.join(PROJECT_DIR, "package.json")
OUTPUT_JSON = os.path.join(PROJECT_DIR, "output.json")

def test_execute_js_exists():
    """Priority 3 fallback: basic file existence check."""
    assert os.path.isfile(EXECUTE_FILE), f"execute.js not found at {EXECUTE_FILE}"

def test_package_json_has_jsonwebtoken():
    """Priority 3 fallback: check package.json dependencies."""
    assert os.path.isfile(PACKAGE_JSON), f"package.json not found at {PACKAGE_JSON}"
    with open(PACKAGE_JSON) as f:
        pkg = json.load(f)
    deps = pkg.get("dependencies", {})
    assert "jsonwebtoken" in deps, "Expected 'jsonwebtoken' in package.json dependencies."

def test_running_script_produces_output():
    """Priority 1: Use node CLI to run the function and verify it works without throwing errors."""
    if os.path.exists(OUTPUT_JSON):
        os.remove(OUTPUT_JSON)

    env = os.environ.copy()

    result = subprocess.run(
        ["node", "execute.js"],
        capture_output=True, text=True, cwd=PROJECT_DIR, env=env
    )

    assert result.returncode == 0, f"'node execute.js' failed: {result.stderr}"
    assert os.path.isfile(OUTPUT_JSON), f"Expected {OUTPUT_JSON} to be created after running the script."

def test_output_json_structure():
    """Priority 3 fallback: verify the output.json structure."""
    assert os.path.isfile(OUTPUT_JSON), f"output.json not found at {OUTPUT_JSON}"
    with open(OUTPUT_JSON) as f:
        try:
            content = json.load(f)
        except json.JSONDecodeError:
            pytest.fail("output.json does not contain valid JSON.")

    assert "status" in content, "Expected 'status' key in output.json."
