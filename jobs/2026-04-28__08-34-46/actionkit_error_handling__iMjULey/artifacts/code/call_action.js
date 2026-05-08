const fs = require('fs');

async function callAction() {
  const projectId = process.env.PARAGON_PROJECT_ID || process.env.PROJECT_ID;
  const userToken = process.env.PARAGON_USER_TOKEN;
  const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: "SLACK_SEND_MESSAGE",
        parameters: {}
      })
    });

    if (!response.ok) {
      const message = await response.text();
      const errorLog = {
        status: response.status,
        message: message
      };
      fs.writeFileSync('/home/user/project/error_log.json', JSON.stringify(errorLog, null, 2));
    }
  } catch (error) {
    const errorLog = {
      status: 500,
      message: error.message
    };
    fs.writeFileSync('/home/user/project/error_log.json', JSON.stringify(errorLog, null, 2));
  }
}

callAction();
