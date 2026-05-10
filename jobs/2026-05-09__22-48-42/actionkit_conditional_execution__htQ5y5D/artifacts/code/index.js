const fs = require('fs');
const axios = require('axios');

async function main() {
  try {
    const trialId = fs.readFileSync('/logs/artifacts/trial_id', 'utf8').trim();
    const token = process.env.PARAGON_USER_TOKEN;
    const projectId = process.env.PARAGON_PROJECT_ID;

    if (!token || !projectId) {
      console.error('Missing PARAGON_USER_TOKEN or PARAGON_PROJECT_ID');
      return;
    }

    const actionsUrl = `https://actionkit.useparagon.com/projects/${projectId}/actions`;

    // Fetch available actions
    let actions = {};
    try {
      const getRes = await axios.get(actionsUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });
      actions = getRes.data.actions || {};
    } catch (err) {
      // If we cannot fetch actions (e.g. 402 or 400), we consider them not available
      console.error('Failed to fetch actions:', err.response ? err.response.data : err.message);
    }

    if (actions['SLACK_SEND_MESSAGE']) {
      // Execute the action
      try {
        await axios.post(actionsUrl, {
          action: "SLACK_SEND_MESSAGE",
          parameters: {
            channel: "#general",
            message: `Hello from Paragon! trial_id: ${trialId}`
          }
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fs.writeFileSync('/home/user/paragon-task/output.log', 'Message sent');
      } catch (execErr) {
        console.error('Failed to execute action:', execErr.response ? execErr.response.data : execErr.message);
        fs.writeFileSync('/home/user/paragon-task/output.log', 'Action not available');
      }
    } else {
      fs.writeFileSync('/home/user/paragon-task/output.log', 'Action not available');
    }
  } catch (error) {
    console.error('Unexpected Error:', error);
  }
}

main();
