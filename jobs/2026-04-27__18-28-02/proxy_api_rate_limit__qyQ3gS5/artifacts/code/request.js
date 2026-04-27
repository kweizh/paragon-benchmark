async function makeProxyRequest(projectId, userToken, integration, targetUrl) {
  const url = `https://proxy.useparagon.com/projects/${projectId}/sdk/proxy/${integration}`;
  const headers = {
    'Authorization': `Bearer ${userToken}`,
    'X-Paragon-Proxy-Url': targetUrl
  };

  const maxRetries = 3;
  let retries = 0;

  while (retries <= maxRetries) {
    const response = await fetch(url, { headers });

    if (response.ok) {
      return await response.json();
    }

    if (response.status === 429) {
      if (retries === maxRetries) {
        throw new Error(`Failed after ${maxRetries} retries with status 429`);
      }

      const retryAfter = response.headers.get('Retry-After');
      let delay = 0;

      if (retryAfter) {
        const retryAfterNum = parseInt(retryAfter, 10);
        if (!isNaN(retryAfterNum)) {
          delay = retryAfterNum * 1000;
        } else {
          const retryDate = new Date(retryAfter);
          delay = Math.max(0, retryDate.getTime() - Date.now());
        }
      } else {
        delay = Math.pow(2, retries) * 1000;
      }

      await new Promise(resolve => setTimeout(resolve, delay));
      retries++;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  }
}

module.exports = makeProxyRequest;
