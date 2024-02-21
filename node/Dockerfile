FROM node:20

RUN apt-get update && \
  apt-get install -y wget netcat-traditional && \
  wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
  chmod +x /usr/bin/wait-for

WORKDIR /usr/src/app

EXPOSE 3000
