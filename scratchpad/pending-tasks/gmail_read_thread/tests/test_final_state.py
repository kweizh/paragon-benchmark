import os
import time
import requests
from playwright.sync_api import sync_playwright

def test_final_state():
    # Verify server is running
    try:
        response = requests.get("http://localhost:3000")
        assert response.status_code == 200, "Server is not running or returned non-200 status"
    except Exception as e:
        assert False, f"Failed to connect to server: {e}"

    thread_id = os.environ.get("TEST_GMAIL_THREAD_ID", "test_thread_id")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # Navigate to the app
        page.goto("http://localhost:3000")
        
        # Wait for Paragon SDK to initialize (e.g. button becomes enabled or text appears)
        # We assume the user has implemented an input for thread ID and a button to read it
        page.wait_for_selector("input[id='thread-id-input']", timeout=10000)
        page.fill("input[id='thread-id-input']", thread_id)
        
        # Click the read thread button
        page.click("button[id='read-thread-btn']")
        
        # Wait for the thread content to be displayed
        page.wait_for_selector("#thread-content", timeout=15000)
        
        # Check that it's not empty
        content = page.inner_text("#thread-content")
        assert len(content.strip()) > 0, "Thread content should be displayed"
        
        browser.close()
