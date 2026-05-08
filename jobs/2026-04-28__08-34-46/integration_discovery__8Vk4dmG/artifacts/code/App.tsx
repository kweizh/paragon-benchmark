import { useEffect, useState } from 'react';
import { paragon } from '@useparagon/connect';
import './App.css';

interface Integration {
  type: string;
  name: string;
  connected: boolean;
}

function App() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initParagon = async () => {
      try {
        const projectId = import.meta.env.VITE_PARAGON_PROJECT_ID;
        const jwt = import.meta.env.VITE_PARAGON_JWT;

        if (!projectId || !jwt) {
          throw new Error('Missing Paragon configuration');
        }

        await paragon.authenticate(projectId, jwt);
        
        const user = paragon.getUser();
        console.log('Paragon User:', user);
        
        // paragon.getUser() returns an object that includes authenticated integrations
        // We can map over the integrations to display them
        const authenticatedIntegrations = Object.entries(user.authenticatedIntegrations || {}).map(([type, details]: [string, any]) => ({
          type,
          name: details.name || type,
          connected: true
        }));

        setIntegrations(authenticatedIntegrations);
      } catch (err: any) {
        console.error('Paragon Initialization Error:', err);
        setError(err.message || 'Failed to initialize Paragon');
      } finally {
        setLoading(loading => false);
      }
    };

    initParagon();
  }, []);

  return (
    <div className="container">
      <h1>Connected Integrations</h1>
      {loading && <p>Loading integrations...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <div className="integration-list">
          {integrations.length === 0 ? (
            <p>No integrations connected yet.</p>
          ) : (
            <ul>
              {integrations.map((integration) => (
                <li key={integration.type} className="integration-item">
                  <strong>{integration.name}</strong>
                  <span className="status-badge connected">Connected</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
