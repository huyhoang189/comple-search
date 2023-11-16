# Use node image as base image
FROM node:16-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .
# Run build
RUN yarn build

# Use nginx as the final base image
FROM nginx:1.19.0

#Copy config file in to container
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf


# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Remove any existing files
RUN rm -f ./*

# Copy the built application from the builder stage
COPY --from=builder /app/dist .

# Set the entrypoint command for the container
ENTRYPOINT [ "nginx", "-g", "daemon off;"]
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf