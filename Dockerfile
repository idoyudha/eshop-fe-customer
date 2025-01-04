# Step 1: Dependencies stage
FROM node:20.13.1-slim AS deps
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Step 2: Build stage
FROM node:20.13.1-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV=production

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Copy env file
COPY .env.local .env.local

# Build the application
RUN npm run build

# Step 3: Production stage
FROM node:20.13.1-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./package.json

# Special directory setup for Next.js standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set proper permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]