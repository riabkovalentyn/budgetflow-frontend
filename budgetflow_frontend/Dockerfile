# Multistage Dockerfile for Next.js app

# 1) Build
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Disable Next telemetry in containers
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 2) Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.ts ./

RUN npm ci --omit=dev

EXPOSE 3000
CMD ["npm", "start"]
