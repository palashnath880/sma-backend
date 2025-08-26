# Stage 1: Build
FROM node:22.14-alpine AS builder

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy only package files first for better caching
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source files
COPY . .

# Generate Prisma client
RUN pnpm prisma generate

# Build NestJS app
RUN pnpm build

# Stage 2: Production
FROM node:22.14-alpine AS runner

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml* ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Expose NestJS port
EXPOSE 3000

# Run migrations before starting the app
CMD pnpm prisma migrate deploy && pnpm run start:prod
