import os

def test_initial_state():
    """Verify the initial state before the task runs."""
    project_dir = "/home/user/project"
    
    # Check that the project directory exists
    assert os.path.exists(project_dir), "Project directory should exist"
    
    # Check that the output file does not exist yet
    output_file = os.path.join(project_dir, "output.json")
    assert not os.path.exists(output_file), "Output file should not exist initially"
    
    # Check that environment variables are set
    assert "PARAGON_PROJECT_ID" in os.environ, "PARAGON_PROJECT_ID env var must be set"
    assert "PARAGON_SIGNING_KEY" in os.environ, "PARAGON_SIGNING_KEY env var must be set"
