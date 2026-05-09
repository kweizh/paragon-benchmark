const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

async function trigger() {
  const projectId = process.env.PARAGON_PROJECT_ID;
  const privateKey = process.env.PARAGON_SIGNING_KEY.replace(/\\n/g, '\n');
  const userId = 'test-user-123';

  // Generate JWT
  const token = jwt.sign(
    {
      sub: userId,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    },
    privateKey,
    {
      algorithm: 'RS256'
    }
  );

  const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;
  
  const payload = {
    action: 'CUSTOM_WORKFLOW_TRIGGER',
    parameters: {
      event: "test_event",
      value: 42
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    
    // We expect a JSON response, but handle text just in case
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      data = { text };
    }

    // Save to output.json
    fs.writeFileSync(path.join(__dirname, 'output.json'), JSON.stringify(data, null, 2));
    console.log('Successfully saved response to output.json');
  } catch (err) {
    console.error('Error triggering ActionKit:', err);
    fs.writeFileSync(path.join(__dirname, 'output.json'), JSON.stringify({ error: err.message }, null, 2));
  }
}

trigger();
