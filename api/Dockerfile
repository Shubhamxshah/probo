FROM node:20-alpine

WORKDIR /app

COPY ./api/package*.json ./ 

RUN npm install 
RUN npm i -g nodemon ts-node typescript --save-dev

COPY ./api . 

EXPOSE 3000

CMD ["nodemon", "src/index.ts"]
