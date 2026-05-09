const fs = require('fs');
const { paragon } = require('@useparagon/connect');

async function main() {
  const projectId = process.env.PARAGON_PROJECT_ID;
  const userToken = process.env.PARAGON_USER_TOKEN;

  try {
    await paragon.authenticate(projectId, userToken);
    
    const result = await paragon.installAction('slack', 'send_message', { 
      channel: '#general' 
    });
    
    fs.writeFileSync('/home/user/paragon-app/output.log', JSON.stringify(result, null, 2));
    console.log("Action installed successfully.");
  } catch (error) {
    fs.writeFileSync('/home/user/paragon-app/output.log', JSON.stringify({ error: error.message }, null, 2));
    console.error("Error installing action:", error);
  }
}

main();
