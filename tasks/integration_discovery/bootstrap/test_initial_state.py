import os
import shutil
import subprocess
import pytest

PROJECT_DIR = "/home/user/integration_discovery"

def test_project_dir_exists():
    assert os.path.isdir(PROJECT_DIR), f"Project directory {PROJECT_DIR} does not exist."
