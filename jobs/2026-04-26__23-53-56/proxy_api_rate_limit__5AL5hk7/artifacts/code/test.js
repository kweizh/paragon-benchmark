const makeProxyRequest = require('./request');

// Mocking fetch to test the retry logic
async function test() {
  const originalFetch = global.fetch;
  let callCount = 0;

  global.fetch = async (url, options) => {
    callCount++;
    console.log(`Fetch called: ${url}, Attempt: ${callCount}`);
    
    if (callCount <= 2) {
      return {
        status: 429,
        ok: false,
        headers: new Map([['Retry-After', '1']]),
        json: async () => ({ error: 'Too Many Requests' }),
        text: async () => 'Too Many Requests'
      };
    }

    return {
      status: 200,
      ok: true,
      headers: new Map(),
      json: async () => ({ success: true, data: 'some data' })
    };
  };

  try {
    console.log('Starting test for successful retry...');
    const result = await makeProxyRequest('proj_123', 'token_abc', 'salesforce', 'https://api.salesforce.com/data');
    console.log('Result:', result);
    if (result.success && callCount === 3) {
      console.log('Test Passed: Successfully retried and got data.');
    } else {
      console.error('Test Failed: Unexpected result or call count.', { result, callCount });
    }
  } catch (error) {
    console.error('Test Failed with error:', error);
  } finally {
    global.fetch = originalFetch;
  }
}

async function testFailure() {
    const originalFetch = global.fetch;
    let callCount = 0;
  
    global.fetch = async (url, options) => {
      callCount++;
      console.log(`Fetch called: ${url}, Attempt: ${callCount}`);
      
      return {
        status: 429,
        ok: false,
        headers: new Map(),
        json: async () => ({ error: 'Too Many Requests' }),
        text: async () => 'Too Many Requests'
      };
    };
  
    try {
      console.log('\nStarting test for failure after max retries...');
      await makeProxyRequest('proj_123', 'token_abc', 'salesforce', 'https://api.salesforce.com/data');
      console.error('Test Failed: Should have thrown an error.');
    } catch (error) {
      console.log('Test Passed: Caught expected error:', error.message);
      if (callCount === 4) { // Initial call + 3 retries
        console.log('Call count is correct (4).');
      } else {
        console.error('Call count is incorrect:', callCount);
      }
    } finally {
      global.fetch = originalFetch;
    }
  }

async function runTests() {
    await test();
    await testFailure();
}

runTests();
