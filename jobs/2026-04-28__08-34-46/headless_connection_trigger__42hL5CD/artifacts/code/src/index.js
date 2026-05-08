import { paragon } from '@useparagon/connect';

const connectButton = document.getElementById('connect-slack');
const statusDiv = document.getElementById('status');

async function init() {
  try {
    const response = await fetch('/api/token');
    if (!response.ok) {
      throw new Error('Failed to fetch token');
    }
    const { token, projectId } = await response.json();

    await paragon.authenticate(projectId, token);
    console.log('Paragon authenticated');

    connectButton.addEventListener('click', async () => {
      try {
        await paragon.connect('slack');
        statusDiv.innerText = 'Connected';
      } catch (error) {
        console.error('Connection failed:', error);
        statusDiv.innerText = 'Failed';
      }
    });
  } catch (error) {
    console.error('Initialization failed:', error);
    statusDiv.innerText = 'Failed to initialize';
  }
}

init();
