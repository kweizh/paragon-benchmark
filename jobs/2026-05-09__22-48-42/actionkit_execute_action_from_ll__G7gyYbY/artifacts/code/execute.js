const fs = require('fs');
const jwt = require('jsonwebtoken');

async function main() {
  try {
    const projectId = process.env.PARAGON_PROJECT_ID;
    const signingKey = process.env.PARAGON_SIGNING_KEY;

    if (!projectId || !signingKey) {
      throw new Error('Missing PARAGON_PROJECT_ID or PARAGON_SIGNING_KEY');
    }

    const llmResponseRaw = fs.readFileSync('/home/user/app/llm_response.json', 'utf8');
    const llmResponse = JSON.parse(llmResponseRaw);

    const currentTime = Math.floor(Date.now() / 1000);
    const token = jwt.sign(
      { sub: 'user-123', iat: currentTime },
      signingKey,
      { algorithm: 'HS256' }
    );

    const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(llmResponse)
    });

    const status = response.status;
    let data;
    try {
      data = await response.json();
    } catch (e) {
      data = await response.text();
    }

    const output = {
      status,
      data
    };

    fs.writeFileSync('/home/user/app/output.json', JSON.stringify(output, null, 2));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
main();