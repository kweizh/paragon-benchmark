import os
import json
import subprocess
import pytest

PROJECT_DIR = "/home/user/project"
ACTIONS_FILE = os.path.join(PROJECT_DIR, "actions.json")
RESULTS_FILE = os.path.join(PROJECT_DIR, "results.json")
SCRIPT_FILE = os.path.join(PROJECT_DIR, "batch_execute.js")

@pytest.fixture(scope="module", autouse=True)
def setup_and_run_script():
    # Setup actions.json before tests run
    actions_data = [
        {
            "action": "SLACK_SEND_MESSAGE",
            "parameters": {
                "channel": "#general",
                "message": "Hello from Paragon Batch 1!"
            }
        },
        {
            "action": "SLACK_SEND_MESSAGE",
            "parameters": {
                "channel": "#general",
                "message": "Hello from Paragon Batch 2!"
            }
        }
    ]
    with open(ACTIONS_FILE, "w") as f:
        json.dump(actions_data, f)
        
    # Run the script
    result = subprocess.run(
        ["node", "batch_execute.js"],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True
    )
    
    yield result

def test_script_exists():
    assert os.path.isfile(SCRIPT_FILE), f"Script {SCRIPT_FILE} does not exist."

def test_script_execution(setup_and_run_script):
    result = setup_and_run_script
    assert result.returncode == 0, f"Script execution failed with error: {result.stderr}"

def test_results_file_created_and_valid():
    assert os.path.isfile(RESULTS_FILE), f"Results file {RESULTS_FILE} was not created."
    
    with open(RESULTS_FILE, "r") as f:
        try:
            results = json.load(f)
        except json.JSONDecodeError:
            pytest.fail(f"Results file {RESULTS_FILE} is not valid JSON.")
            
    assert isinstance(results, list), "Results should be a JSON array."
    assert len(results) == 2, f"Expected 2 results, got {len(results)}."
    
    for i, res in enumerate(results):
        assert isinstance(res, dict), f"Result {i} is not a JSON object."
