async function fetchAll(projectId, userToken, integrationType, path, limit) {
  const baseUrl = `https://proxy.useparagon.com/projects/${projectId}/sdk/proxy/${integrationType}`;
  let allItems = [];
  let cursor = null;

  while (true) {
    let proxyUrl = path;
    if (cursor) {
      const separator = proxyUrl.includes('?') ? '&' : '?';
      proxyUrl = `${proxyUrl}${separator}cursor=${encodeURIComponent(cursor)}`;
    }

    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'X-Paragon-Proxy-Url': proxyUrl
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.items && Array.isArray(data.items)) {
      allItems = allItems.concat(data.items);
    }

    if (limit !== undefined && allItems.length >= limit) {
      return allItems.slice(0, limit);
    }

    if (data.next_cursor) {
      cursor = data.next_cursor;
    } else {
      break;
    }
  }

  return limit !== undefined ? allItems.slice(0, limit) : allItems;
}

module.exports = fetchAll;
