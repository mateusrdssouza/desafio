# Node.js image
FROM node:22-alpine

# App directory
WORKDIR /app/backend

# Copy package.json and package-lock.json
COPY backend/package*.json ./

# Copy .env file
COPY backend/.env.example .env

# Install dependencies
RUN npm install

# Copy files
COPY backend/ ./

# Run build
RUN npm run build

# Expose port
EXPOSE 3000

# Set port
ENV PORT=3000

# Run app
CMD ["npm", "run", "start:dev"]
