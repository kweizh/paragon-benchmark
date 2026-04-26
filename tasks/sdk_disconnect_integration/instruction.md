# Disconnect Integration via SDK

## Background
You are building a user settings page for your web application. You need to implement a function that allows users to disconnect their active Slack integration using the Paragon SDK.

## Requirements
- You have a Node.js project at `/home/user/app`.
- The file `/home/user/app/disconnect.js` exports a function `disconnectSlack()`.
- Implement the `disconnectSlack` function to call the Paragon SDK to uninstall the `slack` integration.
- The function must await the SDK call.

## Implementation Guide
1. Open `/home/user/app/disconnect.js`.
2. Use the imported `paragon` object from `@useparagon/connect`.
3. Call `paragon.uninstallIntegration('slack')` inside the `disconnectSlack` function.

## Constraints
- Project path: /home/user/app
- Do not modify the imports.
- Return the promise from `paragon.uninstallIntegration`.