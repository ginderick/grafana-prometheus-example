FROM node:18-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci 
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
COPY package*.json .
RUN npm ci --omit=dev && rm package-lock.json node_modules/.package-lock.json

WORKDIR /usr/app
COPY --from=builder /app/build ./build
RUN npm install --omit=dev
USER node
ENV NODE_ENV="production"

CMD ["npm", "start"]
