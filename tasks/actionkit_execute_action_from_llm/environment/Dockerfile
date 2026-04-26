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
LABEL Description="Node.js environment with an initial llm_response.json in /home/user/app."

RUN mkdir -p /home/user/app && \
    cd /home/user/app && \
    cat >llm_response.json <<'EOF'
{
  "action": "SLACK_SEND_MESSAGE",
  "parameters": {
    "channel": "#general",
    "message": "Hello from Paragon!"
  }
}
EOF

# Container contents:
#   - always required libs: curl ca-certificates git python3 python3-pip python3-pytest bash
#   - Node.js v24
#   - /home/user/app: base directory for the Node project
#   - /home/user/app/llm_response.json: initial JSON payload

CMD ["/bin/bash", "-c", "trap : TERM INT; sleep infinity & wait"]
