import os
import subprocess
import re

def test_final_state():
    script_path = "/home/user/project/delete_row.js"
    assert os.path.exists(script_path), f"Script {script_path} not found"

    # Run the script
    env = os.environ.copy()
    # Ensure PARAGON_PROJECT_ID and PARAGON_USER_TOKEN are available
    assert "PARAGON_PROJECT_ID" in env, "PARAGON_PROJECT_ID not in env"
    assert "PARAGON_USER_TOKEN" in env, "PARAGON_USER_TOKEN not in env"

    result = subprocess.run(["node", script_path], cwd="/home/user/project", capture_output=True, text=True, env=env)
    
    # Verify output log
    log_path = "/home/user/project/output.log"
    assert os.path.exists(log_path), "output.log not found"
    with open(log_path, "r") as f:
        log_content = f.read().strip()
    
    # The status code could be 200, 400, etc. depending on the real database state.
    # We just verify it's a 3-digit number.
    assert re.match(r"^\d{3}$", log_content), f"Expected a 3-digit HTTP status code in output.log, got {log_content}"
