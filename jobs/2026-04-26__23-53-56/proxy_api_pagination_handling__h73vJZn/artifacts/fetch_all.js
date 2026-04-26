/**
 * Fetches all items from a 3rd-party API via Paragon's Proxy API, handling cursor-based pagination.
 *
 * @param {string} projectId - The Paragon Project ID.
 * @param {string} userToken - The Paragon User Token.
 * @param {string} integrationType - The integration type (e.g., 'salesforce').
 * @param {string} path - The 3rd-party API endpoint path.
 * @param {number} [limit] - Optional limit on the number of items to return.
 * @returns {Promise<Array>} - A promise that resolves to an array of aggregated items.
 */
async function fetchAll(projectId, userToken, integrationType, path, limit) {
  const baseUrl = `https://proxy.useparagon.com/projects/${projectId}/sdk/proxy/${integrationType}`;
  let allItems = [];
  let cursor = null;

  while (true) {
    let currentPath = path;
    if (cursor) {
      const separator = currentPath.includes('?') ? '&' : '?';
      currentPath += `${separator}cursor=${encodeURIComponent(cursor)}`;
    }

    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'X-Paragon-Proxy-Url': currentPath,
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'No error body');
      throw new Error(`Paragon Proxy API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const items = data.items || [];
    
    // Add items to our collection
    if (limit !== undefined && limit !== null) {
      const remaining = limit - allItems.length;
      if (items.length >= remaining) {
        allItems = allItems.concat(items.slice(0, remaining));
        return allItems;
      }
    }
    
    allItems = allItems.concat(items);

    cursor = data.next_cursor;
    if (!cursor) {
      break;
    }
  }

  return allItems;
}

module.exports = fetchAll;
