# Delete Mailgun Mailing List Member via Paragon ActionKit

## Background
You need to programmatically delete a member from a Mailgun mailing list using Paragon ActionKit. You have a Node.js project initialized at `/home/user/project`.

## Requirements
- Create a script `index.js` that uses the `fetch` API to call Paragon ActionKit.
- The script should execute the appropriate action to delete a Mailgun mailing list member.
- The mailing list address is provided in the `MAILGUN_LIST_ADDRESS` environment variable.
- The member email address to delete is provided in the `MAILGUN_MEMBER_ADDRESS` environment variable.
- The script must use the `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN` environment variables for authentication.
- Run the script and save the JSON response to `/home/user/project/output.json`.

## Implementation Guide
1. Use `fetch` to call `POST https://actionkit.useparagon.com/projects/${process.env.PARAGON_PROJECT_ID}/actions`.
2. Set the `Authorization` header to `Bearer ${process.env.PARAGON_USER_TOKEN}`.
3. The action name for deleting a Mailgun mailing list member is typically `MAILGUN_DELETE_MAILING_LIST_MEMBER` (you can verify this by fetching the actions list).
4. Pass the required parameters (usually `list_address` and `address`) in the request body.
5. Write the response to `output.json`.

## Constraints
- Project path: /home/user/project
- Log file: /home/user/project/output.json
- You must use Paragon ActionKit, not the Mailgun SDK directly.

## Integrations
- Paragon
- Mailgun