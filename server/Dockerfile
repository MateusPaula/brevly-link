# Use Node.js LTS version
FROM node:20-alpine

# Install pnpm and curl for health check
RUN npm install -g pnpm && apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Expose port
EXPOSE 3333

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3333/docs || exit 1

# Start the application using tsx (since we don't build to JS)
CMD ["pnpm", "dev"]