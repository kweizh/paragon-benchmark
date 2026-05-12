const axios = require('axios');
const fs = require('fs');
const path = require('path');

const projectId = process.env.PARAGON_PROJECT_ID;
const userToken = process.env.PARAGON_USER_TOKEN;

if (!projectId || !userToken) {
  console.error('Missing PARAGON_PROJECT_ID or PARAGON_USER_TOKEN');
  process.exit(1);
}

const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;

async function getSchema() {
  try {
    console.log(`Fetching schema for 'users' table from project ${projectId}...`);
    const response = await axios.post(
      url,
      {
        integration: 'postgres',
        action: 'getSchema', // Triggering the "get schema" action
        parameters: {
          tableName: 'users'
        }
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const schema = response.data;
    const outputPath = '/home/user/paragon-postgres/schema.json';
    fs.writeFileSync(outputPath, JSON.stringify(schema, null, 2));
    console.log(`Schema saved to ${outputPath}`);
  } catch (error) {
    console.error('Error fetching schema:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    process.exit(1);
  }
}

getSchema();
