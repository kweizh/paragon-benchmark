# Fetch Mailgun Events via Paragon ActionKit

## Background
You need to fetch email events from Mailgun on behalf of a user using Paragon's ActionKit API. The user has already connected their Mailgun account in the Paragon Connect Portal.

## Requirements
Write a Node.js script that authenticates with Paragon and executes the Mailgun action to fetch events.

## Implementation Guide
1. Initialize a Node.js project in `/home/user/project` and install `jsonwebtoken`.
2. Create a script `/home/user/project/fetch_events.js`.
3. The script must read `PARAGON_PROJECT_ID`, `PARAGON_SIGNING_KEY`, `PARAGON_USER_ID`, and `MAILGUN_DOMAIN` from environment variables.
4. Generate a Paragon User Token (JWT) using the `PARAGON_SIGNING_KEY`. The payload must include `sub` (set to `PARAGON_USER_ID`) and `iat` (issued at time, in seconds). Use the `RS256` algorithm to sign the JWT.
5. Make a POST request to `https://actionkit.useparagon.com/projects/{PARAGON_PROJECT_ID}/actions`.
6. Include the headers:
   - `Authorization`: `Bearer <YOUR_JWT>`
   - `Content-Type`: `application/json`
7. The request body must specify the action `MAILGUN_GET_EVENTS` and pass the `domain` parameter (using the `MAILGUN_DOMAIN` env var).
8. Save the JSON response data to `/home/user/project/events.json`.

## Constraints
- Project path: `/home/user/project`
- Log file: `/home/user/project/events.json`
- Use Node.js and `fetch` (available in Node 18+).

## Integrations
- Paragon
- Mailgun