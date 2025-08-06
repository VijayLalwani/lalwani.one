# Dockerfile

# === Stage 1: Install Dependencies ===
#
# Use the official Node.js 22 LTS on a minimal Alpine Linux base.
# Alpine is chosen for its small size, which reduces the final image footprint.
FROM node:22-alpine AS deps

# Set the working directory within the container.
WORKDIR /app

# Copy package manifest and lock file. This is done in a separate layer
# to leverage Docker's caching. This layer is only rebuilt when package files change.
COPY package.json package-lock.json ./

# Install dependencies using 'npm ci' for faster, more reliable, and reproducible builds.
RUN npm ci

# === Stage 2: Build the Application ===
#
# Start from the 'deps' stage to leverage the cached node_modules.
FROM deps AS builder

# Set the working directory.
WORKDIR /app

# Copy the rest of the application source code.
COPY . .

# Disable Next.js telemetry to prevent unnecessary network requests during build.
ENV NEXT_TELEMETRY_DISABLED 1

# Run the production build command. With 'output: standalone' in next.config.js,
# this creates the '.next/standalone' directory with a minimal server and dependencies.
RUN npm run build

# === Stage 3: Production Image ===
#
# Start from a fresh, minimal base image for the final runtime environment.
# This ensures no build tools or intermediate files are included in the final image.
FROM node:22-alpine AS runner

# Set the working directory.
WORKDIR /app

# Set environment variables for the production runtime.
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a dedicated, unprivileged user and group as a security best practice.
# Running as a non-root user limits the container's privileges on the host system.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the 'public' folder containing static assets like images or fonts.
# FINAL FIX: Add '--chown' to give the 'nextjs' user ownership.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy the standalone application output from the 'builder' stage.
# The '--chown' flag sets the correct ownership for the copied files.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy the generated static assets from the build.
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch the container's user to the unprivileged user created above.
USER nextjs

# Expose the port that the Next.js server will listen on.
EXPOSE 3000

# Set the PORT environment variable, which Next.js will use to start the server.
ENV PORT 3000

# The command to start the application. This executes the optimized server.js
# file located in the root of the 'standalone' output.
CMD ["node", "server.js"]
