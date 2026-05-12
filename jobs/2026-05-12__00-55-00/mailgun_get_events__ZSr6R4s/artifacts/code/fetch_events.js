const jwt = require('jsonwebtoken');
const fs = require('fs');

async function fetchMailgunEvents() {
  const projectId = process.env.PARAGON_PROJECT_ID;
  const signingKey = process.env.PARAGON_SIGNING_KEY;
  const userId = process.env.PARAGON_USER_ID;
  const mailgunDomain = process.env.MAILGUN_DOMAIN;

  if (!projectId || !signingKey || !userId || !mailgunDomain) {
    console.error('Missing required environment variables:');
    if (!projectId) console.error('- PARAGON_PROJECT_ID');
    if (!signingKey) console.error('- PARAGON_SIGNING_KEY');
    if (!userId) console.error('- PARAGON_USER_ID');
    if (!mailgunDomain) console.error('- MAILGUN_DOMAIN');
    process.exit(1);
  }

  // Ensure the signing key is formatted correctly if it's passed as a single line
  const formattedKey = signingKey.includes('-----BEGIN RSA PRIVATE KEY-----') 
    ? signingKey 
    : signingKey.replace(/\\n/g, '\n');

  const iat = Math.floor(Date.now() / 1000);
  const payload = {
    sub: userId,
    iat: iat,
  };

  let token;
  try {
    token = jwt.sign(payload, formattedKey, { algorithm: 'RS256' });
  } catch (err) {
    console.error('Error signing JWT:', err.message);
    process.exit(1);
  }

  const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;
  const body = JSON.stringify({
    action: 'MAILGUN_GET_EVENTS',
    parameters: {
      domain: mailgunDomain,
    },
  });

  try {
    console.log(`Sending request to Paragon ActionKit for project ${projectId}...`);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP error! Status: ${response.status}`);
      console.error(`Response body: ${errorText}`);
      process.exit(1);
    }

    const data = await response.json();
    fs.writeFileSync('/home/user/project/events.json', JSON.stringify(data, null, 2));
    console.log('Successfully fetched events and saved to /home/user/project/events.json');
  } catch (error) {
    console.error('Error during fetch operation:', error.message);
    process.exit(1);
  }
}

fetchMailgunEvents();
