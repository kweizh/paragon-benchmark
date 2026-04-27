const fs = require('fs');

async function callAction() {
  const projectId = process.env.PROJECT_ID;
  const token = process.env.PARAGON_USER_TOKEN;

  const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;

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
      let errorText;
      try {
        errorText = await response.text();
      } catch (e) {
        errorText = response.statusText;
      }
      const errorDetails = {
        status: response.status,
        message: errorText
      };
      fs.writeFileSync('/home/user/project/error_log.json', JSON.stringify(errorDetails, null, 2));
    } else {
      const data = await response.text();
      console.log('Success:', data);
    }
  } catch (error) {
    const errorDetails = {
      status: error.status || 500,
      message: error.message || 'Unknown error occurred'
    };
    fs.writeFileSync('/home/user/project/error_log.json', JSON.stringify(errorDetails, null, 2));
  }
}

callAction();
