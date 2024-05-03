# Use the official Node image as the base image
FROM node:lts as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY . .

# Install dependencies
RUN yarn install --production

# Copy the rest of the application code
COPY . .

# Copy the environment-specific file
COPY .env .env

# Build the application
RUN yarn build:prod

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["yarn", "start:prod"]

# Run nginx
# FROM nginx:latest as release
# WORKDIR /usr/share/nginx/html
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf
# RUN rm -rf ./*
# COPY --from=builder /app/build .
# EXPOSE 80
# ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
