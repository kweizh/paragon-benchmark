const fetchAll = require('./fetch_all');

async function test() {
  console.log('Starting tests...');

  // Mock global fetch
  global.fetch = async (url, options) => {
    const proxyUrl = options.headers['X-Paragon-Proxy-Url'];
    console.log(`Fetching: ${proxyUrl}`);

    if (proxyUrl === '/items') {
      return {
        ok: true,
        json: async () => ({
          items: [1, 2],
          next_cursor: 'c1'
        })
      };
    } else if (proxyUrl === '/items?cursor=c1') {
      return {
        ok: true,
        json: async () => ({
          items: [3, 4],
          next_cursor: 'c2'
        })
      };
    } else if (proxyUrl === '/items?cursor=c2') {
      return {
        ok: true,
        json: async () => ({
          items: [5],
          next_cursor: null
        })
      };
    } else if (proxyUrl === '/items?foo=bar') {
        return {
          ok: true,
          json: async () => ({
            items: ['a', 'b'],
            next_cursor: 'd1'
          })
        };
    } else if (proxyUrl === '/items?foo=bar&cursor=d1') {
        return {
          ok: true,
          json: async () => ({
            items: ['c'],
            next_cursor: null
          })
        };
    }

    return { ok: false, status: 404, statusText: 'Not Found', text: async () => 'Not Found' };
  };

  try {
    console.log('--- Test 1: Fetch all items ---');
    const items1 = await fetchAll('proj123', 'token123', 'slack', '/items');
    console.log('Result:', items1);
    if (JSON.stringify(items1) === JSON.stringify([1, 2, 3, 4, 5])) {
      console.log('Test 1 Passed');
    } else {
      console.error('Test 1 Failed');
    }

    console.log('\n--- Test 2: Fetch with limit ---');
    const items2 = await fetchAll('proj123', 'token123', 'slack', '/items', 3);
    console.log('Result:', items2);
    if (JSON.stringify(items2) === JSON.stringify([1, 2, 3])) {
      console.log('Test 2 Passed');
    } else {
      console.error('Test 2 Failed');
    }

    console.log('\n--- Test 3: Fetch with existing query params ---');
    const items3 = await fetchAll('proj123', 'token123', 'slack', '/items?foo=bar');
    console.log('Result:', items3);
    if (JSON.stringify(items3) === JSON.stringify(['a', 'b', 'c'])) {
      console.log('Test 3 Passed');
    } else {
      console.error('Test 3 Failed');
    }

    console.log('\n--- Test 4: Limit exactly at page boundary ---');
    const items4 = await fetchAll('proj123', 'token123', 'slack', '/items', 2);
    console.log('Result:', items4);
    if (JSON.stringify(items4) === JSON.stringify([1, 2])) {
      console.log('Test 4 Passed');
    } else {
      console.error('Test 4 Failed');
    }

  } catch (error) {
    console.error('Test failed with error:', error);
  }
}

test();
