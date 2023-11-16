# Use an official Node.js runtime as a base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your app will run on
EXPOSE 3000

# Define the command to run your application
CMD ["node", "server.js"]
