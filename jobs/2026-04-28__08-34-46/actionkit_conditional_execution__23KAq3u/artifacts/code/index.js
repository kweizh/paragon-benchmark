const axios = require('axios');
const fs = require('fs');
const path = require('path');

const PROJECT_ID = process.env.PARAGON_PROJECT_ID;
const USER_TOKEN = process.env.PARAGON_USER_TOKEN;
const TRIAL_ID_PATH = '/logs/artifacts/trial_id';
const LOG_PATH = '/home/user/paragon-task/output.log';

async function run() {
  try {
    if (!PROJECT_ID || !USER_TOKEN) {
        throw new Error('PARAGON_PROJECT_ID or PARAGON_USER_TOKEN not set');
    }

    const trialId = fs.readFileSync(TRIAL_ID_PATH, 'utf8').trim();
    
    // Fetch available actions
    // According to Paragon ActionKit docs, the endpoint is GET /projects/{projectId}/actions
    const actionsResponse = await axios.get(
      `https://actionkit.useparagon.com/projects/${PROJECT_ID}/actions`,
      {
        headers: {
          Authorization: `Bearer ${USER_TOKEN}`
        }
      }
    );

    const actionsData = actionsResponse.data;
    let isAvailable = false;
    
    // Handle different possible response structures for actions
    const actionsList = actionsData.actions || [];
    
    if (Array.isArray(actionsList)) {
        isAvailable = actionsList.some(a => a.name === 'SLACK_SEND_MESSAGE');
    } else if (typeof actionsList === 'object') {
        // If grouped by integration
        for (const integration in actionsList) {
            if (Array.isArray(actionsList[integration]) && actionsList[integration].some(a => a.name === 'SLACK_SEND_MESSAGE')) {
                isAvailable = true;
                break;
            }
        }
    }

    if (isAvailable) {
      await axios.post(
        `https://actionkit.useparagon.com/projects/${PROJECT_ID}/actions/SLACK_SEND_MESSAGE`,
        {
          channel: '#general',
          text: `Hello from Paragon! trial_id: ${trialId}`
        },
        {
          headers: {
            Authorization: `Bearer ${USER_TOKEN}`
          }
        }
      );
      fs.writeFileSync(LOG_PATH, 'Message sent');
    } else {
      fs.writeFileSync(LOG_PATH, 'Action not available');
    }
  } catch (error) {
    const errorMsg = error.response ? JSON.stringify(error.response.data) : error.message;
    fs.writeFileSync(LOG_PATH, `Error: ${errorMsg}`);
    process.exit(1);
  }
}

run();
