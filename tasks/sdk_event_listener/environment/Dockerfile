FROM ubuntu:24.04

RUN apt-get update -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        curl ca-certificates git python3 python3-pip python3-pytest bash && \
    curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && \
    apt-get install -y --no-install-recommends nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /home/user && chmod 0755 /home/user

LABEL Author="any-task-builder"
LABEL Description="React project with @useparagon/connect installed at /home/user/app."

RUN mkdir -p /home/user/app/src && \
    cd /home/user/app && \
    npm init -y && \
    npm install react react-dom @useparagon/connect && \
    cat >src/App.js <<'INNER_EOF'
import React from 'react';
import { paragon } from '@useparagon/connect';

function App() {
  React.useEffect(() => {
    // Add event listener here
  }, []);

  return (
    <div>
      <h1>Paragon Integration</h1>
    </div>
  );
}

export default App;
INNER_EOF

# Container contents:
#   - Node.js v24 installed.
#   - /home/user/app: basic React project with @useparagon/connect
#   - /home/user/app/src/App.js: React component ready for modification

CMD ["/bin/bash", "-c", "trap : TERM INT; sleep infinity & wait"]
