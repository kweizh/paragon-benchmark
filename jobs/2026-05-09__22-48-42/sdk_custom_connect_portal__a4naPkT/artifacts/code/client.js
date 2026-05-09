import paragon from '@useparagon/connect';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/token');
    const data = await response.json();
    
    if (data.error) {
      console.error('Error fetching token:', data.error);
      return;
    }

    const { token, projectId } = data;

    await paragon.authenticate(projectId, token);

    const button = document.getElementById('connect-slack');
    button.addEventListener('click', () => {
      paragon.connect('slack');
    });
    
    button.disabled = false;
  } catch (error) {
    console.error('Error initializing Paragon:', error);
  }
});
