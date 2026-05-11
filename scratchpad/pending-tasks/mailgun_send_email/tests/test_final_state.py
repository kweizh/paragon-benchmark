import os
import subprocess

def test_final_state():
    script_path = "/home/user/mailgun_task/send_email.js"
    assert os.path.exists(script_path), f"Script not found at {script_path}"
    
    # Run the script
    result = subprocess.run(
        ["node", "send_email.js"],
        cwd="/home/user/mailgun_task",
        capture_output=True,
        text=True
    )
    
    assert result.returncode == 0, f"Script failed with exit code {result.returncode}.\\nSTDOUT: {result.stdout}\\nSTDERR: {result.stderr}"
