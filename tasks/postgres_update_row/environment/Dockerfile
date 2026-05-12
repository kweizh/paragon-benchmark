FROM node:18-bullseye-slim

# Install necessary tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    python3 \
    python3-pip \
    jq \
    && rm -rf /var/lib/apt/lists/*

# Add a non-root user
RUN useradd -m -s /bin/bash user

# Create project directory
RUN mkdir -p /home/user/project && chown -R user:user /home/user/project

USER user
WORKDIR /home/user/project

# Initialize a basic Node.js project
RUN npm init -y && \
    npm install jsonwebtoken node-fetch@2

CMD ["/bin/bash"]
