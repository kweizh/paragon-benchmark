# Get Postgres Table Schema via Paragon ActionKit

## Background
You need to retrieve the schema of a specific table from a connected PostgreSQL database using Paragon's ActionKit API.

## Requirements
- Write a Node.js script that uses the Paragon ActionKit API to get the schema of a table named `users`.
- The script should authenticate using a provided Paragon User Token.
- The result should be saved to a local file `schema.json`.

## Implementation Guide
1. Initialize a Node.js project in `/home/user/paragon-postgres`.
2. Write a script `index.js` that makes a POST request to `https://actionkit.useparagon.com/projects/{projectId}/actions`.
3. The request should trigger the Postgres "get schema" or "execute query" action to retrieve the schema for the `users` table.
4. Save the returned schema into `/home/user/paragon-postgres/schema.json`.

## Constraints
- Project path: `/home/user/paragon-postgres`
- Log file: `/home/user/paragon-postgres/schema.json`
- Use the `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN` environment variables for authentication.

## Integrations
- Paragon
- Postgres