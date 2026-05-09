import React, { useState } from 'react';
import { paragon } from '@useparagon/connect';

function App() {
  const [hasError, setHasError] = useState(false);

  const handleConnect = async () => {
    try {
      setHasError(false);
      // Basic connection logic
      await paragon.connect('salesforce');
    } catch (err) {
      setHasError(true);
    }
  };

  return (
    <div>
      <h1>Paragon Connection Test</h1>
      <button id="connect-salesforce" onClick={handleConnect}>Connect Salesforce</button>
      {hasError && <div id="connection-error">Connection failed</div>}
    </div>
  );
}

export default App;
