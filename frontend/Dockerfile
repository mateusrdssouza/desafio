# Node.js image
FROM node:22-alpine

# App directory
WORKDIR /app/frontend

# Copy package.json and package-lock.json
COPY frontend/package*.json ./

# Copy .env file
COPY frontend/.env.example .env

# Install dependencies
RUN npm install

# Copy files
COPY frontend/ ./

# Run build
RUN npm run build

# Expose port
EXPOSE 3001

# Set port
ENV PORT=3001

# Run app
CMD ["npm", "run", "dev"]
