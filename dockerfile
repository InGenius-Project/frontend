FROM node:lts as builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM nginx:latest as release
WORKDIR /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf ./*
COPY --from=builder /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]