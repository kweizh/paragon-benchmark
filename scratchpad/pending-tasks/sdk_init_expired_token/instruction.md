# Handle Expired Paragon SDK Token

## Background
Paragon requires a server-signed JWT token to authenticate users on the client side. If the token is expired, the `paragon.authenticate()` method will fail. You need to implement a server that generates an expired token, and a client that attempts to authenticate with it and gracefully handles the resulting error.

## Requirements
1. Create a simple Node.js server (`server.js`) using Express.
2. Expose an endpoint `GET /api/token` that generates a Paragon JWT token using the `PARAGON_SIGNING_KEY` environment variable. The token MUST be signed with an expiration time (`exp`) that is in the past (e.g., 1 hour ago). The payload should include `sub: 'test-user'` and `iat` (issued at time).
3. Serve a static `index.html` file that includes the Paragon SDK.
4. In `index.html`, fetch the token from `/api/token`, then call `paragon.authenticate(projectId, token)` using the `PARAGON_PROJECT_ID` environment variable.
5. Catch the authentication error and display the error message as text inside an HTML element with the ID `error-message`.

## Constraints
- Project path: `/home/user/project`
- Start command: `node server.js`
- Port: 3000
- You must use the `jsonwebtoken` library to sign the token on the server.
- The client must use the `@useparagon/connect` library or the CDN script.

## Environment Variables
- `PARAGON_PROJECT_ID`
- `PARAGON_SIGNING_KEY`