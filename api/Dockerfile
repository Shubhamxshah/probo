FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./ 

RUN npm install
RUN npm i -g nodemon

COPY . . 

EXPOSE 3000

CMD ["nodemon", "src/index.ts"]
