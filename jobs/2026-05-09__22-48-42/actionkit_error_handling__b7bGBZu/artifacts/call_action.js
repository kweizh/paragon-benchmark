const fs = require('fs');

async function callAction() {
  const projectId = process.env.PARAGON_PROJECT_ID || process.env.PROJECT_ID;
  const token = process.env.PARAGON_USER_TOKEN;

  try {
    const response = await fetch(`https://actionkit.useparagon.com/projects/${projectId}/actions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: "SLACK_SEND_MESSAGE",
        parameters: {}
      })
    });

    if (!response.ok) {
      let errorMessage = response.statusText;
      try {
        const errorBody = await response.text();
        if (errorBody) {
          errorMessage = errorBody;
        }
      } catch (e) {
        // Ignore
      }

      const errorDetails = {
        status: response.status,
        message: errorMessage
      };

      fs.writeFileSync('/home/user/project/error_log.json', JSON.stringify(errorDetails, null, 2));
    } else {
      console.log('Request succeeded');
    }
  } catch (error) {
    const errorDetails = {
      status: 500,
      message: error.message
    };
    fs.writeFileSync('/home/user/project/error_log.json', JSON.stringify(errorDetails, null, 2));
  }
}

callAction();
