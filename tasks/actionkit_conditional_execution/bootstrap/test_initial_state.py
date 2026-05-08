import os
import shutil

PROJECT_DIR = "/home/user/paragon-task"
TRIAL_ID_FILE = "/logs/artifacts/trial_id"

def test_node_binary_available():
    assert shutil.which("node") is not None, "node binary not found in PATH."

def test_npm_binary_available():
    assert shutil.which("npm") is not None, "npm binary not found in PATH."

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."

def test_trial_id_file_exists():
    assert os.path.isfile(TRIAL_ID_FILE), f"Trial ID file {TRIAL_ID_FILE} does not exist."

def test_paragon_env_vars_exist():
    assert "PARAGON_PROJECT_ID" in os.environ, "PARAGON_PROJECT_ID environment variable not set."
    assert "PARAGON_USER_TOKEN" in os.environ, "PARAGON_USER_TOKEN environment variable not set."
