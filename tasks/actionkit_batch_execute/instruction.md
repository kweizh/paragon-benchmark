# Paragon ActionKit Batch Execution

## Background
You are building an AI agent that needs to execute multiple Paragon ActionKit actions in sequence. You need to write a Node.js module that takes an array of action payloads and executes them one by one.

## Requirements
- Create a Node.js script at `/home/user/project/batch_execute.js`.
- The script must define a function `async function executeActions(projectId, userToken, actions)`.
- For each action in the `actions` array, it must make a `POST` request to `https://actionkit.useparagon.com/projects/${projectId}/actions`.
- The request must include the header `Authorization: Bearer ${userToken}` and `Content-Type: application/json`.
- The request body must be the JSON stringified action payload.
- The function should return an array of responses (or await each fetch).
- Export the function using `module.exports = executeActions;`.

## Constraints
- Project path: `/home/user/project`
- Use the built-in `fetch` API.