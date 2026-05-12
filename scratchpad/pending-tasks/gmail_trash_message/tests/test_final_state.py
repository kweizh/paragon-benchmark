import os
import subprocess
import time
import socket
import pytest
import jwt
import requests
import json
import base64
from pochi_verifier import PochiVerifier

PROJECT_DIR = "/home/user/app"

def wait_for_port(port, timeout=60):
    start_time = time.time()
    while time.time() - start_time < timeout:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            if sock.connect_ex(('localhost', port)) == 0:
                return True
        time.sleep(5)
    return False

def get_paragon_token():
    signing_key = os.environ.get("PARAGON_SIGNING_KEY")
    if not signing_key:
        pytest.fail("PARAGON_SIGNING_KEY is not set")
    
    # Ensure the key is formatted correctly
    if "\\n" in signing_key:
        signing_key = signing_key.replace("\\n", "\n")
        
    token = jwt.encode(
        {
            "sub": "test-user",
            "iat": int(time.time()),
        },
        signing_key,
        algorithm="RS256"
    )
    return token

def send_test_email():
    token = get_paragon_token()
    project_id = os.environ.get("NEXT_PUBLIC_PARAGON_PROJECT_ID")
    if not project_id:
        pytest.fail("NEXT_PUBLIC_PARAGON_PROJECT_ID is not set")
        
    email_content = (
        "To: me\r\n"
        "Subject: Trash Me\r\n"
        "\r\n"
        "This is a test email to be trashed."
    )
    encoded_email = base64.urlsafe_b64encode(email_content.encode('utf-8')).decode('utf-8').rstrip("=")
    
    url = f"https://proxy.useparagon.com/projects/{project_id}/sdk/proxy/gmail/users/me/messages/send"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    response = requests.post(url, headers=headers, json={"raw": encoded_email})
    if response.status_code != 200:
        pytest.fail(f"Failed to send test email: {response.text}")
    
    return response.json().get("id")

def check_email_trashed(message_id):
    token = get_paragon_token()
    project_id = os.environ.get("NEXT_PUBLIC_PARAGON_PROJECT_ID")
    
    url = f"https://proxy.useparagon.com/projects/{project_id}/sdk/proxy/gmail/users/me/messages/{message_id}"
    headers = {
        "Authorization": f"Bearer {token}",
    }
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        pytest.fail(f"Failed to get message status: {response.text}")
        
    data = response.json()
    labels = data.get("labelIds", [])
    return "TRASH" in labels

@pytest.fixture(scope="module")
def setup_test_email():
    message_id = send_test_email()
    # Wait for email to be delivered
    time.sleep(5)
    yield message_id

@pytest.fixture(scope="module")
def start_app():
    # Install dependencies first
    subprocess.run(["npm", "install"], cwd=PROJECT_DIR, check=True)
    subprocess.run(["npm", "run", "build"], cwd=PROJECT_DIR, check=True)
    
    # Start the app
    process = subprocess.Popen(
        ["npm", "start"],
        cwd=PROJECT_DIR,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        preexec_fn=os.setsid
    )

    # Wait for the app to be ready
    if not wait_for_port(3000):
        import signal
        os.killpg(os.getpgid(process.pid), signal.SIGTERM)
        pytest.fail("App failed to start and listen on required ports.")

    yield

    # Shut down the app
    import signal
    os.killpg(os.getpgid(process.pid), signal.SIGTERM)
    process.wait(timeout=30)

def test_trash_message(start_app, setup_test_email):
    message_id = setup_test_email
    
    reason = "The application must have a 'Trash Target Email' button that finds the email with subject 'Trash Me' and trashes it."
    truth = "Navigate to http://localhost:3000. Wait for the page to load and Paragon to authenticate. Click the 'Trash Target Email' button. Wait 10 seconds for the operation to complete."

    verifier = PochiVerifier()
    result = verifier.verify(
        reason=reason,
        truth=truth,
        use_browser_agent=True,
        trajectory_dir="/logs/verifier/pochi/test_trash_message"
    )
    assert result.status == "pass", f"Browser verification failed: {result.reason}"
    
    # Verify via API
    is_trashed = check_email_trashed(message_id)
    assert is_trashed, f"Message {message_id} was not moved to TRASH. Current labels do not include TRASH."
