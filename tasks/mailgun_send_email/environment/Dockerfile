FROM node:18-bullseye

RUN useradd -m -s /bin/bash user
USER user
WORKDIR /home/user

RUN mkdir -p /home/user/mailgun_task
WORKDIR /home/user/mailgun_task

CMD ["/bin/bash"]
