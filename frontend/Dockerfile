# Use Node.js as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire frontend project
COPY . .

# Expose the frontend port
EXPOSE 3000

# Start the React development server (hot reload)
CMD ["npm", "run","dev"]
