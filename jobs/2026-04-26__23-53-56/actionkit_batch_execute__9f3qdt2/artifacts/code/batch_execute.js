/**
 * Executes multiple Paragon ActionKit actions in sequence.
 * 
 * @param {string} projectId - The Paragon project ID.
 * @param {string} userToken - The Paragon user token.
 * @param {Array<Object>} actions - An array of action payloads to execute.
 * @returns {Promise<Array<Object>>} - An array of responses from the API.
 */
async function executeActions(projectId, userToken, actions) {
  const responses = [];

  for (const action of actions) {
    try {
      const response = await fetch(`https://actionkit.useparagon.com/projects/${projectId}/actions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action)
      });

      const data = await response.json();
      responses.push(data);
    } catch (error) {
      console.error('Error executing action:', error);
      responses.push({ error: error.message });
    }
  }

  return responses;
}

module.exports = executeActions;
