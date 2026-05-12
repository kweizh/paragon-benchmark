const jwt = require('jsonwebtoken');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function runQuery() {
    const projectId = process.env.PARAGON_PROJECT_ID;
    const signingKey = process.env.PARAGON_SIGNING_KEY;

    if (!projectId || !signingKey) {
        console.error('PARAGON_PROJECT_ID and PARAGON_SIGNING_KEY must be set');
        process.exit(1);
    }

    // Generate JWT
    // Paragon expects RS256 for project signing keys.
    // If the key is a PEM string, it should work with RS256.
    // We replace literal \n with actual newlines in case it was passed that way.
    const formattedKey = signingKey.replace(/\\n/g, '\n');
    
    const token = jwt.sign(
        {
            sub: 'test-user',
            iat: Math.floor(Date.now() / 1000)
        },
        formattedKey,
        { algorithm: 'RS256' }
    );

    const url = `https://proxy.useparagon.com/projects/${projectId}/sdk/proxy/postgres`;
    const body = {
        query: "SELECT * FROM users WHERE email = 'test@example.com';"
    };

    try {
        const response = await axios.post(url, body, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'X-Paragon-Proxy-Url': '/query',
                'Content-Type': 'application/json'
            }
        });

        const outputPath = path.join(__dirname, 'output.json');
        fs.writeFileSync(outputPath, JSON.stringify(response.data, null, 2));
        console.log(`Response saved to ${outputPath}`);
    } catch (error) {
        console.error('Error executing query:', error.response ? error.response.data : error.message);
        const outputPath = path.join(__dirname, 'output.json');
        fs.writeFileSync(outputPath, JSON.stringify(error.response ? error.response.data : { error: error.message }, null, 2));
        process.exit(1);
    }
}

runQuery();
