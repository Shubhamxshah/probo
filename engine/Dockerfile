FROM node:20-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install
RUN npm i -g nodemon ts-node typescript --save-dev

COPY . .

CMD ["npm", "start"]



