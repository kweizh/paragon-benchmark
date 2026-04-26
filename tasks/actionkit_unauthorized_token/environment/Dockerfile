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
LABEL Description="Node.js environment with a Paragon ActionKit script that fails due to an invalid token."

RUN mkdir -p /home/user/actionkit-project && \
    cd /home/user/actionkit-project && \
    cat >package.json <<'EOF'
{
  "name": "actionkit-project",
  "version": "1.0.0",
  "description": "",
  "main": "fetch_actions.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
EOF

RUN cd /home/user/actionkit-project && \
    cat >fetch_actions.js <<'EOF'
const fs = require('fs');

const PROJECT_ID = process.env.PARAGON_PROJECT_ID;
const INVALID_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.invalid";

async function fetchActions() {
    if (!PROJECT_ID) {
        throw new Error("PARAGON_PROJECT_ID is not set in environment");
    }

    const response = await fetch(`https://actionkit.useparagon.com/projects/${PROJECT_ID}/actions`, {
        headers: {
            "Authorization": `Bearer ${INVALID_TOKEN}`
        }
    });
    
    if (!response.ok) {
        throw new Error(`Failed to fetch actions: ${response.status}`);
    }

    const data = await response.json();
    fs.writeFileSync('actions.json', JSON.stringify(data));
}

fetchActions().catch(error => {
    console.error(error.message);
    process.exit(1);
});
EOF

# Container contents:
#   - Node.js v24 installed
#   - /home/user/actionkit-project with package.json and fetch_actions.js

CMD ["/bin/bash", "-c", "trap : TERM INT; sleep infinity & wait"]