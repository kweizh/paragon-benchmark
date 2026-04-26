import os
import subprocess
import pytest

PROJECT_DIR = "/home/user/app"

def test_script_handles_401_and_writes_log():
    """Run the script and verify it creates error.log with the correct message."""
    result = subprocess.run(
        ["node", "fetch_data.js"],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True
    )
    
    assert result.returncode == 0, f"Script failed with error: {result.stderr}"
    
    log_file = os.path.join(PROJECT_DIR, "error.log")
    assert os.path.isfile(log_file), f"Expected {log_file} to be created."
    
    with open(log_file) as f:
        content = f.read().strip()
        
    assert content == "User needs to reconnect", f"Expected log to contain 'User needs to reconnect', got: {content}"
