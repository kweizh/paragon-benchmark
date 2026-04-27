const fs = require('fs');
const jwt = require('jsonwebtoken');

const PROJECT_ID = process.env.PARAGON_PROJECT_ID;
const INVALID_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.invalid";

async function fetchActions() {
    if (!PROJECT_ID) {
        throw new Error("PARAGON_PROJECT_ID is not set in environment");
    }

    let response = await fetch(`https://actionkit.useparagon.com/projects/${PROJECT_ID}/actions`, {
        headers: {
            "Authorization": `Bearer ${INVALID_TOKEN}`
        }
    });
    
    if (response.status === 401) {
        const payload = {
            sub: "test_user",
            iat: Math.floor(Date.now() / 1000)
        };
        // Handle literal \n in the environment variable
        const key = process.env.PARAGON_SIGNING_KEY.replace(/\\n/g, '\n');
        const newToken = jwt.sign(payload, key, { algorithm: "RS256" });
        
        response = await fetch(`https://actionkit.useparagon.com/projects/${PROJECT_ID}/actions`, {
            headers: {
                "Authorization": `Bearer ${newToken}`
            }
        });
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch actions: ${response.status}`);
    }

    const data = await response.json();
    fs.writeFileSync('actions.json', JSON.stringify(data));
}

fetchActions().catch(error => {
    console.error(error.message);
    process.exit(1);
});
