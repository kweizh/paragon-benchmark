# Hex-Encoded File Upload via ActionKit

## Background
Paragon's ActionKit API requires files to be hex-encoded in the JSON body, which is non-standard for many developers. You need to implement a feature that reads a local file, hex-encodes it, and sends it to Slack via ActionKit.

## Requirements
- Write a Node.js script at `/home/user/project/upload.js`.
- The script must read the `trail_id` from `/logs/artifacts/trial_id`.
- The script must read a local file at `/home/user/project/report.txt` and hex-encode its contents.
- The script must use `fetch` to send a `POST` request to `https://actionkit.useparagon.com/projects/${PARAGON_PROJECT_ID}/actions`.
- The request must include the `Authorization: Bearer ${PARAGON_USER_TOKEN}` header.
- The JSON body must specify the action `SLACK_UPLOAD_FILE`.
- The parameters must include:
  - `channels`: `#test-channel-${trail_id}`
  - `file`: The hex-encoded content of `report.txt`
  - `filename`: `report.txt`
- The script should execute the request and print the response status.

## Constraints
- Project path: `/home/user/project`
- Log file: `/home/user/project/output.log`
- Do not hardcode the `trail_id`, `PARAGON_PROJECT_ID`, or `PARAGON_USER_TOKEN`.
- The file must be hex-encoded.

## Integrations
- Slack