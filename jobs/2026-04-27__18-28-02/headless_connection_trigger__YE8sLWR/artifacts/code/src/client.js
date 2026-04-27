import { paragon } from '@useparagon/connect';

async function init() {
  try {
    const response = await fetch('/api/token');
    const data = await response.json();
    
    if (data.projectId && data.token) {
      await paragon.authenticate(data.projectId, data.token);
    } else {
      console.error('Failed to get token or project ID');
    }

    const button = document.getElementById('connect-slack');
    const status = document.getElementById('status');

    button.addEventListener('click', async () => {
      try {
        await paragon.connect('slack');
        status.textContent = 'Connected';
      } catch (error) {
        status.textContent = 'Failed';
      }
    });
  } catch (err) {
    console.error('Initialization failed', err);
  }
}

init();
