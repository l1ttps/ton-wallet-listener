# Use Node.js as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application (including database.sqlite)
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 3133

# Start the application
CMD ["npm", "run", "start:prod"]
