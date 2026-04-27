import { useEffect, useState } from 'react';
import { paragon } from '@useparagon/connect';

function App() {
  const [userState, setUserState] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initParagon = async () => {
      try {
        const projectId = import.meta.env.VITE_PARAGON_PROJECT_ID || '';
        const userToken = import.meta.env.VITE_PARAGON_TOKEN || '';
        
        await paragon.authenticate(projectId, userToken);
        const user = paragon.getUser();
        
        setUserState({
          authenticated: user.authenticated,
          integrations: user.integrations
        });
      } catch (err) {
        console.error('Paragon auth error:', err);
        setError(err.message);
      }
    };

    initParagon();
  }, []);

  return (
    <div>
      <h1>Paragon User State</h1>
      {error && <p>Error: {error}</p>}
      <div id="paragon-user-state">
        {userState ? JSON.stringify(userState) : 'Loading...'}
      </div>
    </div>
  );
}

export default App;
