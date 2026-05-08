const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'https://localhost',
});

// Mock browser globals for the Paragon SDK
global.window = dom.window;
global.document = dom.window.document;
global.localStorage = dom.window.localStorage;
global.navigator = dom.window.navigator;
global.fetch = fetch;

const { paragon } = require('@useparagon/connect');
const fs = require('fs');

const PROJECT_ID = process.env.PARAGON_PROJECT_ID;
const USER_TOKEN = process.env.PARAGON_USER_TOKEN;

async function run() {
    const logFile = '/home/user/paragon-app/output.log';
    
    if (!PROJECT_ID || !USER_TOKEN) {
        const error = 'Error: PARAGON_PROJECT_ID and PARAGON_USER_TOKEN environment variables must be set.';
        fs.writeFileSync(logFile, error + '\n');
        console.error(error);
        process.exit(1);
    }

    try {
        console.log('Authenticating with Paragon...');
        await paragon.authenticate(PROJECT_ID, USER_TOKEN);
        
        console.log('Installing Slack send_message action...');
        
        // Use paragon.installAction(integrationType, actionId, params) as required
        // Note: If this method is not available in the current SDK version, 
        // it will throw a TypeError which we will catch and log.
        const result = await paragon.installAction('slack', 'send_message', { channel: '#general' });
        
        const output = JSON.stringify(result, null, 2);
        fs.writeFileSync(logFile, output + '\n');
        console.log('Success! Result logged to output.log');
    } catch (error) {
        const errorMsg = `Error: ${error.message}`;
        fs.writeFileSync(logFile, errorMsg + '\n');
        console.error(errorMsg);
    }
}

run();
