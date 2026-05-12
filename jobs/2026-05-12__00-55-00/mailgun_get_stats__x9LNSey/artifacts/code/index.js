const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function fetchMailgunStats() {
    const projectId = process.env.PARAGON_PROJECT_ID;
    const userToken = process.env.PARAGON_USER_TOKEN;
    const domain = process.env.MAILGUN_DOMAIN;

    const logFile = '/home/user/project/output.log';
    const statsFile = '/home/user/project/stats.json';

    const log = (message) => {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ${message}\n`;
        fs.appendFileSync(logFile, logMessage);
        console.log(logMessage.trim());
    };

    if (!projectId || !userToken || !domain) {
        log('Error: Missing required environment variables (PARAGON_PROJECT_ID, PARAGON_USER_TOKEN, MAILGUN_DOMAIN)');
        process.exit(1);
    }

    const proxyUrl = `https://proxy.useparagon.com/projects/${projectId}/sdk/proxy/mailgun/https://api.mailgun.net/v3/${domain}/stats/total`;

    log(`Fetching Mailgun stats from: ${proxyUrl}`);

    try {
        const response = await axios.get(proxyUrl, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });

        log('Successfully fetched Mailgun stats.');
        fs.writeFileSync(statsFile, JSON.stringify(response.data, null, 2));
        log(`Stats saved to ${statsFile}`);
    } catch (error) {
        log(`Error fetching stats: ${error.message}`);
        if (error.response) {
            log(`Response data: ${JSON.stringify(error.response.data)}`);
            log(`Status: ${error.response.status}`);
        }
        process.exit(1);
    }
}

fetchMailgunStats();
