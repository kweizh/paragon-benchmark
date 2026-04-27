const fs = require('fs');

async function main() {
  try {
    const trailId = fs.readFileSync('/logs/trail_id', 'utf8').trim();
    const projectId = process.env.PARAGON_PROJECT_ID;
    const userToken = process.env.PARAGON_USER_TOKEN;

    const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;
    
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
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    console.log(`Status: ${response.status}`);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
