const fs = require('fs');

async function callAction() {
  const projectId = process.env.PARAGON_PROJECT_ID || process.env.PROJECT_ID;
  const token = process.env.PARAGON_USER_TOKEN;

  const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        action: "SLACK_SEND_MESSAGE",
        parameters: {}
      })
    });

    if (!response.ok) {
      let errorBody;
      try {
        const json = await response.json();
        errorBody = JSON.stringify(json);
      } catch (e) {
        errorBody = await response.text();
      }
      
      const errorLog = {
        status: response.status,
        message: errorBody
      };
      fs.writeFileSync('/home/user/project/error_log.json', JSON.stringify(errorLog, null, 2));
      console.error(`Request failed with status ${response.status}`);
    } else {
      console.log("Request succeeded");
    }
  } catch (error) {
    const errorLog = {
      status: 500,
      message: error.message
    };
    fs.writeFileSync('/home/user/project/error_log.json', JSON.stringify(errorLog, null, 2));
    console.error(`Fetch error: ${error.message}`);
  }
}

callAction();