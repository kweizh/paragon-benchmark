import os
import shutil
import pytest

PROJECT_DIR = "/home/user/project"
REPORT_FILE = os.path.join(PROJECT_DIR, "report.txt")
TRIAL_ID_FILE = "/logs/artifacts/trial_id"

def test_node_binary_available():
    assert shutil.which("node") is not None, "node binary not found in PATH."

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."

def test_report_file_exists():
    assert os.path.isfile(REPORT_FILE), f"Report file {REPORT_FILE} does not exist."

def test_trial_id_file_exists():
    assert os.path.isfile(TRIAL_ID_FILE), f"Trial ID file {TRIAL_ID_FILE} does not exist."
