const fs = require('fs');
const jwt = require('jsonwebtoken');

async function main() {
  const payloadStr = fs.readFileSync('/home/user/app/llm_response.json', 'utf8');
  const payload = JSON.parse(payloadStr);

  const projectId = process.env.PARAGON_PROJECT_ID;
  const signingKey = process.env.PARAGON_SIGNING_KEY;

  const token = jwt.sign(
    { sub: 'user-123', iat: Math.floor(Date.now() / 1000) },
    signingKey,
    { algorithm: 'HS256' }
  );

  const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  const responseStatus = response.status;
  
  let responseBody;
  const text = await response.text();
  try {
    responseBody = JSON.parse(text);
  } catch (e) {
    responseBody = text;
  }

  const output = {
    status: responseStatus,
    data: responseBody
  };

  fs.writeFileSync('/home/user/app/output.json', JSON.stringify(output, null, 2));
}

main().catch(console.error);
