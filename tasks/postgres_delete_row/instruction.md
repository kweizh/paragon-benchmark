# Delete a Row using Paragon Proxy API for Postgres

## Background
You need to delete a row from a PostgreSQL table using the Paragon Proxy API. The Paragon Proxy API allows you to make direct, authenticated requests to integrations on behalf of a user.

## Requirements
- Create a Node.js script named `delete_row.js` in `/home/user/project`.
- The script must use `fetch` (or a similar HTTP client) to make a request to the Paragon Proxy API for the `postgres` integration.
- Use the `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN` environment variables for authentication and routing.
- The script should send a `POST` request to `https://proxy.useparagon.com/projects/${PARAGON_PROJECT_ID}/sdk/proxy/postgres`.
- Set the `Authorization` header to `Bearer ${PARAGON_USER_TOKEN}`.
- Set the `X-Paragon-Proxy-Url` header to `/query`.
- The request body should be JSON: `{"query": "DELETE FROM users WHERE id = 123"}`.
- The script should write the HTTP status code of the response to `/home/user/project/output.log`.

## Implementation Guide
1. Initialize a Node.js project or just create the standalone script in `/home/user/project/delete_row.js`.
2. Read `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN` from the environment.
3. Make the fetch request and write the status code to `/home/user/project/output.log`.

## Constraints
- Project path: `/home/user/project`
- Log file: `/home/user/project/output.log`
- Use Node.js built-in `fetch` or `axios`.

## Integrations
- Paragon