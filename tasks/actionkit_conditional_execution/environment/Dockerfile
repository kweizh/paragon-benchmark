FROM ubuntu:24.04

RUN apt-get update -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        curl wget ca-certificates git python3 python3-pip python3-pytest bash && \
    curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && \
    apt-get install -y --no-install-recommends nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /home/user && chmod 0755 /home/user

LABEL Author="any-task-builder"
LABEL Description="Node.js environment for Paragon ActionKit conditional execution task."

RUN mkdir -p /home/user/paragon-task && \
    mkdir -p /logs/artifacts && \
    echo "test-trial-id" > /logs/artifacts/trial_id

# Container contents:
#   - always required libs: curl wget ca-certificates git python3 python3-pip python3-pytest bash
#   - Node.js v24 for running the Paragon script
#   - /home/user/paragon-task: project directory
#   - /logs/artifacts/trial_id: trial ID file

CMD ["/bin/bash", "-c", "trap : TERM INT; sleep infinity & wait"]
