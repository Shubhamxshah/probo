FROM node:20-alpine

WORKDIR /app

COPY ./db/package*.json ./ 
COPY ./db/prisma ./prisma

RUN npm install
RUN npm i -g nodemon
RUN npx prisma generate

COPY ./db .

CMD ["nodemon", "src/index.ts"]

