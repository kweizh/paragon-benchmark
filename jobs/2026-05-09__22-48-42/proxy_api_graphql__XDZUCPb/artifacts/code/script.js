const projectId = process.env.PARAGON_PROJECT_ID;
const userToken = process.env.PARAGON_USER_TOKEN;

async function sendGraphQLRequest() {
  const url = `https://proxy.useparagon.com/projects/${projectId}/sdk/proxy/github`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${userToken}`,
      'X-Paragon-Proxy-Url': 'https://api.github.com/graphql',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: 'query { viewer { login } }'
    })
  });
  
  console.log(JSON.stringify(await response.json()));
}

sendGraphQLRequest().catch(console.error);
