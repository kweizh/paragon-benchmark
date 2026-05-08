const https = require('https');
const fs = require('fs');
const path = require('path');

/**
 * Fetches available actions from Paragon ActionKit and converts them to OpenAI tool definitions.
 */
async function convertActions() {
  const projectId = process.env.PARAGON_PROJECT_ID;
  const userToken = process.env.PARAGON_USER_TOKEN;

  if (!projectId || !userToken) {
    console.error('Error: PARAGON_PROJECT_ID and PARAGON_USER_TOKEN environment variables are required.');
    process.exit(1);
  }

  const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;

  const options = {
    headers: {
      'Authorization': `Bearer ${userToken}`,
      'Accept': 'application/json'
    }
  };

  https.get(url, options, (res) => {
    let data = '';

    if (res.statusCode !== 200) {
      console.error(`Error: API request failed with status code ${res.statusCode}`);
      res.resume(); // Consume response data to free up memory
      process.exit(1);
    }

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        let actions = [];

        if (Array.isArray(response)) {
          actions = response;
        } else if (response.actions) {
          if (Array.isArray(response.actions)) {
            actions = response.actions;
          } else if (typeof response.actions === 'object') {
            // If actions is an object where keys are integrations and values are arrays of actions
            actions = Object.values(response.actions).flat();
          }
        }

        const tools = actions.map(action => {
          // ActionKit actions typically have name, description, and inputSchema/parameters
          // We map them to the OpenAI tool format
          return {
            type: 'function',
            function: {
              name: action.name || action.id,
              description: action.description || '',
              parameters: action.parameters || action.inputSchema || {
                type: 'object',
                properties: {},
                required: []
              }
            }
          };
        });

        const outputPath = path.join(__dirname, 'tools.json');
        fs.writeFileSync(outputPath, JSON.stringify(tools, null, 2));
        console.log(`Successfully converted ${tools.length} actions to tools.json`);
      } catch (e) {
        console.error('Error: Failed to parse API response.', e.message);
        process.exit(1);
      }
    });
  }).on('error', (err) => {
    console.error('Error: Failed to fetch actions.', err.message);
    process.exit(1);
  });
}

convertActions();
