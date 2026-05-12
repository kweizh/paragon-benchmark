const fs = require('fs');
const path = require('path');

async function deleteMailgunMember() {
  const projectId = process.env.PARAGON_PROJECT_ID;
  const userToken = process.env.PARAGON_USER_TOKEN;
  const listAddress = process.env.MAILGUN_LIST_ADDRESS;
  const memberAddress = process.env.MAILGUN_MEMBER_ADDRESS;

  if (!projectId || !userToken || !listAddress || !memberAddress) {
    console.error('Missing required environment variables.');
    process.exit(1);
  }

  const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;

  // Standard Mailgun API parameters for deleting a member are usually list_address and address.
  // ActionKit often maps these directly or uses common naming conventions.
  const payload = {
    action: 'MAILGUN_DELETE_MAILING_LIST_MEMBER',
    parameters: {
      list_address: listAddress,
      address: memberAddress
    }
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

    const data = await response.json();
    const outputPath = path.join(__dirname, 'output.json');
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`Response saved to ${outputPath}`);
  } catch (error) {
    console.error('Error executing Paragon action:', error);
    process.exit(1);
  }
}

deleteMailgunMember();
