const PARAGON_PROJECT_ID = process.env.PARAGON_PROJECT_ID;
const PARAGON_USER_TOKEN = process.env.PARAGON_USER_TOKEN;

async function makeRequest() {
  const proxyEndpoint = `https://proxy.useparagon.com/projects/${PARAGON_PROJECT_ID}/sdk/proxy/github`;
  
  const response = await fetch(proxyEndpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PARAGON_USER_TOKEN}`,
      'X-Paragon-Proxy-Url': 'https://api.github.com/graphql',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: 'query { viewer { login } }' })
  });

  const data = await response.json();
  console.log(JSON.stringify(data));
}

makeRequest().catch(console.error);
