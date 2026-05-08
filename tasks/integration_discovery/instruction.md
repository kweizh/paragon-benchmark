# Integration Discovery UI

## Background
Paragon is an embedded integration platform that allows developers to build and manage native integrations. You need to build a UI component that displays which integrations a user has already connected.

## Requirements
- Build a web application using Vite (React + TypeScript).
- The application must use the `@useparagon/connect` SDK.
- Initialize the SDK using the `PARAGON_PROJECT_ID` and a signed JWT token.
- The JWT token must be generated server-side (or in a separate Node.js script that runs before the UI starts) using the `PARAGON_SIGNING_KEY`.
- The UI must use `paragon.getUser()` to fetch and display a list of integrations the user has already connected.
- Use real system and API keys from the environment variables (`PARAGON_PROJECT_ID`, `PARAGON_SIGNING_KEY`). Do not use fake dependencies or mocking.

## Constraints
- Project path: /home/user/integration_discovery
- Start command: `npm run dev`
- Port: 5173
- Do not use fake dependencies or mocking.

## Integrations
- None