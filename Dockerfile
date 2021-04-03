FROM node:14-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY . /home/node

RUN npm ci \
  && npm run build

# ---

FROM node:14-alpine

ENV NODE_ENV production

USER node
WORKDIR /app

COPY /package.json ./
COPY package-lock.json ./

RUN npm i

CMD ["npm","run", "start", "dist/server.js"]


# specifiy DB