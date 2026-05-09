const projectId = process.env.PARAGON_PROJECT_ID;
const userToken = process.env.PARAGON_USER_TOKEN;

if (!projectId || !userToken) {
  console.error("Missing PARAGON_PROJECT_ID or PARAGON_USER_TOKEN environment variables.");
  process.exit(1);
}

// Using Paragon Proxy API to make a direct request to the Salesforce REST API
const url = `https://proxy.useparagon.com/projects/${projectId}/sdk/proxy/salesforce/services/data/v58.0/sobjects/Paragon_Test_Object__c`;

async function fetchCustomObject() {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error fetching custom object:", error);
  }
}

fetchCustomObject();
