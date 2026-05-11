import os
import subprocess
import sys

def check_env_vars():
    required_vars = ["PARAGON_PROJECT_ID", "PARAGON_USER_TOKEN", "POSTGRES_URL"]
    for var in required_vars:
        if not os.environ.get(var):
            print(f"Error: {var} environment variable is not set.")
            sys.exit(1)

def setup_database():
    postgres_url = os.environ.get("POSTGRES_URL")
    
    setup_sql = """
    CREATE TABLE IF NOT EXISTS paragon_users (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100)
    );
    
    CREATE TABLE IF NOT EXISTS paragon_profiles (
        user_id VARCHAR(50) PRIMARY KEY REFERENCES paragon_users(id),
        bio TEXT
    );
    
    DELETE FROM paragon_profiles WHERE user_id = 'user_123';
    DELETE FROM paragon_users WHERE id = 'user_123';
    """
    
    try:
        result = subprocess.run(
            ["psql", postgres_url, "-c", setup_sql],
            capture_output=True, text=True, check=True
        )
        print("Database setup successful.")
    except subprocess.CalledProcessError as e:
        print(f"Error setting up database: {e.stderr}")
        sys.exit(1)

def main():
    check_env_vars()
    setup_database()
    
    project_dir = "/home/user/project"
    if not os.path.exists(project_dir):
        os.makedirs(project_dir)
        print(f"Created project directory: {project_dir}")
        
    print("Initial state verification passed.")

if __name__ == "__main__":
    main()
