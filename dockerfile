# Use the official Node image as the base image
FROM node:22-alpine3.18 as build 

# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY . .
# Install dependencies
# RUN yarn install --production && yarn build:prod

# Run nginx
FROM nginx:1.25.5-alpine as release
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
# Config & build file
COPY --from=build /app/certs/* /etc/nginx/
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build .
EXPOSE 443 
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
