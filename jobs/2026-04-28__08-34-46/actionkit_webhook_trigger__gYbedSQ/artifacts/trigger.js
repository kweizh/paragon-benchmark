const jwt = require('jsonwebtoken');
const fs = require('fs');

async function main() {
  const projectId = process.env.PARAGON_PROJECT_ID;
  let signingKey = process.env.PARAGON_SIGNING_KEY;

  if (!projectId || !signingKey) {
    console.error('Error: PARAGON_PROJECT_ID and PARAGON_SIGNING_KEY must be set.');
    process.exit(1);
  }

  // Handle potential escaped newlines in the environment variable
  if (signingKey.includes('\\n')) {
    signingKey = signingKey.replace(/\\n/g, '\n');
  }

  const userId = 'test-user-123';
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: userId,
    iat: now,
    exp: now + 60 * 60, // 1 hour
  };

  // Paragon User Tokens use RS256 algorithm with the provided private key
  const token = jwt.sign(payload, signingKey, { algorithm: 'RS256' });

  const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;
  const body = {
    action: 'CUSTOM_WORKFLOW_TRIGGER',
    parameters: {
      event: 'test_event',
      value: 42
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error (${response.status}): ${errorText}`);
      try {
        const errorJson = JSON.parse(errorText);
        fs.writeFileSync('output.json', JSON.stringify(errorJson, null, 2));
      } catch (e) {
        fs.writeFileSync('output.json', JSON.stringify({ status: response.status, error: errorText }, null, 2));
      }
      return;
    }

    const data = await response.json();
    fs.writeFileSync('output.json', JSON.stringify(data, null, 2));
    console.log('Response saved to output.json');
  } catch (error) {
    console.error('Error triggering ActionKit:', error);
    fs.writeFileSync('output.json', JSON.stringify({ error: error.message }, null, 2));
    process.exit(1);
  }
}

main();
