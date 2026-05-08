# Fetch Salesforce Custom Object via Proxy API

## Background
You have an active Paragon project and need to interact with a Salesforce custom object that isn't available in the standard Paragon action list. You can use the Paragon Proxy API to make a direct, authenticated request to the Salesforce REST API.

## Requirements
- Create a Node.js script at `/home/user/project/fetch_custom_object.js` that uses the Paragon Proxy API to fetch a custom object from Salesforce.
- The script should read the `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN` environment variables for authentication.
- The script should make a GET request to the Salesforce API to fetch a custom object named `Paragon_Test_Object__c`.
- The script should print the JSON response from Salesforce to the console.

## Constraints
- Project path: `/home/user/project`
- The script must be executable via `node /home/user/project/fetch_custom_object.js`.
- Use the standard `fetch` API or any standard HTTP client.
- Do NOT provide an implementation guide in the instruction.

## Integrations
- Salesforce