FROM node:20-alpine

WORKDIR /app

COPY ./package*.json ./ 

RUN npm install
RUN npm i -g nodemon ts-node typescript --save-dev

COPY . .

EXPOSE 3002

CMD ["nodemon", "src/index.ts"]

