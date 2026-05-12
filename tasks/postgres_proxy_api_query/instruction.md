# Execute a Custom Query for Postgres via Paragon Proxy API

## Background
Paragon's Proxy API allows you to make direct, authenticated requests to third-party endpoints. For database integrations like PostgreSQL, you can use the Proxy API to execute custom queries directly.

## Requirements
- Write a Node.js script `query.js` in `/home/user/project` that uses the Paragon Proxy API to execute a custom query for Postgres.
- The script should generate a Paragon User Token (JWT) using the provided `PARAGON_SIGNING_KEY`.
- The JWT must include `sub` (set to `test-user`) and `iat` (issued at time).
- Use the generated JWT to authenticate a request to the Paragon Proxy API for the `postgres` integration.
- The proxy request should target the `/query` endpoint by setting the `X-Paragon-Proxy-Url` header to `/query`.
- The request must be a `POST` request to `https://proxy.useparagon.com/projects/${PARAGON_PROJECT_ID}/sdk/proxy/postgres`.
- The request body should be a JSON object containing the `query` field. Use the query: `SELECT * FROM users WHERE email = 'test@example.com';`.
- Save the JSON response from the proxy request to `/home/user/project/output.json`.

## Implementation Guide
1. Initialize a Node.js project in `/home/user/project`.
2. Install `jsonwebtoken` to generate the JWT.
3. Create `query.js` to sign the JWT using `PARAGON_SIGNING_KEY`.
4. Make a POST request to `https://proxy.useparagon.com/projects/${process.env.PARAGON_PROJECT_ID}/sdk/proxy/postgres`.
5. Include the headers:
   - `Authorization: Bearer <YOUR_GENERATED_JWT>`
   - `X-Paragon-Proxy-Url: /query`
   - `Content-Type: application/json`
6. Include the body: `JSON.stringify({ query: "SELECT * FROM users WHERE email = 'test@example.com';" })`.
7. Write the response data to `output.json`.

## Constraints
- Project path: `/home/user/project`
- Log file: `/home/user/project/output.json`
- The environment variables `PARAGON_PROJECT_ID` and `PARAGON_SIGNING_KEY` will be available in the environment.

## Integrations
- Paragon
- Postgres