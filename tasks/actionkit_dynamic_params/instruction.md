# Execute ActionKit Action with Dynamic Parameters

## Background
Paragon's ActionKit API allows you to execute 3rd-party actions programmatically. You need to write a Node.js script that sends a Slack message using ActionKit, dynamically setting the channel name based on the current trail ID.

## Requirements
- Write a Node.js script at `/home/user/project/send_message.js`.
- The script must read the `trail_id` from `/logs/trail_id`.
- The script must use `fetch` to send a `POST` request to `https://actionkit.useparagon.com/projects/${PARAGON_PROJECT_ID}/actions`.
- The request must include the `Authorization: Bearer ${PARAGON_USER_TOKEN}` header.
- The JSON body must specify the action `SLACK_SEND_MESSAGE`.
- The parameters must include:
  - `channel`: `#test-channel-${trail_id}`
  - `message`: "Hello from ActionKit!"
- The script should execute the request and print the response status.

## Implementation Guide
1. Read the `trail_id` from `/logs/trail_id`.
2. Read `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN` from environment variables.
3. Construct the fetch request to the ActionKit API.
4. Execute the script using `node /home/user/project/send_message.js` and save the output to `/home/user/project/output.log`.

## Constraints
- Project path: `/home/user/project`
- Log file: `/home/user/project/output.log`
- Do not hardcode the `trail_id`, `PARAGON_PROJECT_ID`, or `PARAGON_USER_TOKEN`.

## Integrations
- Slack