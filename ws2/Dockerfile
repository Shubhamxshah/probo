FROM node:20-alpine

WORKDIR /app

COPY ./ws2/package*.json ./ 

RUN npm install
RUN npm i -g nodemon

COPY ./ws2 .

EXPOSE 3002

CMD ["nodemon", "src/index.ts"]

