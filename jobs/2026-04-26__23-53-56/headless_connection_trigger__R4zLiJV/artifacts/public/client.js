import { paragon } from '@useparagon/connect';

async function init() {
  const statusEl = document.getElementById('status');
  const connectBtn = document.getElementById('connect-slack');

  try {
    const response = await fetch('/api/token');
    const { token, projectId } = await response.json();

    if (!token || !projectId) {
      throw new Error('Failed to fetch token or projectId');
    }

    await paragon.authenticate(projectId, token);
    console.log('Authenticated with Paragon');

    connectBtn.addEventListener('click', async () => {
      try {
        await paragon.connect('slack');
        statusEl.innerText = 'Connected';
      } catch (error) {
        console.error('Connection failed', error);
        statusEl.innerText = 'Failed';
      }
    });
  } catch (error) {
    console.error('Initialization failed', error);
    statusEl.innerText = 'Failed';
  }
}

init();
