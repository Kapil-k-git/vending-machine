# backend/Dockerfile

FROM node:24.2

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build TypeScript if applicable
RUN npm run build

# Expose port (adjust if necessary)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "dev"]
