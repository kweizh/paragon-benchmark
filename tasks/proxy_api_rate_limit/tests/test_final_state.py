import os
import subprocess
import pytest

WORKSPACE = "/home/user/workspace"
REQUEST_JS = os.path.join(WORKSPACE, "request.js")

def test_request_js_exists():
    assert os.path.isfile(REQUEST_JS), "request.js does not exist in the workspace."

def test_retry_logic_success():
    # Create a test script in the workspace to test the module
    test_script_path = os.path.join(WORKSPACE, "test_retry_success.js")
    test_script_content = """
const makeProxyRequest = require('./request.js');

let fetchCallCount = 0;
global.fetch = async (url, options) => {
    fetchCallCount++;
    
    // Check URL
    if (url !== 'https://proxy.useparagon.com/projects/test-proj/sdk/proxy/salesforce') {
        throw new Error('Incorrect URL: ' + url);
    }
    
    // Check headers
    if (options.headers['Authorization'] !== 'Bearer test-token') {
        throw new Error('Incorrect Authorization header');
    }
    if (options.headers['X-Paragon-Proxy-Url'] !== '/services/data/v53.0/sobjects/Account') {
        throw new Error('Incorrect X-Paragon-Proxy-Url header');
    }
    
    if (fetchCallCount < 4) {
        return {
            status: 429,
            json: async () => ({ error: 'Too Many Requests' })
        };
    }
    
    return {
        status: 200,
        json: async () => ({ success: true, data: 'test-data' })
    };
};

async function runTest() {
    try {
        const result = await makeProxyRequest('test-proj', 'test-token', 'salesforce', '/services/data/v53.0/sobjects/Account');
        if (fetchCallCount !== 4) {
            console.error('Expected fetch to be called 4 times, but was called ' + fetchCallCount + ' times.');
            process.exit(1);
        }
        if (!result || result.data !== 'test-data') {
            console.error('Unexpected result: ' + JSON.stringify(result));
            process.exit(1);
        }
        console.log('Success');
        process.exit(0);
    } catch (err) {
        console.error('Test failed with error: ' + err.message);
        process.exit(1);
    }
}
runTest();
"""
    with open(test_script_path, "w") as f:
        f.write(test_script_content)

    result = subprocess.run(["node", "test_retry_success.js"], cwd=WORKSPACE, capture_output=True, text=True)
    assert result.returncode == 0, f"Retry logic test failed: {result.stderr} {result.stdout}"
    assert "Success" in result.stdout, f"Expected 'Success' in output, got: {result.stdout}"

def test_retry_logic_failure():
    # Create a test script in the workspace to test the module
    test_script_path = os.path.join(WORKSPACE, "test_retry_failure.js")
    test_script_content = """
const makeProxyRequest = require('./request.js');

let fetchCallCount = 0;
global.fetch = async (url, options) => {
    fetchCallCount++;
    return {
        status: 429,
        json: async () => ({ error: 'Too Many Requests' })
    };
};

async function runTest() {
    try {
        await makeProxyRequest('test-proj', 'test-token', 'salesforce', '/services/data/v53.0/sobjects/Account');
        console.error('Expected function to throw an error after 3 retries (4 total calls)');
        process.exit(1);
    } catch (err) {
        if (fetchCallCount !== 4) {
            console.error('Expected fetch to be called 4 times, but was called ' + fetchCallCount + ' times.');
            process.exit(1);
        }
        console.log('Success');
        process.exit(0);
    }
}
runTest();
"""
    with open(test_script_path, "w") as f:
        f.write(test_script_content)

    result = subprocess.run(["node", "test_retry_failure.js"], cwd=WORKSPACE, capture_output=True, text=True)
    assert result.returncode == 0, f"Retry failure test failed: {result.stderr} {result.stdout}"
    assert "Success" in result.stdout, f"Expected 'Success' in output, got: {result.stdout}"
