A common UI requirement is to display which third-party applications a user has already connected to via Paragon, allowing them to manage or add new connections.

You need to write a frontend JavaScript module that initializes the Paragon SDK and returns an array of currently connected integration types. 

**Constraints:**
- Must first call `paragon.authenticate(projectId, userToken)`.
- Must utilize `paragon.getUser()` to extract and return the list of active/connected integrations.
- Gracefully handle and throw clear errors if authentication fails.