# Trigger Paragon Workflow via ActionKit

## Background
Paragon's ActionKit allows developers to execute specific actions or trigger workflows programmatically. You need to write a Node.js script that triggers a Paragon workflow via ActionKit for a specific user.

## Requirements
- Create a Node.js script `trigger.js` that triggers a Paragon workflow via ActionKit.
- The script must generate a Paragon User Token (JWT) using the `PARAGON_SIGNING_KEY` and authenticate the request.
- The ActionKit request should execute the action `CUSTOM_WORKFLOW_TRIGGER`.
- Pass the following parameters in the request payload: `{"event": "test_event", "value": 42}`.
- The response from the ActionKit API must be saved to `output.json`.

## Constraints
- Project path: `/home/user/project`
- Read `PARAGON_PROJECT_ID` and `PARAGON_SIGNING_KEY` from environment variables.
- Use `test-user-123` as the user ID (`sub`) for the JWT.
- Output file: `/home/user/project/output.json`
- Use real system and API keys from env, no fake dependencies or mocking.