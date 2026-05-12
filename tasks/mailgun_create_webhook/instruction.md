# Create a Mailgun Webhook via Paragon Proxy API

## Background
You need to create a Mailgun webhook using the Paragon Proxy API. The Proxy API allows you to make direct, authenticated requests to any 3rd-party endpoint on behalf of a connected user.

## Requirements
- Create a Node.js script `create_webhook.js` in `/home/user/project`.
- The script should send a POST request to the Paragon Proxy API to create a Mailgun webhook.
- The target Mailgun API endpoint is `https://api.mailgun.net/v3/domains/${MAILGUN_DOMAIN}/webhooks`.
- The webhook `id` should be `click` and the `url` should be `https://example.com/webhook`.
- You must use the `X-Paragon-Proxy-Url` header to specify the Mailgun API URL.
- The script should read `PARAGON_PROJECT_ID`, `PARAGON_USER_TOKEN`, and `MAILGUN_DOMAIN` from environment variables.
- Write the HTTP response status code to `/home/user/project/output.log`.

## Implementation Guide
1. Create `/home/user/project/create_webhook.js`.
2. Use the `fetch` API to make a `POST` request to `https://proxy.useparagon.com/projects/${process.env.PARAGON_PROJECT_ID}/sdk/proxy/mailgun`.
3. Set headers:
   - `Authorization: Bearer ${process.env.PARAGON_USER_TOKEN}`
   - `Content-Type: application/json`
   - `X-Paragon-Proxy-Url: https://api.mailgun.net/v3/domains/${process.env.MAILGUN_DOMAIN}/webhooks`
4. Set the body to JSON: `{"id": "click", "url": "https://example.com/webhook"}`.
5. Write the response status code (e.g., `200`) to `/home/user/project/output.log`.

## Constraints
- Project path: `/home/user/project`
- Log file: `/home/user/project/output.log`
- Use Node.js `fetch` (available in Node 18+).

## Integrations
- Paragon
- Mailgun