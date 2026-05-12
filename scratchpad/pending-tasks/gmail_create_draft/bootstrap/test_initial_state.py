import os
import sys

def test_initial_state():
    # Verify that the project directory does not exist yet
    project_path = "/home/user/gmail_draft_app"
    if os.path.exists(project_path):
        print(f"Error: Project path {project_path} already exists.")
        sys.exit(1)
    
    # Verify required environment variables are present
    required_vars = ["PARAGON_SIGNING_KEY", "PARAGON_PROJECT_ID", "PARAGON_TEST_USER_ID", "GMAIL_CLIENT_ID", "GMAIL_CLIENT_SECRET", "GMAIL_REFRESH_TOKEN"]
    for var in required_vars:
        if not os.environ.get(var):
            print(f"Error: Required environment variable {var} is not set.")
            sys.exit(1)

    print("Initial state verification passed.")

if __name__ == "__main__":
    test_initial_state()
