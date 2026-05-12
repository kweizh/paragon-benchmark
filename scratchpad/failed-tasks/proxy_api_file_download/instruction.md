# Download File via Proxy API

## Background
You need to download a file from an integration (Slack) using Paragon's Proxy API. Because the response is binary/file data rather than JSON, you must use the `X-Paragon-Use-Raw-Response` header.

## Requirements
You are provided with a Node.js project at `/home/user/app`.
The script `/home/user/app/download.js` should read a Slack file URL from `/home/user/app/file_url.txt`.
Using the `node-fetch` library (already installed), make a GET request to the Paragon Proxy API to download the file.
The URL to request should be: `https://proxy.useparagon.com/projects/${process.env.PARAGON_PROJECT_ID}/sdk/proxy/slack/${fileUrl}`
You must authenticate with the `PARAGON_USER_TOKEN` environment variable.
You must include the `X-Paragon-Use-Raw-Response: 1` header to receive the raw file data.
Save the downloaded file data to `/home/user/app/downloaded.txt`.

## Constraints
- Project path: `/home/user/app`
- Log file: `/home/user/app/downloaded.txt`
- Use `node-fetch` for the request.
- Do not hardcode the file URL; read it from `file_url.txt`.
