# Paragon JWT Generation and SDK Initialization

## Background
Paragon requires a server-side generated JWT (Paragon User Token) to authenticate users on the frontend securely. The token must be signed with the `PARAGON_SIGNING_KEY` and contain `sub` and `iat` claims. Once generated, this token is used to initialize the `@useparagon/connect` SDK on the client side.

## Requirements
- Create a Node.js Express server that exposes an endpoint (e.g., `GET /auth/token`) to generate and return a valid Paragon JWT.
- The server must read `PARAGON_SIGNING_KEY` from the environment variables to sign the JWT.
- The JWT must include `sub` (set to `test-user-id`) and `iat` (current time in seconds).
- Serve a frontend HTML page at the root route (`/`) that fetches the JWT from the server-side endpoint.
- The frontend must load the Paragon SDK and initialize it by calling `paragon.authenticate(PROJECT_ID, USER_TOKEN)`, where `PROJECT_ID` is read from the environment or injected by the server.
- Display the text `Paragon SDK Initialized` on the page once the authentication completes successfully.

## Constraints
- Project path: `/home/user/project`
- Start command: `npm start`
- Port: 3000
- Do not use fake dependencies or mocking; use real system and API keys from the environment.