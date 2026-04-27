const { paragon } = require('@useparagon/connect');
const fs = require('fs');

async function main() {
  const PROJECT_ID = process.env.PARAGON_PROJECT_ID;
  const USER_TOKEN = process.env.PARAGON_USER_TOKEN;

  try {
    await paragon.authenticate(PROJECT_ID, USER_TOKEN);
    const result = await paragon.installAction('slack', 'send_message', { channel: '#general' });
    fs.writeFileSync('/home/user/paragon-app/output.log', JSON.stringify(result, null, 2));
    console.log('Action installed successfully');
  } catch (error) {
    fs.writeFileSync('/home/user/paragon-app/output.log', JSON.stringify({ error: error.message }, null, 2));
    console.error('Error installing action:', error);
  }
}

main();
