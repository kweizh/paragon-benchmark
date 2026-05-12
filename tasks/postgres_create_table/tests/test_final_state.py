import os
import subprocess
import json
import pytest
import psycopg2

PROJECT_DIR = "/home/user/project"

def test_script_ran_and_output_exists():
    # Setup: run the script
    result = subprocess.run(
        ["node", "index.js"],
        cwd=PROJECT_DIR,
        capture_output=True,
        text=True
    )
    assert result.returncode == 0, f"Node script failed: {result.stderr}"

def test_output_json_contains_success():
    output_file = os.path.join(PROJECT_DIR, "output.json")
    assert os.path.isfile(output_file), "output.json was not created."
    
    with open(output_file, 'r') as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            pytest.fail("output.json is not valid JSON.")
            
    # Assuming Paragon ActionKit returns a success flag or we just check it's not an error
    # The actual response format might vary, but we can check if it's a dict and doesn't have an "error" key
    assert isinstance(data, dict), "output.json should contain a JSON object."
    assert "error" not in data, f"API returned an error: {data.get('error')}"

def test_postgres_table_created():
    db_url = os.environ.get("POSTGRES_URL")
    if not db_url:
        pytest.fail("POSTGRES_URL environment variable is not set.")
        
    try:
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        # Check if the table harbor_users exists
        cur.execute("""
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'harbor_users'
            );
        """)
        exists = cur.fetchone()[0]
        assert exists is True, "Table 'harbor_users' was not created in the database."
        
        # Check columns
        cur.execute("""
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'harbor_users';
        """)
        columns = {row[0]: row[1] for row in cur.fetchall()}
        
        assert 'id' in columns, "Column 'id' is missing."
        assert 'email' in columns, "Column 'email' is missing."
        
        cur.close()
        conn.close()
    except Exception as e:
        pytest.fail(f"Database verification failed: {str(e)}")
