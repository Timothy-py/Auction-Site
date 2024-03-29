FROM alpine:latest

RUN apk add --no-cache nodejs npm

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install

EXPOSE 5000

ENTRYPOINT [ "npm" ]

CMD [ "start" ]