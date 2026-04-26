# Paragon Proxy API Rate Limit Retry

## Background
Paragon's Proxy API allows making direct, authenticated requests to 3rd-party endpoints. However, these 3rd-party APIs (like Salesforce) may enforce rate limits (HTTP 429). We need a robust request function that handles these rate limits gracefully.

## Requirements
- Create a Node.js module `request.js` that exports a function `makeProxyRequest(projectId, userToken, integration, targetUrl)`.
- The function must make a request to the Paragon Proxy API endpoint: `https://proxy.useparagon.com/projects/{projectId}/sdk/proxy/{integration}`.
- It must include the `Authorization: Bearer {userToken}` header and the `X-Paragon-Proxy-Url: {targetUrl}` header.
- If the response status is 429 (Too Many Requests), the function must retry the request up to 3 times.
- It should implement exponential backoff for the retries (e.g., 1s, 2s, 4s) or respect the `Retry-After` header if present.
- If it succeeds, it should return the JSON response.
- If it fails after 3 retries, it should throw an error.
- Use the built-in `fetch` API (Node >= 18).

## Implementation Guide
1. Initialize a Node.js project in `/home/user/workspace`.
2. Implement the `makeProxyRequest` function in `request.js`.

## Constraints
- Project path: `/home/user/workspace`
- The script must be named `request.js` and export the function using CommonJS (`module.exports = makeProxyRequest`).