FROM yobasystems/alpine-nginx:latest
WORKDIR /app
COPY /storybook-static /etc/nginx/html
