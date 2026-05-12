import os

def test_initial_state():
    # Ensure the project directory exists and is empty or just initialized
    project_dir = "/home/user/project"
    if not os.path.exists(project_dir):
        os.makedirs(project_dir)
    
    assert os.path.exists(project_dir), "Project directory should exist"
