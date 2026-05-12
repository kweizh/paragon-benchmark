# Create Mailgun Mailing List via Paragon ActionKit

## Background
You need to programmatically create a Mailgun mailing list using Paragon ActionKit. You have a Node.js project initialized at `/home/user/project`.

## Requirements
- Create a script `index.js` that uses the `fetch` API to call Paragon ActionKit.
- The script should execute the appropriate action to create a Mailgun mailing list.
- The mailing list address must be `harbor-test-list@${process.env.MAILGUN_DOMAIN}`.
- The mailing list name must be `Harbor Test List`.
- The script must use the `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN` environment variables for authentication.
- Run the script and save the JSON response to `/home/user/project/output.json`.

## Implementation Guide
1. Use `fetch` to call `POST https://actionkit.useparagon.com/projects/${process.env.PARAGON_PROJECT_ID}/actions`.
2. Set the `Authorization` header to `Bearer ${process.env.PARAGON_USER_TOKEN}`.
3. The action name for creating a Mailgun mailing list is typically `MAILGUN_CREATE_MAILING_LIST` (you can verify this by fetching the actions list).
4. Pass the required parameters (`address` and `name`) in the request body.
5. Write the response to `output.json`.

## Constraints
- Project path: /home/user/project
- Log file: /home/user/project/output.json
- You must use Paragon ActionKit, not the Mailgun SDK directly.

## Integrations
- Paragon
- Mailgun