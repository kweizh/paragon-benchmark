# Send an email using Paragon ActionKit for Mailgun

## Background
Paragon provides an ActionKit API that allows you to easily execute actions across hundreds of integrations. Your task is to use the Paragon ActionKit API to send an email via Mailgun.

## Requirements
- Write a Node.js script `send_email.js` that sends an email using the Paragon ActionKit API for Mailgun.
- The script should use the `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN` environment variables for authentication.
- The script should send an email to the address specified in the `MAILGUN_TO_EMAIL` environment variable.
- The email should be sent from the address specified in the `MAILGUN_FROM_EMAIL` environment variable.
- The email domain should be specified in the `MAILGUN_DOMAIN` environment variable.
- The email subject should be "Test Email from Paragon" and the text body should be "Hello from Paragon ActionKit!".

## Implementation Guide
1. Initialize a Node.js project in `/home/user/mailgun_task`.
2. Create a script `send_email.js`.
3. Make a POST request to `https://actionkit.useparagon.com/projects/${PARAGON_PROJECT_ID}/actions` (or `/tools`) with the appropriate authorization header and JSON body for the Mailgun integration.
4. You can use `node send_email.js` to execute your script.

## Constraints
- Project path: /home/user/mailgun_task
- The script must be executable via `node /home/user/mailgun_task/send_email.js`

## Integrations
- Paragon
- Mailgun