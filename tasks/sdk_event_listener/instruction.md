# Paragon SDK Event Listener

## Background
You have a basic React application initialized at `/home/user/app`. The `@useparagon/connect` SDK is installed.

## Requirements
Modify `/home/user/app/src/App.js` to set up a global event listener for successful integration connection events.
When an integration is successfully installed, it must log the message `Integration installed: <integrationId>` to the console (where `<integrationId>` is the actual ID from the event).

## Implementation Guide
1. Open `/home/user/app/src/App.js`.
2. Add a call to `paragon.subscribe` to listen for the `onIntegrationInstall` event.
3. In the event callback, extract the `integrationId` from the event object.
4. Add `console.log("Integration installed: " + event.integrationId);` inside the callback.

## Constraints
- Project path: /home/user/app
- You must use `paragon.subscribe` with the `"onIntegrationInstall"` event name.
