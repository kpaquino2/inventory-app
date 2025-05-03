# Development Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy dependency files first (better layer caching)
COPY package*.json ./
COPY prisma ./prisma

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose port (matches NestJS default)
EXPOSE 3000

# Start in dev mode
CMD ["npm", "run", "start:migrate:dev"]