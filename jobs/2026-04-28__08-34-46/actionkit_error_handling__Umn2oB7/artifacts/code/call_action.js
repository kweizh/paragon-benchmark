const fs = require('fs');

async function callAction() {
  const projectId = process.env.PROJECT_ID || process.env.PARAGON_PROJECT_ID;
  const userToken = process.env.PARAGON_USER_TOKEN;
  const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;

  const payload = {
    action: "SLACK_SEND_MESSAGE",
    parameters: {}
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const responseBody = await response.text();
      let message;
      try {
        const json = JSON.parse(responseBody);
        message = json.message || responseBody;
      } catch (e) {
        message = responseBody;
      }

      const errorData = {
        status: response.status,
        message: message
      };

      fs.writeFileSync('/home/user/project/error_log.json', JSON.stringify(errorData, null, 2));
      console.log(`Request failed with status ${response.status}. Error logged.`);
    } else {
      const data = await response.json();
      console.log('Request successful:', data);
    }
  } catch (error) {
    const errorData = {
      status: 500,
      message: error.message
    };
    fs.writeFileSync('/home/user/project/error_log.json', JSON.stringify(errorData, null, 2));
    console.error('An unexpected error occurred:', error.message);
  }
}

callAction();
