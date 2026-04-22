When standard Paragon actions do not cover specific custom objects in an integration (like a proprietary Salesforce object), developers must use the Proxy API to make direct requests.

You need to write an asynchronous function that fetches a custom Salesforce object using the Paragon Proxy API.

**Constraints:**
- The request URL must be routed through `https://proxy.useparagon.com/projects/{projectId}/sdk/proxy/salesforce`.
- You MUST include the `X-Paragon-Proxy-Url` header containing the actual target Salesforce endpoint URL.
- The request must be authenticated with the user's Paragon Bearer token.