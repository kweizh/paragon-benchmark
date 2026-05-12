const fs = require('fs');

async function updateMember() {
  const projectId = process.env.PARAGON_PROJECT_ID;
  const userToken = process.env.PARAGON_USER_TOKEN;
  const listAddress = process.env.MAILGUN_LIST_ADDRESS;
  const memberAddress = process.env.MAILGUN_MEMBER_ADDRESS;

  if (!projectId || !userToken || !listAddress || !memberAddress) {
    console.error('Missing required environment variables.');
    process.exit(1);
  }

  const proxyUrl = `https://proxy.useparagon.com/projects/${projectId}/sdk/proxy/mailgun`;
  const mailgunUrl = `https://api.mailgun.net/v3/lists/${listAddress}/members/${memberAddress}`;

  try {
    const response = await fetch(proxyUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
        'X-Paragon-Proxy-Url': mailgunUrl
      },
      body: JSON.stringify({
        name: 'Updated Name'
      })
    });

    const statusCode = response.status.toString();
    fs.writeFileSync('/home/user/project/output.log', statusCode);
    console.log(`Status Code: ${statusCode}`);
  } catch (error) {
    console.error('Error:', error);
    fs.writeFileSync('/home/user/project/output.log', 'Error: ' + error.message);
  }
}

updateMember();
