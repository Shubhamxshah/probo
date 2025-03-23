FROM node:20-alpine3.16

WORKDIR /app

COPY ./package*.json ./ 
RUN npm install
RUN npm i -g nodemon ts-node typescript --save-dev
COPY ./prisma ./prisma
RUN npx prisma generate

COPY . .

CMD ["sh", "-c", "npx prisma migrate deploy && nodemon src/index.ts"]

