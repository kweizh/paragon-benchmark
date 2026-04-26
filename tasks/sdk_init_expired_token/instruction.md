# Paragon SDK Expired Token Handling

## Background
When initializing the Paragon SDK, developers must provide a valid user token (JWT). If the token is expired, the SDK will throw an error. It is important to handle this error gracefully.

## Requirements
- Create a Node.js script `index.js` in `/home/user/app`.
- Generate an expired Paragon User Token using the `jsonwebtoken` package. The token must have `sub: "test-user"`, `exp` set to 1 hour ago, and use the secret `"test-secret"`.
- Attempt to initialize the Paragon SDK using `paragon.authenticate("test-project-id", token)`.
- Catch any errors thrown by the authentication attempt and write the error message to `/home/user/app/error.log`.

## Implementation Guide
1. Initialize a Node.js project in `/home/user/app`.
2. Install `@useparagon/connect` and `jsonwebtoken`.
3. Create `index.js` to generate the expired JWT.
4. Call `paragon.authenticate` and catch the error.
5. Write the error message to `error.log`.

## Constraints
- Project path: /home/user/app
- Log file: /home/user/app/error.log
- Start command: node index.js

## Integrations
- None