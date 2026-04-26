# Headless Connection Trigger

## Background
Paragon provides a Connect Portal that allows users to authorize third-party integrations. You need to implement a custom UI button that triggers the Paragon headless connection flow for Slack and handles the promise returned by the connection attempt.

## Requirements
- Create a simple web page with a button labeled "Connect Slack" (id: `connect-slack`).
- When clicked, the button must call `paragon.connect('slack')` using the `@useparagon/connect` SDK.
- The page must include the `@useparagon/connect` SDK.
- The frontend must authenticate with Paragon before allowing the connection. To do this, it should fetch a user token from your backend.
- The backend must generate a Paragon User Token (JWT) signed with the `PARAGON_SIGNING_KEY` environment variable. The JWT must include a `sub` claim (e.g., "test-user-1") and `iat`.
- The backend must also expose the `PARAGON_PROJECT_ID` to the frontend.
- On successful connection, update a DOM element with id `status` to show "Connected". On failure, update it to "Failed".

## Implementation Guide
1. Initialize a Node.js project in `/home/user/app`.
2. Install `express`, `jsonwebtoken`, and `@useparagon/connect`.
3. Create `server.js` that serves static files from a `public` directory and provides a `/api/token` endpoint. The token endpoint should generate a JWT using `process.env.PARAGON_SIGNING_KEY` and return it along with `process.env.PARAGON_PROJECT_ID`.
4. Create `public/index.html` with the "Connect Slack" button (`<button id="connect-slack">Connect Slack</button>`) and a status div (`<div id="status">Pending</div>`).
5. In `public/index.html`, load the SDK (e.g., via a bundler like Webpack/Vite, or a script tag if supported, but typically you build it or use a module bundler. For simplicity, you can use a build step with `esbuild` or `webpack`, or serve it from `node_modules`).
6. Fetch `/api/token`, call `paragon.authenticate(projectId, token)`, and add a click listener to the button that calls `paragon.connect('slack')`. Handle the promise to update the `#status` text.

## Constraints
- Project path: `/home/user/app`
- Start command: `npm run build && npm start` (configure your `package.json` to build the frontend if you use a bundler, then start the express server).
- Port: 3000
- The backend must read `PARAGON_PROJECT_ID` and `PARAGON_SIGNING_KEY` from the environment.

## Integrations
- Slack