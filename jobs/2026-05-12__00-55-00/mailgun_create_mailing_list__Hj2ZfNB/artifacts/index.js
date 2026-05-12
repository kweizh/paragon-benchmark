const fs = require('fs');

async function createMailingList() {
  const projectId = process.env.PARAGON_PROJECT_ID;
  const userToken = process.env.PARAGON_USER_TOKEN;
  const mailgunDomain = process.env.MAILGUN_DOMAIN;

  if (!projectId || !userToken || !mailgunDomain) {
    console.error('Missing environment variables: PARAGON_PROJECT_ID, PARAGON_USER_TOKEN, or MAILGUN_DOMAIN');
    process.exit(1);
  }

  const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;
  const address = `harbor-test-list@${mailgunDomain}`;
  const name = 'Harbor Test List';

  const body = {
    action: 'MAILGUN_CREATE_MAILING_LIST',
    parameters: {
      address: address,
      name: name
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    fs.writeFileSync('/home/user/project/output.json', JSON.stringify(data, null, 2));
    console.log('Response saved to output.json');
  } catch (error) {
    console.error('Error creating mailing list:', error);
    process.exit(1);
  }
}

createMailingList();
