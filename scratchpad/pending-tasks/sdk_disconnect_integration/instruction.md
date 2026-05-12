# Disconnect Integration

## Background
Paragon provides an SDK to manage user integrations. You need to implement a custom UI button that triggers the Paragon disconnect flow for an existing Slack integration.

## Requirements
- Create a simple web page with a button labeled "Disconnect Slack" (id: `disconnect-slack`).
- When clicked, the button must call `paragon.uninstallIntegration('slack')` using the `@useparagon/connect` SDK.
- The page must include the `@useparagon/connect` SDK.
- The frontend must authenticate with Paragon before allowing the disconnection. To do this, it should fetch a user token from your backend.
- The backend must generate a Paragon User Token (JWT) signed with the `PARAGON_SIGNING_KEY` environment variable. The JWT must include a `sub` claim (e.g., "test-user-1") and `iat`.
- The backend must also expose the `PARAGON_PROJECT_ID` to the frontend.
- On successful disconnection, update a DOM element with id `status` to show "Disconnected". On failure, update it to "Failed".

## Constraints
- Project path: `/home/user/app`
- Start command: `npm run build && npm start`
- Port: 3000
- The backend must read `PARAGON_PROJECT_ID` and `PARAGON_SIGNING_KEY` from the environment.

## Integrations
- Slack