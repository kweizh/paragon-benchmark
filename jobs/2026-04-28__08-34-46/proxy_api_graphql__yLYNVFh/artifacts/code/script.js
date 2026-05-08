const PARAGON_PROJECT_ID = process.env.PARAGON_PROJECT_ID;
const PARAGON_USER_TOKEN = process.env.PARAGON_USER_TOKEN;

async function sendGraphQLRequest() {
  const proxyUrl = `https://proxy.useparagon.com/projects/${PARAGON_PROJECT_ID}/sdk/proxy/github`;
  const githubGraphqlUrl = 'https://api.github.com/graphql';
  
  try {
    const response = await fetch(proxyUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PARAGON_USER_TOKEN}`,
        'X-Paragon-Proxy-Url': githubGraphqlUrl,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: 'query { viewer { login } }'
      })
    });

    const data = await response.json();
    console.log(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}

sendGraphQLRequest();
