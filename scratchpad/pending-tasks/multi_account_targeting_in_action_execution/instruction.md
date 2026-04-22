Users frequently connect multiple accounts of the same type (e.g., two distinct Slack workspaces). By default, API calls might target the first connected account unless explicitly specified.

You need to implement a function that sends a Slack message via the ActionKit API, explicitly targeting a specific Slack workspace account ID provided as an argument.

**Constraints:**
- Must execute a `POST` request to the ActionKit API to trigger the `SLACK_SEND_MESSAGE` action.
- You MUST include the `X-Paragon-Credential` header set to the specific account ID to ensure the message routes to the correct workspace.
- The payload must properly specify the target Slack channel and message text.