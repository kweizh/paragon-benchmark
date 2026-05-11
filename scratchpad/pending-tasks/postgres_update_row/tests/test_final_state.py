import os
import json
import subprocess

def test_final_state():
    """Verify the final state after the task runs."""
    project_dir = "/home/user/project"
    script_path = os.path.join(project_dir, "update_user.js")
    output_file = os.path.join(project_dir, "output.json")
    
    # Check that the script exists
    assert os.path.exists(script_path), "update_user.js should exist"
    
    # Run the script
    env = os.environ.copy()
    result = subprocess.run(["node", "update_user.js"], cwd=project_dir, env=env, capture_output=True, text=True)
    assert result.returncode == 0, f"Script failed with exit code {result.returncode}\nstdout: {result.stdout}\nstderr: {result.stderr}"
    
    # Verify the output file exists
    assert os.path.exists(output_file), "output.json should exist"
    
    # Read the JSON response
    with open(output_file, 'r') as f:
        try:
            output_data = json.load(f)
        except json.JSONDecodeError:
            assert False, "output.json is not valid JSON"
    
    # Verify that the response indicates success
    # Depending on Paragon's specific API response, we check for generic success indicators
    assert isinstance(output_data, dict), "Output should be a JSON object"
    
    # Check if the execution was successful or has a result
    # ActionKit responses usually contain the result of the action
    # We'll just verify it's a non-empty object or contains some expected keys
    assert len(output_data.keys()) > 0, "Output JSON should not be empty"
