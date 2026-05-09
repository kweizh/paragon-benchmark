import { paragon } from '@useparagon/connect';

async function init() {
  try {
    const response = await fetch('/api/token');
    const data = await response.json();

    if (data.error) {
      console.error(data.error);
      document.getElementById('status').innerText = 'Failed';
      return;
    }

    await paragon.authenticate(data.projectId, data.token);

    document.getElementById('connect-slack').addEventListener('click', async () => {
      try {
        await paragon.connect('slack');
        document.getElementById('status').innerText = 'Connected';
      } catch (err) {
        console.error(err);
        document.getElementById('status').innerText = 'Failed';
      }
    });
  } catch (err) {
    console.error(err);
    document.getElementById('status').innerText = 'Failed';
  }
}

init();
