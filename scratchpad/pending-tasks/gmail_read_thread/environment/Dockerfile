FROM node:20-bullseye

# Install Python and dependencies for Playwright
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    libnss3 \
    libnspr4 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

RUN pip3 install playwright pytest requests
RUN playwright install chromium
RUN playwright install-deps chromium

# Create user and project directory
RUN useradd -m -s /bin/bash user
USER user
WORKDIR /home/user

RUN mkdir -p /home/user/project
WORKDIR /home/user/project

# Set environment variables
ENV NODE_ENV=development
