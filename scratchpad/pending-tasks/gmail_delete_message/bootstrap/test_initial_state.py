import os
import shutil
import pytest

def test_node_installed():
    assert shutil.which("node") is not None, "node is not installed"

def test_npm_installed():
    assert shutil.which("npm") is not None, "npm is not installed"
