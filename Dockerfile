# Stage 1: Build frontend
FROM node:20-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Run
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY server ./server
COPY --from=builder /app/dist ./dist

# Create data directory for novels.json
RUN mkdir -p /app/server/data

EXPOSE 3001

CMD ["node", "server/index.js"]
