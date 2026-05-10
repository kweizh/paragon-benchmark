const fs = require('fs');

async function main() {
  const trail_id = fs.readFileSync('/logs/artifacts/trial_id', 'utf8').trim();
  
  const PARAGON_PROJECT_ID = process.env.PARAGON_PROJECT_ID;
  const PARAGON_SIGNING_KEY = process.env.PARAGON_SIGNING_KEY;
  const PARAGON_USER_TOKEN = process.env.PARAGON_USER_TOKEN;

  // Use slack api to create the channel before sending message
  const createChannelRes = await fetch(`https://proxy.useparagon.com/projects/${PARAGON_PROJECT_ID}/sdk/proxy/slack/conversations.create`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PARAGON_USER_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: `test-channel-${trail_id}`.toLowerCase()
    })
  });
  
  console.log(`Create Channel Status: ${createChannelRes.status}`);
  console.log(`Create Channel Body: ${await createChannelRes.text()}`);

  // Construct the fetch request to the ActionKit API
  const actionKitRes = await fetch(`https://actionkit.useparagon.com/projects/${PARAGON_PROJECT_ID}/actions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PARAGON_USER_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action: "SLACK_SEND_MESSAGE",
      parameters: {
        channel: `#test-channel-${trail_id}`,
        message: "Hello from ActionKit!"
      }
    })
  });
  
  console.log(`ActionKit Status: ${actionKitRes.status}`);
  console.log(`ActionKit Body: ${await actionKitRes.text()}`);
}

main().catch(console.error);
