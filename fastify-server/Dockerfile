FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine

COPY package*.json .

RUN npm ci --omit=dev && rm package-lock.json node_modules/.package-lock.json

COPY --from=build /app/build ./

EXPOSE 3002

ENV ADDRESS=0.0.0.0 PORT=3002


CMD ["node", "index.js"]
