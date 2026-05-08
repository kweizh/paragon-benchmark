const fs = require('fs');
const path = require('path');

async function run() {
  const logFile = '/home/user/project/output.log';
  const logStream = fs.createWriteStream(logFile, { flags: 'a' });

  function log(message) {
    console.log(message);
    logStream.write(`${new Date().toISOString()} - ${message}\n`);
  }

  try {
    const trialIdPath = '/logs/artifacts/trial_id';
    const reportPath = '/home/user/project/report.txt';
    
    if (!fs.existsSync(trialIdPath)) {
        throw new Error(`Trial ID file not found at ${trialIdPath}`);
    }
    if (!fs.existsSync(reportPath)) {
        throw new Error(`Report file not found at ${reportPath}`);
    }

    const trialId = fs.readFileSync(trialIdPath, 'utf8').trim();
    const reportBuffer = fs.readFileSync(reportPath);
    const hexEncodedFile = reportBuffer.toString('hex');

    const projectId = process.env.PARAGON_PROJECT_ID;
    const userToken = process.env.PARAGON_USER_TOKEN;

    if (!projectId || !userToken) {
      throw new Error('PARAGON_PROJECT_ID or PARAGON_USER_TOKEN environment variables are not set');
    }

    const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;
    const body = {
      action: 'SLACK_UPLOAD_FILE',
      parameters: {
        channels: `#test-channel-${trialId}`,
        file: hexEncodedFile,
        filename: 'report.txt'
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    log(`Response Status: ${response.status}`);
    const data = await response.json().catch(() => ({}));
    log(`Response Data: ${JSON.stringify(data)}`);

  } catch (error) {
    log(`Error: ${error.message}`);
    process.exit(1);
  } finally {
    logStream.end();
  }
}

run();
