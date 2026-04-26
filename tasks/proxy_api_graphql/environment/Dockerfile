FROM ubuntu:24.04

RUN apt-get update -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        curl ca-certificates git python3 python3-pip python3-pytest bash && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y --no-install-recommends nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /home/user && chmod 0755 /home/user

LABEL Author="any-task-builder"
LABEL Description="Node.js script environment for Paragon Proxy API GraphQL task."

RUN mkdir -p /home/user/app && \
    cd /home/user/app && \
    cat >script.js <<'EOF'
// TODO: Implement the GraphQL request via Paragon Proxy API
// PARAGON_PROJECT_ID and PARAGON_USER_TOKEN are available in process.env
EOF

# Container contents:
#   - always required libs: curl ca-certificates git python3 python3-pip python3-pytest bash
#   - Node.js v20 for the script execution
#   - /home/user/app: base directory for the project
#   - /home/user/app/script.js: initial script to be completed

CMD ["/bin/bash", "-c", "trap : TERM INT; sleep infinity & wait"]
