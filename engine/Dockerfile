FROM node:20-alpine

WORKDIR /app

COPY ./engine/package*.json ./

RUN npm install
RUN npm i -g nodemon node-ts typescript --save-dev

COPY ./engine .

CMD ["nodemon", "src/index.ts"]



