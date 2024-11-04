FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./ 

RUN npm install -g pnpm && \
  pnpm install
RUN pnpm i -g nodemon

COPY . . 

EXPOSE 3000

CMD ["nodemon", "src/index.ts"]
