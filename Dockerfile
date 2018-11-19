FROM node:8.9.1-alpine

WORKDIR /var/www/html
COPY . /var/www/html

RUN apk add --update --no-cache \
    python \
    make \
    g++ \
    musl \
    git \
    && npm install

CMD ["npm", "start"]
