const fs = require('fs');

async function addMember() {
  const PARAGON_PROJECT_ID = process.env.PARAGON_PROJECT_ID;
  const PARAGON_USER_TOKEN = process.env.PARAGON_USER_TOKEN;
  const MAILGUN_LIST_ADDRESS = process.env.MAILGUN_LIST_ADDRESS;
  const MEMBER_EMAIL = process.env.MEMBER_EMAIL;

  if (!PARAGON_PROJECT_ID || !PARAGON_USER_TOKEN || !MAILGUN_LIST_ADDRESS || !MEMBER_EMAIL) {
    console.error('Missing required environment variables');
    process.exit(1);
  }

  const url = `https://proxy.useparagon.com/projects/${PARAGON_PROJECT_ID}/sdk/proxy/mailgun`;
  const mailgunProxyUrl = `https://api.mailgun.net/v3/lists/${MAILGUN_LIST_ADDRESS}/members`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PARAGON_USER_TOKEN}`,
        'X-Paragon-Proxy-Url': mailgunProxyUrl,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address: MEMBER_EMAIL
      })
    });

    const statusCode = response.status;
    fs.writeFileSync('/home/user/project/output.log', statusCode.toString());
    console.log(`Response Status Code: ${statusCode}`);
  } catch (error) {
    console.error('Error adding member:', error);
    fs.writeFileSync('/home/user/project/output.log', 'Error');
    process.exit(1);
  }
}

addMember();
