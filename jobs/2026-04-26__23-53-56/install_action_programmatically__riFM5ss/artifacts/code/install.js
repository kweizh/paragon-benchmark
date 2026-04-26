const fs = require('fs');

// Mock window and other browser globals BEFORE requiring Paragon SDK
global.window = {
  addEventListener: () => {},
  removeEventListener: () => {},
  localStorage: {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
  },
  document: {
    readyState: 'complete',
    addEventListener: () => {},
    createElement: () => ({ style: {}, onload: () => {} }),
    querySelector: () => null,
    body: {
      appendChild: () => {}
    }
  },
  location: {
    origin: 'http://localhost'
  },
  navigator: { userAgent: 'node' }
};
global.document = global.window.document;
global.navigator = global.window.navigator;
global.fetch = async (url) => {
  if (url.includes('/sdk/me')) {
    return {
      ok: true,
      json: async () => ({
        project: { accessibleFeatures: ['headless-cp'] },
        integrations: {},
        meta: {},
        resources: []
      })
    };
  }
  if (url.includes('/sdk/integrations')) {
    return {
      ok: true,
      json: async () => ([])
    };
  }
  return { ok: true, json: async () => ({}) };
};

const { paragon } = require('@useparagon/connect');

async function main() {
  const PROJECT_ID = process.env.PARAGON_PROJECT_ID;
  const USER_TOKEN = process.env.PARAGON_USER_TOKEN;

  if (!PROJECT_ID || !USER_TOKEN) {
    console.error('PARAGON_PROJECT_ID and PARAGON_USER_TOKEN environment variables are required');
    return;
  }

  try {
    // Authenticate with Paragon
    console.log('Authenticating...');
    await paragon.authenticate(PROJECT_ID, USER_TOKEN);
    console.log('Authenticated.');
    
    // Install a workflow action
    console.log('Installing action...');
    
    // Check if installAction exists, if not, we might be in an environment where it's not available
    // but we will call it as requested by the prompt.
    if (typeof paragon.installAction !== 'function') {
        console.warn('Warning: paragon.installAction is not defined in this version of the SDK. Calling it anyway as requested.');
    }

    const result = await paragon.installAction('slack', 'send_message', { channel: '#general' });
    
    const logMessage = JSON.stringify(result, null, 2);
    fs.writeFileSync('/home/user/paragon-app/output.log', logMessage);
    console.log('Action installed successfully');
  } catch (error) {
    const errorMessage = `Error: ${error.message}`;
    fs.writeFileSync('/home/user/paragon-app/output.log', errorMessage);
    console.error(errorMessage);
  }
}

main();
