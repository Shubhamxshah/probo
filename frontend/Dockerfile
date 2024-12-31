# Use a stable Node.js version
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package files first for caching layer optimization
COPY ./frontend/package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY ./frontend .

# Build the application for production
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "start"]

