const fs = require('fs');

async function uploadFile() {
  const logFile = '/home/user/project/output.log';
  const log = (msg) => {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
  };
  const logError = (msg) => {
    console.error(msg);
    fs.appendFileSync(logFile, 'ERROR: ' + msg + '\n');
  };

  try {
    const trialId = fs.readFileSync('/logs/artifacts/trial_id', 'utf8').trim();
    const projectId = process.env.PARAGON_PROJECT_ID;
    const userToken = process.env.PARAGON_USER_TOKEN;

    if (!projectId || !userToken) {
      logError('Missing PARAGON_PROJECT_ID or PARAGON_USER_TOKEN');
      process.exit(1);
    }

    const fileContent = fs.readFileSync('/home/user/project/report.txt');
    const hexFile = fileContent.toString('hex');

    const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'SLACK_UPLOAD_FILE',
        parameters: {
          channels: `#test-channel-${trialId}`,
          file: hexFile,
          filename: 'report.txt'
        }
      })
    });

    log(`Response status: ${response.status}`);
  } catch (error) {
    logError(`Error: ${error.message}`);
  }
}

uploadFile();
