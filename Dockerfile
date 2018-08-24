FROM node:8

MAINTAINER budi.budiardjo@here.com

ENV WORKING_DIR=/usr/src/app

WORKDIR /usr/src

ADD package.json package-lock.json  /usr/src/

RUN npm install

WORKDIR ${WORKING_DIR}
COPY . ${WORKING_DIR}/

RUN npm run build

EXPOSE 8080

CMD  npm run start
