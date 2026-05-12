const fs = require('fs');

async function deleteRow() {
  const projectId = process.env.PARAGON_PROJECT_ID;
  const userToken = process.env.PARAGON_USER_TOKEN;

  if (!projectId || !userToken) {
    console.error('PARAGON_PROJECT_ID and PARAGON_USER_TOKEN environment variables are required.');
    process.exit(1);
  }

  const url = `https://proxy.useparagon.com/projects/${projectId}/sdk/proxy/postgres`;
  const headers = {
    'Authorization': `Bearer ${userToken}`,
    'X-Paragon-Proxy-Url': '/query',
    'Content-Type': 'application/json'
  };
  const body = JSON.stringify({
    query: "DELETE FROM users WHERE id = 123"
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body
    });

    const statusCode = response.status;
    fs.writeFileSync('/home/user/project/output.log', statusCode.toString());
    console.log(`Response status code: ${statusCode}`);
  } catch (error) {
    console.error('Error making request:', error);
    fs.writeFileSync('/home/user/project/output.log', 'Error');
  }
}

deleteRow();
