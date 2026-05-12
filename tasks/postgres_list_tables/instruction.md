# List Postgres Tables via Paragon Proxy API

## Background
You need to use the Paragon Proxy API to query a connected PostgreSQL database and list its tables. The Paragon Proxy API allows direct, authenticated requests to connected integrations on behalf of a user.

## Requirements
- Create a Node.js script named `list_tables.js` in `/home/user/project`.
- The script must use the `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN` environment variables for authentication and routing.
- The script must make a `POST` request to the Proxy API (`https://proxy.useparagon.com/projects/${PARAGON_PROJECT_ID}/sdk/proxy/postgresql`).
- Set the `Authorization` header to `Bearer ${PARAGON_USER_TOKEN}`.
- The request body should be JSON containing a `query` field. Use a query to list tables, for example: `{"query": "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"}`.
- The script should write the JSON response from the Proxy API to `/home/user/project/tables.json`.

## Implementation Guide
1. Initialize a Node.js project in `/home/user/project`.
2. Read `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN` from the environment.
3. Make the fetch request to the Proxy API with the appropriate headers and body.
4. Write the JSON response to `/home/user/project/tables.json`.

## Constraints
- Project path: `/home/user/project`
- Log file: `/home/user/project/tables.json`
- Use Node.js built-in `fetch` or `axios`.

## Integrations
- Paragon