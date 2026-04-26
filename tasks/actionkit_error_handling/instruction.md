# Handle ActionKit API Errors

## Background
When using Paragon's ActionKit API, requests might fail due to invalid JSON schemas (e.g., missing parameters) or invalid authentication tokens. It is crucial to handle these errors gracefully and log them.

## Requirements
- Create a Node.js script `call_action.js` in `/home/user/project`.
- The script should send a POST request to `https://actionkit.useparagon.com/projects/${process.env.PROJECT_ID}/actions`.
- Use the `PARAGON_USER_TOKEN` environment variable for the Bearer token in the `Authorization` header.
- Send a JSON body with `action: "SLACK_SEND_MESSAGE"` and an empty `parameters: {}` object.
- If the request fails (non-2xx status), catch the error gracefully without crashing.
- Write the error details to `/home/user/project/error_log.json` as a JSON object containing `status` (the HTTP status code) and `message` (the error message or response body).

## Constraints
- Project path: `/home/user/project`
- Log file: `/home/user/project/error_log.json`
- Use Node.js built-in `fetch` (Node 18+).

## Integrations
- None