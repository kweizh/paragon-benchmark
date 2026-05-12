import os
import shutil
import pytest

def test_node_installed():
    assert shutil.which("node") is not None, "node binary not found in PATH."

def test_npm_installed():
    assert shutil.which("npm") is not None, "npm binary not found in PATH."

def test_env_vars_available():
    assert "NEXT_PUBLIC_PARAGON_PROJECT_ID" in os.environ, "NEXT_PUBLIC_PARAGON_PROJECT_ID environment variable is missing."
    assert "PARAGON_SIGNING_KEY" in os.environ, "PARAGON_SIGNING_KEY environment variable is missing."
