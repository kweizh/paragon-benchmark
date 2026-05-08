const fs = require('fs');

async function sendMessage() {
  try {
    const trailId = fs.readFileSync('/logs/artifacts/trial_id', 'utf8').trim();
    const PARAGON_PROJECT_ID = process.env.PARAGON_PROJECT_ID;
    const PARAGON_USER_TOKEN = process.env.PARAGON_USER_TOKEN;
    const PARAGON_SIGNING_KEY = process.env.PARAGON_SIGNING_KEY;

    if (!PARAGON_PROJECT_ID || !PARAGON_USER_TOKEN) {
      console.error('Missing PARAGON_PROJECT_ID or PARAGON_USER_TOKEN environment variables');
      process.exit(1);
    }

    const url = `https://actionkit.useparagon.com/projects/${PARAGON_PROJECT_ID}/actions`;
    const body = {
      action: 'SLACK_SEND_MESSAGE',
      parameters: {
        channel: `#test-channel-${trailId}`,
        message: 'Hello from ActionKit!'
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PARAGON_USER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    console.log(`Response status: ${response.status}`);
    const data = await response.json();
    console.log('Response body:', JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

sendMessage();
