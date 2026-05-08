# Paragon Custom Connect Portal

## Background
You need to implement a web UI that allows users to authenticate and open the Paragon Connect Portal for the Slack integration.

## Requirements
- Create a simple Node.js web application (e.g., Express.js serving an HTML page) in `/home/user/app`.
- The server must generate a Paragon User Token (JWT) using the `PARAGON_SIGNING_KEY` environment variable. The JWT must include `sub` (user ID) and `iat` (issued at time).
- The client must initialize the Paragon SDK (`@useparagon/connect`) using the `PARAGON_PROJECT_ID` environment variable and the generated User Token.
- The UI must have a button with the text 'Connect Slack' that triggers `paragon.connect('slack')`.

## Constraints
- Project path: /home/user/app
- Start command: npm start
- Port: 3000
- Environment Variables provided: `PARAGON_PROJECT_ID`, `PARAGON_SIGNING_KEY`
- The server must listen on port 3000.
- The frontend must be accessible at `http://localhost:3000`.