# Create Postgres Table via Paragon ActionKit

## Background
You need to use the Paragon ActionKit API to execute an action on a connected Postgres database. Specifically, you will create a new table using the ActionKit API.

## Requirements
- Create a Node.js script that interacts with the Paragon ActionKit API.
- The script must use the `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN` environment variables.
- Create a table named `harbor_users` with columns `id` (SERIAL PRIMARY KEY) and `email` (VARCHAR).
- The script should write the ActionKit API response JSON to `/home/user/project/output.json`.

## Implementation Guide
1. Initialize a Node.js project in `/home/user/project`.
2. Write a script `index.js` that sends a POST request to `https://actionkit.useparagon.com/projects/${PARAGON_PROJECT_ID}/actions`.
3. The request headers must include `Authorization: Bearer ${PARAGON_USER_TOKEN}` and `Content-Type: application/json`.
4. The request body must specify the action to execute a SQL query on Postgres (e.g., `POSTGRES_EXECUTE_QUERY` or similar, you may need to fetch the actions list from `GET https://actionkit.useparagon.com/projects/${PARAGON_PROJECT_ID}/actions` to find the exact action name and parameter schema for Postgres).
5. Execute the script and ensure the response is saved to `output.json`.

## Constraints
- Project path: `/home/user/project`
- Log file: `/home/user/project/output.json`