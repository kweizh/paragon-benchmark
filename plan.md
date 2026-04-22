# Evaluation Dataset Research: Paragon SDK & API
This research report provides technical details and evaluation scenarios for [Paragon](https://www.useparagon.com/), an embedded integration platform (iPaaS) for B2B SaaS.
## 1. Library Overview
*   **Description**: Paragon is an embedded integration platform that allows developers to build and manage native integrations (e.g., Salesforce, Slack, Google Drive) within their own applications. It provides managed OAuth, a white-labeled "Connect Portal" for end-users, and a workflow engine.
*   **Ecosystem Role**: It sits between a SaaS application and 3rd-party APIs, abstracting away authentication, rate limiting, and data mapping.
*   **Project Setup**:
    1.  **Server-Side**: Generate a **Paragon User Token** (JWT) using your `PARAGON_SIGNING_KEY`. The JWT must include `sub` (your user's unique ID) and `iat` (issued at time).
    2.  **Client-Side**: Install `@useparagon/connect`. Initialize with `paragon.authenticate(PROJECT_ID, USER_TOKEN)`.
    3.  **Dashboard**: Activate integrations (e.g., Slack) in the Paragon Dashboard and configure scopes.
## 2. Core Primitives & APIs
### SDK (Frontend)
*   `paragon.authenticate(projectId, token)`: Authenticates the current user session.
*   `paragon.connect(integrationType)`: Opens the white-labeled Connect Portal for a specific integration.
*   `paragon.getUser()`: Returns the state of the authenticated user and their connected integrations.
*   `paragon.installAction(integrationType, actionId, params)`: Programmatically installs an action for a user.
### ActionKit API (AI/LLM Integration)
*   `GET https://actionkit.useparagon.com/projects/{projectId}/actions`: Returns a list of available actions for the user in JSON Schema format (ideal for LLM tool definitions).
*   `POST https://actionkit.useparagon.com/projects/{projectId}/actions`: Executes a specific action.
### Proxy API (Custom Requests)
*   `https://proxy.useparagon.com/projects/{projectId}/sdk/proxy/{integration}`: Allows making direct, authenticated requests to any 3rd-party endpoint using the `X-Paragon-Proxy-Url` header.
### Code Snippets
**SDK Authentication & Portal:**
```javascript
import { paragon } from '@useparagon/connect';
async function initParagon(userToken) {
  await paragon.authenticate("YOUR_PROJECT_ID", userToken);
  // Open Salesforce connection modal
  paragon.connect("salesforce");
}
```
**ActionKit Execution (Tool Calling):**
```javascriptconst response = await fetch("https://actionkit.useparagon.com/projects/PROJ_ID/actions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${PARAGON_USER_TOKEN}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    action: "SLACK_SEND_MESSAGE",
    parameters: {
      channel: "#general",
      message: "Hello from Paragon!"
    }
  })
});
```
## 3. Real-World Use Cases & Templates
*   **AI Sales Copilot**: Use ActionKit to allow an AI agent to search CRM records (Salesforce/HubSpot) and create tasks based on meeting transcripts.
*   **Automated Document Generation**: Triggering a workflow to generate a Google Doc or PDF in Box when a deal is closed in the host application.
*   **Slack Notifications**: Sending automated, user-authenticated alerts to Slack channels based on app events.
*   **Template**: [ActionKit Playground (GitHub)](https://github.com/useparagon/actionkit-playground) - A reference for building AI agents with Paragon.
## 4. Developer Friction Points
*   **JWT Security**: Developers often mistakenly sign JWTs on the frontend, which is a security risk. Evaluation tasks should verify server-side signing.
*   **File Upload Encoding**: ActionKit requires files to be **hex-encoded** in the JSON body, which is non-standard for many developers and has a size limit (~5MB).
*   **Pagination Logic**: While Paragon standardizes pagination, developers must correctly handle `pageCursor` or `offset` based on the specific integration's pattern.
*   **Multi-Account Management**: Handling users who connect multiple accounts of the same type (e.g., two Slack workspaces) requires specific headers (`X-Paragon-Credential`).
## 5. Evaluation Ideas
1.  **Basic Setup**: Implement a server-side route to generate a Paragon JWT and use it to initialize the SDK on the frontend.
2.  **Integration Discovery**: Build a UI component that uses `paragon.getUser()` to display which integrations a user has already connected.
3.  **Headless Connection**: Implement a custom UI button that triggers `paragon.connect('slack')` and logs the success/failure event.
4.  **AI Tool Integration**: Create a function that fetches ActionKit schemas (`GET /actions`) and converts them into OpenAI-compatible tool definitions.
5.  **Proxy API Request**: Use the Proxy API to fetch a custom object from Salesforce that isn't available in the standard Paragon action list.
6.  **Complex File Upload**: Implement a "Save to Google Drive" feature that reads a local file, hex-encodes it, and sends it via ActionKit.
7.  **Multi-Account Support**: Implement a selector that allows a user to choose which of their three connected Slack accounts to send a message to, passing the correct `X-Paragon-Credential` header.
## 6. Sources
1.  [Paragon Documentation (llms-full.txt)](https://docs.useparagon.com/llms-full.txt) - Comprehensive technical reference.
2.  [Paragon API Reference](https://docs.useparagon.com/apis/api-reference) - Details on SDK and REST API endpoints.
3.  [ActionKit for Tool Calling](https://docs.useparagon.com/actionkit/actionkit-for-tool-calling) - Specifics on AI agent integrations.
4.  [Proxy API Guide](https://docs.useparagon.com/apis/making-api-requests) - Instructions for custom 3rd-party requests.
5.  [Paragon ActionKit Playground](https://github.com/useparagon/actionkit-playground) - Reference implementation for LLM usage.
