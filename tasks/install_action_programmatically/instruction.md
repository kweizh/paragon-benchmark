# Programmatically Install a Workflow Action

## Background
You need to use the Paragon SDK to authenticate a user and programmatically install a workflow action for them using `paragon.installAction`.

## Requirements
- Initialize a Node.js project in `/home/user/paragon-app`.
- Install `@useparagon/connect`.
- Create a script `install.js` that authenticates with Paragon using `paragon.authenticate(PROJECT_ID, USER_TOKEN)`.
- Use `paragon.installAction(integrationType, actionId, params)` to install the `send_message` action for the `slack` integration.
- The parameters for the action should be `{ channel: '#general' }`.
- Log the result to `/home/user/paragon-app/output.log`.

## Implementation Guide
1. `cd /home/user/paragon-app`
2. `npm init -y`
3. `npm install @useparagon/connect`
4. Create `install.js` with the required logic.
5. Run the script using `node install.js`.

## Constraints
- Project path: `/home/user/paragon-app`
- Log file: `/home/user/paragon-app/output.log`
- `PROJECT_ID` and `USER_TOKEN` should be read from environment variables `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN`.

## Integrations
- None