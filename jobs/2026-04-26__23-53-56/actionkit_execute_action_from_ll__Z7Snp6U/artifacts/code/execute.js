const fs = require('fs');
const jwt = require('jsonwebtoken');

async function execute() {
  try {
    const signingKey = process.env.PARAGON_SIGNING_KEY;
    const projectId = process.env.PARAGON_PROJECT_ID;

    if (!signingKey || !projectId) {
      console.error('Missing environment variables PARAGON_SIGNING_KEY or PARAGON_PROJECT_ID');
      process.exit(1);
    }

    // Read LLM response
    const llmResponseData = fs.readFileSync('/home/user/app/llm_response.json', 'utf8');
    const actionPayload = JSON.parse(llmResponseData);

    // Generate JWT
    const token = jwt.sign(
      {
        sub: 'user-123',
        iat: Math.floor(Date.now() / 1000)
      },
      signingKey,
      { algorithm: 'HS256' }
    );

    // Make POST request
    const response = await fetch(`https://actionkit.useparagon.com/projects/${projectId}/actions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(actionPayload)
    });

    const status = response.status;
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = { error: 'Failed to parse response JSON' };
    }

    // Save output
    const output = {
      status,
      data
    };

    fs.writeFileSync('/home/user/app/output.json', JSON.stringify(output, null, 2));
    console.log(`Execution completed with status ${status}`);

  } catch (error) {
    console.error('Error executing action:', error);
    process.exit(1);
  }
}

execute();
