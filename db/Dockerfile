FROM node:20-alpine

WORKDIR /app

COPY package*.json ./ 
COPY prisma ./prisma

RUN npm install
RUN npm i -g nodemon
RUN npx prisma generate

COPY . .

CMD ["nodemon", "src/index.ts"]

