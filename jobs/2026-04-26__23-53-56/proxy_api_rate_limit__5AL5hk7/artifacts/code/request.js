/**
 * Makes an authenticated request to the Paragon Proxy API with retry logic for 429 Rate Limit errors.
 * 
 * @param {string} projectId - The Paragon Project ID.
 * @param {string} userToken - The Paragon User Token.
 * @param {string} integration - The integration name (e.g., 'salesforce').
 * @param {string} targetUrl - The 3rd-party URL to proxy to.
 * @returns {Promise<any>} - The JSON response from the proxy request.
 * @throws {Error} - Throws an error if the request fails after 3 retries.
 */
async function makeProxyRequest(projectId, userToken, integration, targetUrl) {
  const proxyUrl = `https://proxy.useparagon.com/projects/${projectId}/sdk/proxy/${integration}`;
  const maxRetries = 3;
  let attempt = 0;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  while (attempt <= maxRetries) {
    try {
      const response = await fetch(proxyUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'X-Paragon-Proxy-Url': targetUrl
        }
      });

      if (response.status === 429) {
        if (attempt === maxRetries) {
          throw new Error(`Rate limit exceeded after ${maxRetries} retries.`);
        }

        let delay = Math.pow(2, attempt) * 1000; // Exponential backoff: 1s, 2s, 4s
        
        const retryAfter = response.headers.get('Retry-After');
        if (retryAfter) {
          const retryAfterMs = parseInt(retryAfter, 10) * 1000;
          if (!isNaN(retryAfterMs)) {
            delay = retryAfterMs;
          } else {
            // Handle Date format for Retry-After if necessary
            const retryAfterDate = Date.parse(retryAfter);
            if (!isNaN(retryAfterDate)) {
              delay = Math.max(0, retryAfterDate - Date.now());
            }
          }
        }

        console.log(`Received 429. Retrying in ${delay}ms (Attempt ${attempt + 1}/${maxRetries})`);
        await sleep(delay);
        attempt++;
        continue;
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      if (attempt === maxRetries || error.message.includes('Rate limit exceeded')) {
        throw error;
      }
      
      // If it's a network error and not a 429 (which is handled above), 
      // we might still want to retry or just throw. 
      // The requirements specifically mention retrying for 429.
      throw error;
    }
  }
}

module.exports = makeProxyRequest;
