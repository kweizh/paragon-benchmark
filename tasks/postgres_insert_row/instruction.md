# Insert a Row into Postgres via Paragon Proxy API

## Background
You need to use the Paragon Proxy API to insert a row into a PostgreSQL table. The Paragon Proxy API allows direct, authenticated requests to connected integrations.

## Requirements
- Write a Node.js script that uses the Paragon Proxy API to insert a row into a `users` table.
- The script must generate a Paragon User Token (JWT) using the provided `PARAGON_SIGNING_KEY`, `PARAGON_PROJECT_ID`, and the user ID `test-user`.
- The script must make a request to the Proxy API (`POST https://proxy.useparagon.com/projects/{projectId}/sdk/proxy/postgresql`) to execute an `INSERT` statement.
- The query should be `INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com') RETURNING *;`
- The Proxy API for PostgreSQL typically accepts a JSON body with a `query` field. Try sending `{"query": "INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com') RETURNING *;"}`.
- Save the query result to `/home/user/project/result.json`.

## Implementation Guide
1. Initialize a Node.js project in `/home/user/project`.
2. Install `jsonwebtoken` to generate the Paragon User Token.
3. Create `index.js`.
4. In `index.js`, generate a JWT signed with RS256 using the `PARAGON_SIGNING_KEY`. The payload must include `sub: "test-user"` and `iat: Math.floor(Date.now() / 1000)`.
5. Make a POST request to `https://proxy.useparagon.com/projects/${process.env.PARAGON_PROJECT_ID}/sdk/proxy/postgresql`.
6. In the request headers, include `Authorization: Bearer ${jwt}` and `Content-Type: application/json`.
7. In the request body, provide the query `INSERT INTO users (name, email) VALUES ('Alice', 'alice@example.com') RETURNING *;`.
8. Write the JSON response to `/home/user/project/result.json`.

## Constraints
- Project path: `/home/user/project`
- Log file: `/home/user/project/result.json`
- Ensure you use the environment variables `PARAGON_PROJECT_ID` and `PARAGON_SIGNING_KEY`.

## Integrations
- Paragon