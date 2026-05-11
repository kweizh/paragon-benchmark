import os

def test_project_directory_exists():
    assert os.path.isdir("/home/user/project"), "Project directory /home/user/project does not exist."

def test_node_installed():
    import subprocess
    result = subprocess.run(["node", "-v"], capture_output=True, text=True)
    assert result.returncode == 0, "Node.js is not installed."
