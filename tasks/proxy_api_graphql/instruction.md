# Send a GraphQL Request via the Paragon Proxy API

## Background
Paragon's Proxy API allows you to make direct, authenticated requests to any 3rd-party endpoint using the `X-Paragon-Proxy-Url` header. You need to write a Node.js script that uses the Proxy API to send a GraphQL request to GitHub.

## Requirements
- Complete the `/home/user/app/script.js` file to send a POST request to the Paragon Proxy API.
- The Proxy API endpoint should be constructed using the `PARAGON_PROJECT_ID` environment variable: `https://proxy.useparagon.com/projects/${PARAGON_PROJECT_ID}/sdk/proxy/github`.
- Set the `Authorization` header to `Bearer ${PARAGON_USER_TOKEN}` using the `PARAGON_USER_TOKEN` environment variable.
- Set the `X-Paragon-Proxy-Url` header to the GitHub GraphQL endpoint: `https://api.github.com/graphql`.
- The request body must be a JSON object containing the GraphQL query: `query { viewer { login } }`.
- The script must print the JSON response to the console.

## Implementation Guide
1. Read `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN` from `process.env`.
2. Use the built-in `fetch` API (Node.js 18+) to make the request.
3. Ensure the `Content-Type` header is set to `application/json`.
4. Print the response using `console.log(JSON.stringify(await response.json()))`.

## Constraints
- Project path: `/home/user/app`
- Log file: `/home/user/app/output.log`
- Do not use any third-party libraries (use built-in `fetch`).

## Integrations
- GitHub