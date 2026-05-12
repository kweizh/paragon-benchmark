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
LABEL Description="Node.js environment for Paragon Proxy API file download task"

RUN mkdir -p /home/user/app && \
    cd /home/user/app && \
    npm init -y && \
    npm install node-fetch@2 && \
    touch download.js

# Container contents:
#   - Node.js v24 for the proxy API file download task
#   - /home/user/app - initialized npm project with node-fetch installed
#   - /home/user/app/download.js - empty script for the user to implement

CMD ["/bin/bash", "-c", "trap : TERM INT; sleep infinity & wait"]
