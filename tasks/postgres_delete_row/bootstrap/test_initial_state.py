import os

def test_initial_state():
    project_dir = "/home/user/project"
    assert os.path.exists(project_dir), f"Directory {project_dir} should exist"
    assert os.path.isdir(project_dir), f"{project_dir} should be a directory"
    
    # Ensure it's empty
    files = os.listdir(project_dir)
    assert len(files) == 0, f"Directory {project_dir} should be empty initially"
