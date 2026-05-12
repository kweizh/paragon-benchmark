FROM ubuntu:22.04

RUN apt-get update && apt-get install -y curl build-essential
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

RUN useradd -m -s /bin/bash user
USER user
WORKDIR /home/user

RUN mkdir -p /home/user/project
WORKDIR /home/user/project
