import React from 'react';
import { paragon } from '@useparagon/connect';

function App() {
  React.useEffect(() => {
    paragon.subscribe("onIntegrationInstall", (event) => {
      console.log("Integration installed: " + event.integrationId);
    });
  }, []);

  return (
    <div>
      <h1>Paragon Integration</h1>
    </div>
  );
}

export default App;
