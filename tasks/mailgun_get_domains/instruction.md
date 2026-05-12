# Fetch Mailgun Domains with Paragon ActionKit

## Background
Paragon ActionKit allows you to execute third-party actions programmatically. Your task is to fetch a list of domains from Mailgun using Paragon's ActionKit API.

## Requirements
- Create a Node.js script at `/home/user/app/index.js`.
- The script must use `process.env.PARAGON_PROJECT_ID` and `process.env.PARAGON_USER_TOKEN` for authentication.
- Use the `fetch` API to make a request to Paragon ActionKit to execute the Mailgun action for fetching domains.
- The script must write the resulting JSON data to `/home/user/app/output.json`.

## Implementation Guide
1. Initialize a Node.js project in `/home/user/app`.
2. Write `index.js` to make a POST request to `https://actionkit.useparagon.com/projects/${process.env.PARAGON_PROJECT_ID}/actions`.
3. The body should specify the Mailgun action to get domains (e.g., `MAILGUN_GET_DOMAINS`). You may need to query `GET /actions` first if you are unsure of the exact action name.
4. Write the response data to `output.json`.

## Constraints
- Project path: /home/user/app
- Do not use any third-party HTTP clients; use the built-in `fetch`.

## Integrations
- Paragon