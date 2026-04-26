const fs = require('fs');

async function callAction() {
  const projectId = process.env.PROJECT_ID;
  const token = process.env.PARAGON_USER_TOKEN;
  const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;
  const logPath = '/home/user/project/error_log.json';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'SLACK_SEND_MESSAGE',
        parameters: {}
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      let message;
      try {
        message = JSON.parse(errorBody);
      } catch (e) {
        message = errorBody;
      }
      
      const errorData = {
        status: response.status,
        message: message
      };
      
      fs.writeFileSync(logPath, JSON.stringify(errorData, null, 2));
      console.error(`Error: Received status ${response.status}`);
    } else {
      console.log('Action successfully called.');
    }
  } catch (error) {
    const errorData = {
      status: error.status || 500,
      message: error.message
    };
    fs.writeFileSync(logPath, JSON.stringify(errorData, null, 2));
    console.error('An unexpected error occurred:', error.message);
  }
}

callAction();
