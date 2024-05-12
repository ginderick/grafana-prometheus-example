FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18

COPY package*.json .

RUN npm ci --omit=dev && rm package-lock.json node_modules/.package-lock.json

COPY --from=build /app/build ./

CMD ["node", "index.js"]
# CMD ["node", "./build/index.js"]
