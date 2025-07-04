# Use Node.js 18 Alpine
FROM node:18-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Expose port 4000
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start"]
