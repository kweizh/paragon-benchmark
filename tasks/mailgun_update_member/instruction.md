# Update a Mailgun Mailing List Member via Paragon Proxy API

## Background
You need to update an existing Mailgun mailing list member using the Paragon Proxy API. The Proxy API allows you to make direct, authenticated requests to any 3rd-party endpoint on behalf of a connected user.

## Requirements
- Create a Node.js script `update_member.js` in `/home/user/project`.
- The script should send a PUT request to the Paragon Proxy API to update a Mailgun mailing list member.
- The target Mailgun API endpoint is `https://api.mailgun.net/v3/lists/${MAILGUN_LIST_ADDRESS}/members/${MAILGUN_MEMBER_ADDRESS}`.
- You must update the member's `name` to `"Updated Name"`.
- You must use the `X-Paragon-Proxy-Url` header to specify the Mailgun API URL.
- The script should read `PARAGON_PROJECT_ID`, `PARAGON_USER_TOKEN`, `MAILGUN_LIST_ADDRESS`, and `MAILGUN_MEMBER_ADDRESS` from environment variables.
- Write the HTTP response status code to `/home/user/project/output.log`.

## Implementation Guide
1. Create `/home/user/project/update_member.js`.
2. Use the `fetch` API to make a `PUT` request to `https://proxy.useparagon.com/projects/${process.env.PARAGON_PROJECT_ID}/sdk/proxy/mailgun`.
3. Set headers:
   - `Authorization: Bearer ${process.env.PARAGON_USER_TOKEN}`
   - `Content-Type: application/json`
   - `X-Paragon-Proxy-Url: https://api.mailgun.net/v3/lists/${process.env.MAILGUN_LIST_ADDRESS}/members/${process.env.MAILGUN_MEMBER_ADDRESS}`
4. Set the body to JSON: `{"name": "Updated Name"}`.
   - *Note: If Mailgun requires form-data instead of JSON, you may need to use `application/x-www-form-urlencoded` and format the body accordingly. However, Paragon's Proxy API often handles JSON payloads gracefully. Try JSON first.*
5. Write the response status code (e.g., `200`) to `/home/user/project/output.log`.

## Constraints
- Project path: `/home/user/project`
- Log file: `/home/user/project/output.log`
- Use Node.js `fetch` (available in Node 18+).

## Integrations
- Paragon
- Mailgun