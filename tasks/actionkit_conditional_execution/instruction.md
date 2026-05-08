# Conditional Execution with Paragon ActionKit

## Background
You need to write a Node.js script that conditionally executes a Paragon action based on whether the integration is connected for the user.

## Requirements
- Write a script in `/home/user/paragon-task/index.js`.
- The script should fetch the available actions for the user via the Paragon ActionKit API.
- If the `SLACK_SEND_MESSAGE` action is available, execute it to send a message to the `#general` channel. The message text must be `Hello from Paragon! trial_id: <trial_id>` where `<trial_id>` is read from `/logs/artifacts/trial_id`.
- If the action is not available, do not attempt to execute it.
- Log the outcome to `/home/user/paragon-task/output.log` (e.g., 'Message sent' or 'Action not available').

## Constraints
- Project path: `/home/user/paragon-task`
- Log file: `/home/user/paragon-task/output.log`
- Read `trial_id` from `/logs/artifacts/trial_id`.
- Use `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN` from the environment.
- Do NOT mock the API. Use the real Paragon ActionKit API.

## Integrations
- Paragon
- Slack