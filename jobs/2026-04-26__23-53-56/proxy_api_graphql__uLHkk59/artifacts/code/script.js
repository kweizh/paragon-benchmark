const PARAGON_PROJECT_ID = process.env.PARAGON_PROJECT_ID;
const PARAGON_USER_TOKEN = process.env.PARAGON_USER_TOKEN;

async function sendRequest() {
  const response = await fetch(`https://proxy.useparagon.com/projects/${PARAGON_PROJECT_ID}/sdk/proxy/github`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PARAGON_USER_TOKEN}`,
      'X-Paragon-Proxy-Url': 'https://api.github.com/graphql',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: 'query { viewer { login } }'
    })
  });

  console.log(JSON.stringify(await response.json()));
}

sendRequest();
