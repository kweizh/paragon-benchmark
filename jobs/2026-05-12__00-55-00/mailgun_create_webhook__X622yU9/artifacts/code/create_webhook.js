const fs = require('fs');

async function createWebhook() {
  const projectId = process.env.PARAGON_PROJECT_ID;
  const userToken = process.env.PARAGON_USER_TOKEN;
  const mailgunDomain = process.env.MAILGUN_DOMAIN;

  if (!projectId || !userToken || !mailgunDomain) {
    console.error('Missing environment variables: PARAGON_PROJECT_ID, PARAGON_USER_TOKEN, or MAILGUN_DOMAIN');
    process.exit(1);
  }

  const url = `https://proxy.useparagon.com/projects/${projectId}/sdk/proxy/mailgun`;
  const mailgunUrl = `https://api.mailgun.net/v3/domains/${mailgunDomain}/webhooks`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
        'X-Paragon-Proxy-Url': mailgunUrl
      },
      body: JSON.stringify({
        id: 'click',
        url: 'https://example.com/webhook'
      })
    });

    const statusCode = response.status.toString();
    fs.writeFileSync('/home/user/project/output.log', statusCode);
    console.log(`Response status code: ${statusCode}`);
  } catch (error) {
    console.error('Error creating webhook:', error);
    process.exit(1);
  }
}

createWebhook();
