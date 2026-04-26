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
LABEL Description="Node.js environment with Paragon SDK stub for disconnecting an integration."

RUN mkdir -p /home/user/app && \
    cd /home/user/app && \
    npm init -y && \
    npm install @useparagon/connect && \
    cat >disconnect.js <<'EOF'
import { paragon } from '@useparagon/connect';

export async function disconnectSlack() {
  // TODO: call paragon.uninstallIntegration to disconnect slack
}
EOF

# Container contents:
#   - Node.js v24 installed
#   - /home/user/app with package.json and @useparagon/connect installed
#   - disconnect.js with a stub function

CMD ["/bin/bash", "-c", "trap : TERM INT; sleep infinity & wait"]
