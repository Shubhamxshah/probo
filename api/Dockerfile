# Stage 1: Install dependencies
FROM node:20-alpine AS dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# Stage 2: Build the application
FROM node:20-alpine
WORKDIR /usr/src/app
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm i -g nodemon
EXPOSE 3000
CMD ["nodemon", "src/index.ts"]
