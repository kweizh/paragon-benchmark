# Add Mailgun Member via Paragon Proxy API

## Background
Paragon's Proxy API allows you to make direct, authenticated requests to third-party endpoints using the `X-Paragon-Proxy-Url` header. In this task, you will use the Proxy API to add a new member to a Mailgun mailing list.

## Requirements
- Write a Node.js script `add_member.js` in `/home/user/project`.
- The script must read the following environment variables:
  - `PARAGON_PROJECT_ID`: Your Paragon project ID.
  - `PARAGON_USER_TOKEN`: A valid Paragon user token.
  - `MAILGUN_LIST_ADDRESS`: The address of the Mailgun mailing list.
  - `MEMBER_EMAIL`: The email address of the member to add.
- The script must send a `POST` request to `https://proxy.useparagon.com/projects/${PARAGON_PROJECT_ID}/sdk/proxy/mailgun`.
- Set the `Authorization` header to `Bearer ${PARAGON_USER_TOKEN}`.
- Set the `X-Paragon-Proxy-Url` header to `https://api.mailgun.net/v3/lists/${MAILGUN_LIST_ADDRESS}/members`.
- The request body must be JSON containing the `address` field set to `MEMBER_EMAIL` (Mailgun API accepts `application/json` via Paragon Proxy, or you can use form data).
- Write the HTTP response status code to `/home/user/project/output.log`.

## Constraints
- Project path: `/home/user/project`
- Log file: `/home/user/project/output.log`
- You must use the Paragon Proxy API, NOT the Mailgun SDK directly.

## Integrations
- Mailgun