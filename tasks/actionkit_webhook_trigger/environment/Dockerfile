FROM ubuntu:24.04

RUN apt-get update -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        curl ca-certificates git python3 python3-pip python3-pytest bash && \
    curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && \
    apt-get install -y --no-install-recommends nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /home/user/project && chmod 0755 /home/user/project

WORKDIR /home/user/project
RUN npm init -y && \
    npm install jsonwebtoken

LABEL Author="any-task-builder"
LABEL Description="Node.js environment for Paragon ActionKit webhook trigger task."

# Container contents:
#   - Node.js v24 installed.
#   - /home/user/project directory created.
#   - package.json initialized with jsonwebtoken installed.

CMD ["/bin/bash", "-c", "trap : TERM INT; sleep infinity & wait"]
