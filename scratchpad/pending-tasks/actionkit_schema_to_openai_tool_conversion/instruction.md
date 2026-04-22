Paragon's ActionKit API exposes available third-party actions in JSON Schema format, which is highly useful for building AI agents that can trigger integrations.

You need to create a function that fetches the available actions for an authenticated user and converts them into OpenAI-compatible tool definitions.

**Constraints:**
- Must execute a `GET` request to `https://actionkit.useparagon.com/projects/{projectId}/actions`.
- Must authenticate the request using the `Authorization: Bearer {PARAGON_USER_TOKEN}` header.
- The output MUST map the returned JSON Schema strictly into the `[{"type": "function", "function": { "name": "...", "parameters": {...} } }]` array format required by the OpenAI API.