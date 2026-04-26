# Paragon Proxy API Pagination

## Background
Paragon's Proxy API allows making direct, authenticated requests to any 3rd-party endpoint using the `X-Paragon-Proxy-Url` header. When retrieving a list of resources from a 3rd party API, pagination is often required.

## Requirements
Write a Node.js script `fetch_all.js` in `/home/user/project` that exports an async function `fetchAll(projectId, userToken, integrationType, path, limit)`.
The function must use the global `fetch` API to make requests to Paragon's Proxy API and aggregate the results from all pages.

- The Proxy base URL is `https://proxy.useparagon.com/projects/{projectId}/sdk/proxy/{integrationType}`.
- Requests must include the `Authorization: Bearer {userToken}` header.
- The actual 3rd-party endpoint path should be passed in the `X-Paragon-Proxy-Url` header.
- The 3rd party API uses cursor-based pagination. The response JSON contains an array of items in the `items` property, and a `next_cursor` property (if there are more pages).
- You must append `cursor={cursor}` to the `X-Paragon-Proxy-Url` for subsequent pages. Handle existing query parameters correctly (use `?` or `&`).
- The function should return an array of all aggregated items. If `limit` is provided, it should stop fetching once the total number of items reaches or exceeds `limit` and return exactly `limit` items.

## Implementation Guide
1. Initialize a Node.js project in `/home/user/project` (already done in the initial state).
2. Create `fetch_all.js`.
3. Implement `fetchAll` using a `while` loop to follow the `next_cursor`.
4. Export the function using CommonJS: `module.exports = fetchAll;`.

## Constraints
- Project path: /home/user/project
- Use native `fetch` (available in Node.js 18+).
- No third-party libraries.
