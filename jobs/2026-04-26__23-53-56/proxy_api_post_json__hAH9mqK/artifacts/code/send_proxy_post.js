const PARAGON_PROJECT_ID = process.env.PARAGON_PROJECT_ID;
const PARAGON_USER_TOKEN = process.env.PARAGON_USER_TOKEN;

if (!PARAGON_PROJECT_ID || !PARAGON_USER_TOKEN) {
  console.error("Error: PARAGON_PROJECT_ID and PARAGON_USER_TOKEN environment variables must be set.");
  process.exit(1);
}

const proxyUrl = `https://proxy.useparagon.com/projects/${PARAGON_PROJECT_ID}/sdk/proxy/slack`;
const slackApiUrl = 'https://slack.com/api/chat.postMessage';

async function sendProxyPost() {
  try {
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'X-Paragon-Proxy-Url': slackApiUrl,
        'Authorization': `Bearer ${PARAGON_USER_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        channel: '#general',
        text: 'Hello via Proxy API!'
      })
    });

    const data = await response.json();
    console.log('Response Status:', response.status);
    console.log('Response Body:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error sending request:', error);
    process.exit(1);
  }
}

sendProxyPost();
