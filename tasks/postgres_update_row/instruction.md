# Update Postgres Row via Paragon ActionKit

## Background
You need to update a user's status in a PostgreSQL database using the Paragon ActionKit API. The database integration is already configured in the Paragon project.

## Requirements
- Write a Node.js script `/home/user/project/update_user.js` that updates a row in the `users` table.
- Set the `status` column to `active` for the row where `email` is `test@example.com`.
- The script must generate a valid Paragon User Token (JWT) using the `PARAGON_PROJECT_ID` and `PARAGON_SIGNING_KEY` environment variables. Use `test_user_123` as the user ID (`sub`).
- Use the ActionKit API to find the correct action for updating a row in Postgres (by fetching available actions first, if necessary) and then execute it.
- Save the JSON response from the ActionKit execution to `/home/user/project/output.json`.

## Implementation Guide
1. Initialize a Node.js project in `/home/user/project`.
2. Install the `jsonwebtoken` package to sign the JWT.
3. Create `update_user.js`.
4. In the script, generate the JWT with `sub: 'test_user_123'` and `iat: Math.floor(Date.now() / 1000)`.
5. Fetch the available actions from `GET https://actionkit.useparagon.com/projects/${process.env.PARAGON_PROJECT_ID}/actions` to determine the exact action name and required parameters for updating a row in Postgres.
6. Execute the update action via `POST https://actionkit.useparagon.com/projects/${process.env.PARAGON_PROJECT_ID}/actions`.
7. Write the response data to `/home/user/project/output.json`.

## Constraints
- Project path: /home/user/project
- Output file: /home/user/project/output.json
- Must use the Paragon ActionKit API.
- Do not hardcode the Project ID or Signing Key; use `process.env.PARAGON_PROJECT_ID` and `process.env.PARAGON_SIGNING_KEY`.