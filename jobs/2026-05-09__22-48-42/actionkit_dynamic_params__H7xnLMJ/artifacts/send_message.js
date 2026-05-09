const fs = require('fs');

async function main() {
    try {
        const trailId = fs.readFileSync('/logs/artifacts/trial_id', 'utf8').trim();
        const projectId = process.env.PARAGON_PROJECT_ID;
        const userToken = process.env.PARAGON_USER_TOKEN;

        if (!projectId || !userToken) {
            console.error("Missing PARAGON_PROJECT_ID or PARAGON_USER_TOKEN environment variables.");
            process.exit(1);
        }

        const url = `https://actionkit.useparagon.com/projects/${projectId}/actions`;
        
        const body = {
            action: "SLACK_SEND_MESSAGE",
            parameters: {
                channel: `#test-channel-${trailId}`,
                message: "Hello from ActionKit!"
            }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify(body)
        });

        console.log(`Status: ${response.status}`);
    } catch (err) {
        console.error("Error:", err);
    }
}

main();
