# Handle Paragon SDK Connection Errors

## Background
Our application uses the Paragon SDK to allow users to connect third-party integrations (like Salesforce or Slack). Sometimes the connection process fails (e.g., the user cancels the OAuth flow, or an API error occurs). We need to gracefully handle these connection errors in our frontend.

## Requirements
- Intercept or catch errors that occur during the `paragon.connect('salesforce')` process.
- When an error is encountered, display an HTML element with the ID `connection-error` containing the text `Connection failed`.
- Do not modify the existing successful connection logic.

## Constraints
- Project path: `/home/user/app`
- Start command: `npm start`
- Port: `3000`
- The project is a simple React application using `@useparagon/connect`.
