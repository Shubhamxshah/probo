FROM node:20-slim AS base

FROM base AS dependencies
WORKDIR /app
COPY ./frontend/package*.json ./
RUN npm install

FROM base AS build 
WORKDIR /app 
COPY --from=dependencies /app/node_modules ./node_modules 
COPY ./frontend .
RUN npm run build 

FROM base AS runner 
WORKDIR /app 

ENV NODE_ENV = production \
    NEXT_TELEMETRY_DISABLED = 1 \ 
    HOSTNAME="0.0.0.0"

COPY --from=build /app/public ./public 
RUN mkdir .next 

COPY --from=build /app/.next/standalone ./ 
COPY --from=build /app/.next/static ./.next/static 

CMD ["node", "server.js"]
