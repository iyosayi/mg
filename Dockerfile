FROM node:12-alpine AS base

WORKDIR /app

FROM base AS builder

COPY package*.json .babelrc ./

RUN npm install 

COPY ./api ./api

RUN npm run build
RUN npm prune --production

FROM base AS release

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

USER node

EXPOSE 4000

CMD ["node", "./dist/server/server.js"]