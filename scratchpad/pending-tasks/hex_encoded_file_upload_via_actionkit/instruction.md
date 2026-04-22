Paragon's ActionKit handles file uploads differently than standard multipart form data. It requires files to be hex-encoded within a standard JSON body.

You need to implement a Node.js function that reads a local file, hex-encodes its contents, and executes an ActionKit action to upload that file to Google Drive.

**Constraints:**
- The file content MUST be hex-encoded and passed as a string within the JSON payload.
- Must execute a `POST` request to `https://actionkit.useparagon.com/projects/{projectId}/actions` specifying the correct Google Drive action.
- Ensure the `Content-Type` header is set strictly to `application/json`.