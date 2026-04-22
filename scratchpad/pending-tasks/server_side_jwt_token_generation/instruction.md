Developers must securely authenticate users before initializing the Paragon SDK on the client side. This requires generating a signed JWT on the server to prevent exposing private keys.

You need to implement a Node.js server-side function that generates a signed Paragon User Token (JWT) for a specific user ID. 

**Constraints:**
- Must sign the JWT using a provided `PARAGON_SIGNING_KEY` environment variable.
- The JWT payload MUST include the `sub` claim (the user's unique ID) and the `iat` claim (issued at time).
- Do NOT include client-side or frontend code in this implementation; it must be strictly a server-side utility function.