# Handle Paragon Proxy API OAuth Errors

## Background
When using the Paragon Proxy API to make requests to 3rd-party integrations, the underlying OAuth token might expire and fail to refresh. In such cases, the Proxy API returns a 401 status. Your application needs to handle this gracefully by logging a specific message.

## Requirements
You are provided with a Node.js script `/home/user/app/fetch_data.js` that makes a GET request to the Paragon Proxy API (`https://proxy.useparagon.com/projects/${PARAGON_PROJECT_ID}/sdk/proxy/slack/users.identity`) using an invalid token, which will simulate an OAuth refresh failure (401 Unauthorized).
Currently, it does not handle 401 errors specifically.
Modify `/home/user/app/fetch_data.js` so that if the Proxy API returns a 401 status, the script writes the exact string `User needs to reconnect` to `/home/user/app/error.log`.

## Implementation Guide
1. Open `/home/user/app/fetch_data.js`.
2. Check the response status from the `fetch` call.
3. If `response.status === 401`, write `User needs to reconnect` to `error.log` using the `fs` module (e.g., `fs.writeFileSync('error.log', 'User needs to reconnect')`).
4. Ensure the script does not throw an unhandled exception when a 401 occurs.

## Constraints
- Project path: /home/user/app
- Log file: /home/user/app/error.log
- Do not change the existing URL or fetch options, just add the error handling logic.