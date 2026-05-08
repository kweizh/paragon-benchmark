FROM ubuntu:24.04

RUN apt-get update -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        curl ca-certificates git python3 python3-pip python3-pytest bash \
        ffmpeg ripgrep libxcb-shm0 libx11-xcb1 libx11-6 libxcb1 libxext6 libxrandr2 libxcomposite1 libxcursor1 libxdamage1 libxfixes3 libxi6 libgtk-3-0t64 libpangocairo-1.0-0 libpango-1.0-0 libatk1.0-0t64 libcairo-gobject2 libcairo2 libgdk-pixbuf-2.0-0 libxrender1 libasound2t64 libfreetype6 libfontconfig1 libdbus-1-3 libnss3 libnspr4 libatk-bridge2.0-0t64 libdrm2 libxkbcommon0 libatspi2.0-0t64 libcups2t64 libxshmfence1 libgbm1 && \
    curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && \
    apt-get install -y --no-install-recommends nodejs && \
    npm i -g @getpochi/cli agent-browser && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN agent-browser install || apt-get update -y && apt-get install -y --no-install-recommends chromium-browser || true

RUN mkdir -p /home/user && chmod 0755 /home/user

LABEL Author="any-task-builder"
LABEL Description="React application environment with Paragon SDK for testing connection error handling."

RUN mkdir -p /home/user/app && \
    cd /home/user/app && \
    npm init -y && \
    npm install react react-dom react-scripts @useparagon/connect && \
    mkdir -p public src && \
    cat > public/index.html <<'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOF

RUN cd /home/user/app && \
    cat > src/index.js <<'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

RUN cd /home/user/app && \
    cat > src/App.js <<'EOF'
import React from 'react';
import { paragon } from '@useparagon/connect';

function App() {
  const handleConnect = async () => {
    // Basic connection logic
    await paragon.connect('salesforce');
  };

  return (
    <div>
      <h1>Paragon Connection Test</h1>
      <button id="connect-salesforce" onClick={handleConnect}>Connect Salesforce</button>
    </div>
  );
}

export default App;
EOF

# Update package.json scripts
RUN cd /home/user/app && \
    sed -i 's/"test": "echo \\"Error: no test specified\\" && exit 1"/"start": "react-scripts start"/' package.json && \
    echo "PORT=3000\nBROWSER=none" > .env

# Container contents:
#   - Node.js v24 installed
#   - Browser verification dependencies (ffmpeg, ripgrep, etc.)
#   - React app setup in /home/user/app with @useparagon/connect installed

CMD ["/bin/bash", "-c", "trap : TERM INT; sleep infinity & wait"]