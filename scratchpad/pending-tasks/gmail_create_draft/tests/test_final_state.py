import os
import subprocess
import time
import socket
import pytest
from pochi_verifier import PochiVerifier
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

PROJECT_DIR = "/home/user/gmail_draft_app"

def wait_for_port(port, timeout=60):
    start_time = time.time()
    while time.time() - start_time < timeout:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            if sock.connect_ex(('localhost', port)) == 0:
                return True
        time.sleep(5)
    return False

@pytest.fixture(scope="module")
def start_app():
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
        # Kill the process group before failing
        import signal
        os.killpg(os.getpgid(process.pid), signal.SIGTERM)
        pytest.fail("App failed to start and listen on required ports.")

    yield

    # Shut down the app
    import signal
    os.killpg(os.getpgid(process.pid), signal.SIGTERM)
    process.wait(timeout=30)

def test_ui_interaction(start_app):
    reason = "The user must be able to click the Create Draft button and see a success message."
    truth = "Navigate to http://localhost:3000. Wait for the Paragon SDK to authenticate. Click the 'Create Draft' button (`#create-draft-btn`). Wait for the success message to appear in the `#status` element."

    verifier = PochiVerifier()
    result = verifier.verify(
        reason=reason,
        truth=truth,
        use_browser_agent=True,
        trajectory_dir="/logs/verifier/pochi/test_ui_interaction"
    )
    assert result.status == "pass", f"Browser verification failed: {result.reason}"

def test_gmail_draft_created():
    client_id = os.environ.get("GMAIL_CLIENT_ID")
    client_secret = os.environ.get("GMAIL_CLIENT_SECRET")
    refresh_token = os.environ.get("GMAIL_REFRESH_TOKEN")

    assert client_id and client_secret and refresh_token, "Gmail credentials not fully provided in environment variables."

    creds = Credentials(
        None,
        refresh_token=refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=client_id,
        client_secret=client_secret
    )

    service = build('gmail', 'v1', credentials=creds)
    
    # List drafts
    results = service.users().drafts().list(userId='me').execute()
    drafts = results.get('drafts', [])

    draft_found = False
    for draft in drafts:
        draft_id = draft['id']
        draft_detail = service.users().drafts().get(userId='me', id=draft_id, format='metadata').execute()
        
        headers = draft_detail.get('message', {}).get('payload', {}).get('headers', [])
        
        subject = ""
        recipient = ""
        for header in headers:
            if header['name'].lower() == 'subject':
                subject = header['value']
            if header['name'].lower() == 'to':
                recipient = header['value']
        
        if "Test Draft from Paragon" in subject and "test@example.com" in recipient:
            draft_found = True
            # Clean up the draft after finding it
            service.users().drafts().delete(userId='me', id=draft_id).execute()
            break

    assert draft_found, "Draft not found in Gmail with subject 'Test Draft from Paragon' and recipient 'test@example.com'."
