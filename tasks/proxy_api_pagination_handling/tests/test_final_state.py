import os
import subprocess
import pytest

PROJECT_DIR = "/home/user/project"
SCRIPT_FILE = os.path.join(PROJECT_DIR, "fetch_all.js")
TEST_FILE = os.path.join(PROJECT_DIR, "test_fetch.js")

def test_fetch_all_script_exists():
    assert os.path.isfile(SCRIPT_FILE), f"fetch_all.js not found at {SCRIPT_FILE}"

def test_fetch_all_logic():
    test_script_content = """
const assert = require('assert');
const fetchAll = require('./fetch_all.js');

let fetchCallCount = 0;
let requestedUrls = [];
let requestedHeaders = [];

global.fetch = async (url, options) => {
    fetchCallCount++;
    requestedUrls.push(url);
    
    // Normalize headers to lowercase keys
    let headers = {};
    if (options && options.headers) {
        if (options.headers.entries) {
            for (let [key, value] of options.headers.entries()) {
                headers[key.toLowerCase()] = value;
            }
        } else {
            for (let key in options.headers) {
                headers[key.toLowerCase()] = options.headers[key];
            }
        }
    }
    requestedHeaders.push(headers);

    if (fetchCallCount === 1) {
        return {
            json: async () => ({
                items: [{ id: 1 }, { id: 2 }],
                next_cursor: 'cursor_2'
            })
        };
    } else if (fetchCallCount === 2) {
        return {
            json: async () => ({
                items: [{ id: 3 }, { id: 4 }],
                next_cursor: 'cursor_3'
            })
        };
    } else {
        return {
            json: async () => ({
                items: [{ id: 5 }],
                next_cursor: null
            })
        };
    }
};

(async () => {
    try {
        const results = await fetchAll('proj_123', 'token_abc', 'slack', '/api/users', 4);
        
        assert.strictEqual(results.length, 4, 'Should return exactly 4 items based on limit');
        assert.strictEqual(fetchCallCount, 2, 'Should only make 2 fetch calls to reach limit 4');
        
        assert.strictEqual(requestedUrls[0], 'https://proxy.useparagon.com/projects/proj_123/sdk/proxy/slack');
        assert.strictEqual(requestedUrls[1], 'https://proxy.useparagon.com/projects/proj_123/sdk/proxy/slack');
        
        assert.strictEqual(requestedHeaders[0]['authorization'], 'Bearer token_abc');
        assert.strictEqual(requestedHeaders[0]['x-paragon-proxy-url'], '/api/users');
        
        assert.strictEqual(requestedHeaders[1]['authorization'], 'Bearer token_abc');
        assert.strictEqual(requestedHeaders[1]['x-paragon-proxy-url'], '/api/users?cursor=cursor_2');
        
        console.log('All tests passed');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
"""
    with open(TEST_FILE, "w") as f:
        f.write(test_script_content)

    result = subprocess.run(
        ["node", "test_fetch.js"],
        capture_output=True, text=True, cwd=PROJECT_DIR
    )
    
    assert result.returncode == 0, f"Node.js test script failed: {result.stderr}\\nOutput: {result.stdout}"
    assert "All tests passed" in result.stdout, f"Test script did not output success message. Output: {result.stdout}"
