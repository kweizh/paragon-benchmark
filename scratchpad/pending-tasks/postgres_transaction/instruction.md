# Execute Postgres Transaction via Paragon API

## Background
You need to execute multiple queries in a transaction using the Paragon API for a connected Postgres database. The transaction should insert a new user and a related profile record to ensure data consistency.

## Requirements
- Create a Node.js script at `/home/user/project/transaction.js`.
- The script must read `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN` from the environment.
- Use the Paragon ActionKit API (`POST https://actionkit.useparagon.com/projects/${PARAGON_PROJECT_ID}/actions`) to execute a SQL transaction. The action name for Postgres query execution is typically `POSTGRES_EXECUTE_QUERY`.
- The transaction must execute the following statements:
  1. `BEGIN;`
  2. `INSERT INTO paragon_users (id, name, email) VALUES ('user_123', 'Test User', 'test@example.com');`
  3. `INSERT INTO paragon_profiles (user_id, bio) VALUES ('user_123', 'This is a test profile');`
  4. `COMMIT;`
- The script should print the result to the console.

## Constraints
- Project path: `/home/user/project`
- Log file: `/home/user/project/output.log`
- The script must be executable via `node /home/user/project/transaction.js`.
- Do NOT use the `pg` npm package; you MUST use the Paragon API.

## Integrations
- Postgres