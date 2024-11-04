FROM node:20-alpine

WORKDIR /app

COPY ./api/package*.json ./ 

RUN npm install -g npm 
RUN npm i -g nodemon

COPY ./api . 

EXPOSE 3000

CMD ["nodemon", "src/index.ts"]
