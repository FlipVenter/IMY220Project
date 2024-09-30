FROM node:20.111-alpine AS base

WORKDIR /usr/src/app

FROM base AS deps

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build:backend && npm run build:frontend

FROM base AS final

ENV NODE_ENV production

USER node

COPY package.json .

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=deps /usr/src/app/frontend/public ./frontend/public

# Expose the port that the application listens on.
EXPOSE 1337

CMD ["node", "dist/server.js"]