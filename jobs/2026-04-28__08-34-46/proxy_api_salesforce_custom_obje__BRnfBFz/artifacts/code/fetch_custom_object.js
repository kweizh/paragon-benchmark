const projectId = process.env.PARAGON_PROJECT_ID;
const userToken = process.env.PARAGON_USER_TOKEN;

if (!projectId || !userToken) {
  console.error('Error: PARAGON_PROJECT_ID and PARAGON_USER_TOKEN environment variables are required.');
  process.exit(1);
}

// Salesforce REST API path to fetch custom object information
const salesforcePath = '/services/data/v60.0/sobjects/Paragon_Test_Object__c';
const url = `https://proxy.useparagon.com/projects/${projectId}/proxy/salesforce${salesforcePath}`;

async function fetchCustomObject() {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error fetching custom object: ${response.status} ${response.statusText}`);
      console.error(errorText);
      process.exit(1);
    }

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Network or unexpected error:', error.message);
    process.exit(1);
  }
}

fetchCustomObject();
