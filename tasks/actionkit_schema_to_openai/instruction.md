# Convert ActionKit Schemas to OpenAI Tools

## Background
Paragon ActionKit allows AI agents to interact with connected 3rd-party integrations. The endpoint `GET https://actionkit.useparagon.com/projects/{projectId}/actions` returns a list of available actions for the user. These actions need to be converted into OpenAI-compatible tool definitions so they can be passed to the OpenAI API.

## Requirements
- Create a Node.js script `convert.js` in `/home/user/project` that fetches the available actions from ActionKit.
- The script must use the environment variables `PARAGON_PROJECT_ID` and `PARAGON_USER_TOKEN` for authentication.
- For each action returned by the API, convert it into an OpenAI tool definition format:
  ```json
  {
    "type": "function",
    "function": {
      "name": "<action_name>",
      "description": "<action_description>",
      "parameters": <action_parameters_schema>
    }
  }
  ```
- The script must write the resulting array of OpenAI tools to a file named `tools.json` in the same directory.

## Constraints
- Project path: `/home/user/project`
- Output file: `/home/user/project/tools.json`
- Do not use any external dependencies other than built-in Node.js modules.

## Integrations
- Paragon