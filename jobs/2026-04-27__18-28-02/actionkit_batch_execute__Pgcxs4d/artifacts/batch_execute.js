async function executeActions(projectId, userToken, actions) {
  const responses = [];
  for (const action of actions) {
    const response = await fetch(`https://actionkit.useparagon.com/projects/${projectId}/actions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(action)
    });
    responses.push(response);
  }
  return responses;
}

module.exports = executeActions;