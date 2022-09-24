FROM yobasystems/alpine-nginx:latest
WORKDIR /app
COPY /storybook-static /etc/nginx/html
COPY /dist/components /etc/nginx/html/components
COPY /.storybook/global.css /etc/nginx/html/components

