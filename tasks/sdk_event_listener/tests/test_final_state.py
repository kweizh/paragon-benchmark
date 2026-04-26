import os
import pytest

PROJECT_DIR = "/home/user/app"

def test_paragon_subscribe_called():
    app_js_path = os.path.join(PROJECT_DIR, "src", "App.js")
    with open(app_js_path) as f:
        content = f.read()
    assert "paragon.subscribe(" in content, "Expected paragon.subscribe to be called in App.js."
    assert "\"onIntegrationInstall\"" in content or "'onIntegrationInstall'" in content, \
        "Expected paragon.subscribe to listen for 'onIntegrationInstall'."

def test_console_log_integration_id():
    app_js_path = os.path.join(PROJECT_DIR, "src", "App.js")
    with open(app_js_path) as f:
        content = f.read()
    assert "console.log" in content, "Expected console.log in App.js."
    assert "Integration installed:" in content, "Expected 'Integration installed:' in console.log."
    assert "integrationId" in content, "Expected integrationId to be logged."
