# Multi-Account Slack Messaging with Paragon

## Background
Paragon allows users to connect multiple accounts of the same integration type (e.g., multiple Slack workspaces). When executing actions on behalf of a user with multiple connected accounts, the application must specify which account to use via the `X-Paragon-Credential` header. You need to build a simple web application that allows users to send a Slack message and choose which of their connected Slack accounts to send it to.

## Requirements
- Build a simple Node.js/Express web application with a frontend and backend.
- The frontend must display a list of the user's connected Slack accounts (using `paragon.getUser()`).
- The frontend must include a form with a dropdown selector to choose a specific Slack account and a text input for the message.
- When the form is submitted, the backend must use the Paragon Proxy API or ActionKit API to send the message to the selected Slack account.
- The backend must pass the correct `X-Paragon-Credential` header to ensure the message is sent to the selected account.
- The application must use real environment variables for Paragon credentials (`PARAGON_PROJECT_ID`, `PARAGON_SIGNING_KEY`). No mocking.
- Use the provided user ID `zealt-user01` to generate the Paragon user token on the backend.

## Constraints
- Project path: /home/user/project
- Start command: npm start
- Port: 3000
- Read the trial ID from `/logs/artifacts/trial_id` and append it to the message sent to Slack (e.g., "Hello from Paragon! Trial: ${trial_id}").

## Integrations
- Paragon
- Slack