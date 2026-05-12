FROM ubuntu:24.04

RUN apt-get update -y && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        curl ca-certificates git python3 python3-pip python3-pytest bash && \
    curl -fsSL https://deb.nodesource.com/setup_24.x | bash - && \
    apt-get install -y --no-install-recommends nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /home/user && chmod 0755 /home/user
RUN mkdir -p /logs/artifacts && chmod 0755 /logs/artifacts

LABEL Author="any-task-builder"
LABEL Description="Node.js environment with a report.txt file for ActionKit hex file upload."

RUN mkdir -p /home/user/project && \
    echo "This is a test report file for ActionKit hex upload." > /home/user/project/report.txt && \
    echo "12345" > /logs/artifacts/trial_id && \
    chmod 0644 /logs/artifacts/trial_id

# Container contents:
#   - Node.js v24 installed.
#   - /home/user/project  — Node.js project directory
#   - /home/user/project/report.txt - the file to upload
#   - /logs/artifacts/trial_id - the trial ID file

CMD ["/bin/bash", "-c", "trap : TERM INT; sleep infinity & wait"]
