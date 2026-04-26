# Handle Unauthorized Token in ActionKit

## Background
Paragon ActionKit allows AI agents to execute integration actions. The provided Node.js script `fetch_actions.js` attempts to fetch available actions for a user but currently uses an invalid/expired token, resulting in a 401 Unauthorized error.

## Requirements
- Update `fetch_actions.js` to catch the 401 error when calling the ActionKit API.
- If a 401 error occurs, generate a new valid Paragon User Token (JWT) using the `jsonwebtoken` library. The token must use the `PARAGON_SIGNING_KEY` from environment variables, use the `RS256` algorithm, and include `sub` (set to `"test_user"`) and `iat` (current time in seconds).
- Retry the API call with the new token.
- Save the resulting JSON actions to `actions.json`.

## Implementation Guide
1. Install the `jsonwebtoken` package in the project directory.
2. Update `fetch_actions.js` to import `jsonwebtoken`.
3. Wrap the `fetch` call in a try/catch or check `response.ok`.
4. On a 401 status, call `jwt.sign({ sub: "test_user", iat: Math.floor(Date.now() / 1000) }, process.env.PARAGON_SIGNING_KEY, { algorithm: "RS256" })`.
5. Retry the `fetch` with the new token in the `Authorization: Bearer <token>` header.
6. Write the JSON response to `actions.json`.

## Constraints
- Project path: `/home/user/actionkit-project`
- The script should be executed via `node fetch_actions.js`.

## Integrations
- Paragon