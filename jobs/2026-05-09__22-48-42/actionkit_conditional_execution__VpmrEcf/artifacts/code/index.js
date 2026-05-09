const fs = require('fs');

async function main() {
  const projectId = process.env.PARAGON_PROJECT_ID;
  const token = process.env.PARAGON_USER_TOKEN;
  const trialId = fs.readFileSync('/logs/artifacts/trial_id', 'utf8').trim();

  try {
    const res = await fetch(`https://actionkit.useparagon.com/projects/${projectId}/actions`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();
    
    if (data.actions && data.actions['SLACK_SEND_MESSAGE']) {
      // Execute the action
      const execUrl = `https://actionkit.useparagon.com/projects/${projectId}/actions`;
      
      const execRes = await fetch(execUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'SLACK_SEND_MESSAGE',
          parameters: {
            channel: '#general',
            text: `Hello from Paragon! trial_id: ${trialId}`
          }
        })
      });
      
      if (execRes.ok) {
        fs.writeFileSync('/home/user/paragon-task/output.log', 'Message sent');
      } else {
        const err = await execRes.text();
        fs.writeFileSync('/home/user/paragon-task/output.log', `Failed to execute: ${err}`);
      }
    } else {
      fs.writeFileSync('/home/user/paragon-task/output.log', 'Action not available');
    }
  } catch (error) {
    fs.writeFileSync('/home/user/paragon-task/output.log', 'Action not available');
  }
}

main();
