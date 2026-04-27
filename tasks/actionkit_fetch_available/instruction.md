# Fetch ActionKit Available Actions

## Background
Paragon's ActionKit API allows you to retrieve a list of available actions for an authenticated user in JSON Schema format. This is useful for passing tool definitions to an LLM.

## Requirements
- You need to fetch the available actions for a Paragon project using `curl`.
- The Project ID read from env `PARAGON_PROJECT_ID`.
- The Paragon User Token read from env `PARAGON_USER_TOKEN`.
- Save the HTTP response body to `/home/user/actions.json`.

## Implementation Guide
1. Construct a `curl` GET request to `https://actionkit.useparagon.com/projects/${PARAGON_PROJECT_ID}/actions`.
2. Include the `Authorization: Bearer ${PARAGON_USER_TOKEN}` header.
3. Include the `Content-Type: application/json` header.
4. Output the result directly to `/home/user/actions.json`.

## Constraints
- Project path: /home/user
- Log file: /home/user/actions.json
- Must be a single `curl` command (or a short bash script) that outputs to `actions.json`.

## Integrations
- None