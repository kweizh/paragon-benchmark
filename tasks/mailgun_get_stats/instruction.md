# Fetch Mailgun Stats via Paragon Proxy API

## Background
Paragon's Proxy API allows you to make authenticated requests directly to a third-party provider's API on behalf of your connected users. In this task, you will use the Paragon Proxy API to fetch email statistics from Mailgun.

## Requirements
- Create a Node.js script that fetches email statistics for a specific Mailgun domain.
- Use the Paragon Server-side Proxy API for the `mailgun` integration.
- The script must read the following environment variables:
  - `PARAGON_PROJECT_ID`: The Paragon project ID.
  - `PARAGON_USER_TOKEN`: The Paragon user token (Bearer token).
  - `MAILGUN_DOMAIN`: The Mailgun domain to fetch stats for.
- Save the JSON response from the Mailgun API to `stats.json`.

## Implementation Guide
1. Initialize a Node.js project in `/home/user/project`.
2. Write a script `index.js` that makes a `GET` request to the Paragon Proxy API.
3. The endpoint should target Mailgun's stats API (e.g., `https://api.mailgun.net/v3/<domain>/stats/total`). You can use the Proxy API's ability to override the Base URL by appending the fully-qualified URL to the proxy path: `https://proxy.useparagon.com/projects/<PROJECT_ID>/sdk/proxy/mailgun/https://api.mailgun.net/v3/<DOMAIN>/stats/total`.
4. Include the `Authorization: Bearer <PARAGON_USER_TOKEN>` header.
5. Write the response data to `/home/user/project/stats.json`.

## Constraints
- Project path: `/home/user/project`
- Log file: `/home/user/project/output.log`
- Do not hardcode the Project ID, User Token, or Domain. Read them from the environment.

## Integrations
- Paragon
- Mailgun