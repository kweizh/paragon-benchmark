const projectId = process.env.PARAGON_PROJECT_ID;
const userToken = process.env.PARAGON_USER_TOKEN;

if (!projectId || !userToken) {
  console.error('PARAGON_PROJECT_ID and PARAGON_USER_TOKEN must be set');
  process.exit(1);
}

const url = `https://proxy.useparagon.com/projects/${projectId}/sdk/proxy/slack`;

const payload = {
  channel: "#general",
  text: "Hello via Proxy API!"
};

fetch(url, {
  method: 'POST',
  headers: {
    'X-Paragon-Proxy-Url': 'https://slack.com/api/chat.postMessage',
    'Authorization': `Bearer ${userToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(payload)
})
.then(async response => {
  const data = await response.text();
  console.log('Status:', response.status);
  console.log('Response:', data);
})
.catch(error => {
  console.error('Error:', error);
});
