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
LABEL Description="Node.js environment for handling Paragon Proxy API errors"

RUN mkdir -p /home/user/app && \
    cd /home/user/app && \
    cat >fetch_data.js <<'EOF'
const fs = require('fs');

async function fetchData() {
    const response = await fetch('https://proxy.useparagon.com/projects/TEST_PROJECT/sdk/proxy/slack/users.identity', {
        headers: {
            'Authorization': 'Bearer invalid_token'
        }
    });

    const data = await response.json();
    console.log(data);
}

fetchData().catch(console.error);
EOF

# Container contents:
#   - Node.js v24 installed
#   - /home/user/app  — project directory
#   - fetch_data.js with initial fetch call

CMD ["/bin/bash", "-c", "trap : TERM INT; sleep infinity & wait"]
