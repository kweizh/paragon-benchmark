import os
import subprocess
import sys

def verify_records():
    postgres_url = os.environ.get("POSTGRES_URL")
    
    check_user_sql = "SELECT COUNT(*) FROM paragon_users WHERE id = 'user_123';"
    try:
        result = subprocess.run(
            ["psql", postgres_url, "-t", "-c", check_user_sql],
            capture_output=True, text=True, check=True
        )
        count = int(result.stdout.strip())
        if count != 1:
            print(f"Error: Expected 1 user with id 'user_123', found {count}.")
            sys.exit(1)
    except subprocess.CalledProcessError as e:
        print(f"Error checking user: {e.stderr}")
        sys.exit(1)

    check_profile_sql = "SELECT COUNT(*) FROM paragon_profiles WHERE user_id = 'user_123';"
    try:
        result = subprocess.run(
            ["psql", postgres_url, "-t", "-c", check_profile_sql],
            capture_output=True, text=True, check=True
        )
        count = int(result.stdout.strip())
        if count != 1:
            print(f"Error: Expected 1 profile for user_id 'user_123', found {count}.")
            sys.exit(1)
    except subprocess.CalledProcessError as e:
        print(f"Error checking profile: {e.stderr}")
        sys.exit(1)
        
    print("Database verification passed.")

def cleanup_records():
    postgres_url = os.environ.get("POSTGRES_URL")
    
    cleanup_sql = """
    DELETE FROM paragon_profiles WHERE user_id = 'user_123';
    DELETE FROM paragon_users WHERE id = 'user_123';
    """
    
    try:
        subprocess.run(
            ["psql", postgres_url, "-c", cleanup_sql],
            capture_output=True, text=True, check=True
        )
        print("Cleanup successful.")
    except subprocess.CalledProcessError as e:
        print(f"Warning: Cleanup failed: {e.stderr}")

def main():
    if not os.path.exists("/home/user/project/transaction.js"):
        print("Error: /home/user/project/transaction.js does not exist.")
        sys.exit(1)
        
    print("Running transaction script...")
    try:
        result = subprocess.run(
            ["node", "/home/user/project/transaction.js"],
            capture_output=True, text=True, check=True, cwd="/home/user/project"
        )
        print("Script output:")
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print("Error running transaction script:")
        print(e.stderr)
        sys.exit(1)
        
    verify_records()
    cleanup_records()
    
    print("Final state verification passed.")

if __name__ == "__main__":
    main()
