# Send a POST Request via Paragon Proxy API

## Background
Paragon provides a Proxy API to make direct, authenticated requests to 3rd-party endpoints. You need to write a Node.js script that uses the Proxy API to send a POST request with a JSON payload to Slack's `chat.postMessage` endpoint.

## Requirements
- Write a Node.js script at `/home/user/project/send_proxy_post.js`.
- The script must read `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN` from environment variables.
- It must send a POST request to `https://proxy.useparagon.com/projects/${process.env.PARAGON_PROJECT_ID}/sdk/proxy/slack`.
- It must include the header `X-Paragon-Proxy-Url: https://slack.com/api/chat.postMessage`.
- It must include the header `Authorization: Bearer ${process.env.PARAGON_USER_TOKEN}`.
- It must include the header `Content-Type: application/json`.
- The JSON payload must be exactly `{"channel": "#general", "text": "Hello via Proxy API!"}`.

## Constraints
- Project path: `/home/user/project`
- Use `node` to run the script. `fetch` is available in Node.js.

## Integrations
- Slack