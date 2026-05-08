const fs = require('fs');
const jwt = require('jsonwebtoken');

async function execute() {
  const signingKey = process.env.PARAGON_SIGNING_KEY;
  const projectId = process.env.PARAGON_PROJECT_ID;

  if (!signingKey || !projectId) {
    console.error('Missing PARAGON_SIGNING_KEY or PARAGON_PROJECT_ID environment variables');
    process.exit(1);
  }

  try {
    // 1. Read llm_response.json
    const llmResponseData = fs.readFileSync('/home/user/app/llm_response.json', 'utf8');
    const actionPayload = JSON.parse(llmResponseData);

    // 2. Generate Paragon User Token (JWT)
    let key = signingKey.replace(/\\n/g, '\n');
    if (!key.endsWith('\n')) {
      key += '\n';
    }

    const token = jwt.sign(
      {
        sub: "user-123",
        iat: Math.floor(Date.now() / 1000)
      },
      key,
      { algorithm: 'RS256' }
    );

    // 3. Make POST request to ActionKit API
    const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(actionPayload)
    });

    const responseStatus = response.status;
    const responseData = await response.json();

    // 4. Save HTTP response to output.json
    const output = {
      status: responseStatus,
      data: responseData
    };

    fs.writeFileSync('/home/user/app/output.json', JSON.stringify(output, null, 2));
    console.log('Action executed successfully. Output saved to output.json');

  } catch (error) {
    console.error('Error executing action:', error);
    process.exit(1);
  }
}

execute();
