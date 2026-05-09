const https = require('https');
const fs = require('fs');
const path = require('path');

const projectId = process.env.PARAGON_PROJECT_ID;
const userToken = process.env.PARAGON_USER_TOKEN;

if (!projectId || !userToken) {
  console.error('Missing PARAGON_PROJECT_ID or PARAGON_USER_TOKEN');
  process.exit(1);
}

const options = {
  hostname: 'actionkit.useparagon.com',
  port: 443,
  path: `/projects/${projectId}/actions`,
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${userToken}`,
    'Accept': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode !== 200) {
      console.error(`Error fetching actions: ${res.statusCode} ${data}`);
      process.exit(1);
    }

    try {
      const responseBody = JSON.parse(data);
      
      let actionsList = [];
      if (Array.isArray(responseBody)) {
        actionsList = responseBody;
      } else if (responseBody && Array.isArray(responseBody.actions)) {
        actionsList = responseBody.actions;
      } else if (responseBody && Array.isArray(responseBody.data)) {
        actionsList = responseBody.data;
      } else if (responseBody && typeof responseBody === 'object') {
        actionsList = Object.values(responseBody);
      }

      const tools = actionsList.map(action => {
        return {
          type: 'function',
          function: {
            name: action.name,
            description: action.description,
            parameters: action.parameters || action.schema || action.parameters_schema || {}
          }
        };
      });

      const outputPath = path.join(__dirname, 'tools.json');
      fs.writeFileSync(outputPath, JSON.stringify(tools, null, 2));
      console.log('Successfully wrote tools.json');
      
      // Save artifacts
      const artifactsDir = '/logs/artifacts/code';
      if (!fs.existsSync(artifactsDir)) {
        fs.mkdirSync(artifactsDir, { recursive: true });
      }
      fs.copyFileSync(__filename, path.join(artifactsDir, 'convert.js'));
      fs.copyFileSync(outputPath, path.join(artifactsDir, 'tools.json'));
    } catch (err) {
      console.error('Error parsing JSON or writing file:', err);
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
  process.exit(1);
});

req.end();
