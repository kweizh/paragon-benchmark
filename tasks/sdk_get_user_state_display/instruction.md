# Display User Integrations with Paragon SDK

## Background
You need to build a simple React application that uses the `@useparagon/connect` SDK to authenticate a user and display their connected integrations.

## Requirements
- Initialize a React app (e.g., using Vite) in `/home/user/app`.
- Install `@useparagon/connect`.
- Create a component that takes `projectId` and `userToken` from environment variables (`VITE_PARAGON_PROJECT_ID` and `VITE_PARAGON_TOKEN`).
- Authenticate the user using `paragon.authenticate(projectId, userToken)`.
- After authentication, fetch the user state using `paragon.getUser()`.
- Display the user's authenticated state (specifically, the `authenticated` boolean and the `integrations` object) in a `div` with the ID `paragon-user-state`.

## Implementation Guide
1. Initialize a Vite React project in `/home/user/app`.
2. Install the `@useparagon/connect` SDK.
3. Implement the authentication and state fetching logic in your main `App.jsx` or `App.tsx` component.
4. Render the user state as a JSON string inside `<div id="paragon-user-state"></div>`.

## Constraints
- Project path: /home/user/app
- Start command: `npm run dev`
- Port: 5173
- Use the `@useparagon/connect` SDK.

## Integrations
- None