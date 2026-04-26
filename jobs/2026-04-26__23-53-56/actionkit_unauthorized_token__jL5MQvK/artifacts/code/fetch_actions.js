const fs = require('fs');
const jwt = require('jsonwebtoken');

const PROJECT_ID = process.env.PARAGON_PROJECT_ID;
const PARAGON_SIGNING_KEY = process.env.PARAGON_SIGNING_KEY;
const INVALID_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.invalid";

function generateToken() {
    if (!PARAGON_SIGNING_KEY) {
        throw new Error("PARAGON_SIGNING_KEY is not set in environment");
    }
    return jwt.sign(
        { 
            sub: "test_user", 
            iat: Math.floor(Date.now() / 1000) 
        }, 
        PARAGON_SIGNING_KEY, 
        { algorithm: "RS256" }
    );
}

async function fetchActions() {
    if (!PROJECT_ID) {
        throw new Error("PARAGON_PROJECT_ID is not set in environment");
    }

    let token = INVALID_TOKEN;
    let response = await fetch(`https://actionkit.useparagon.com/projects/${PROJECT_ID}/actions`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    
    if (response.status === 401) {
        console.log("Received 401 Unauthorized, generating new token...");
        token = generateToken();
        response = await fetch(`https://actionkit.useparagon.com/projects/${PROJECT_ID}/actions`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch actions: ${response.status}`);
    }

    const data = await response.json();
    fs.writeFileSync('actions.json', JSON.stringify(data, null, 2));
    console.log("Successfully fetched actions and saved to actions.json");
}

fetchActions().catch(error => {
    console.error(error.message);
    process.exit(1);
});
