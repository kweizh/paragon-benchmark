FROM node:20-bullseye

RUN useradd -m -s /bin/bash user

USER user
WORKDIR /home/user

RUN mkdir -p /home/user/app

ENV NEXT_PUBLIC_PARAGON_PROJECT_ID="test_project_id"
ENV PARAGON_SIGNING_KEY="test_signing_key"

CMD ["/bin/bash"]
