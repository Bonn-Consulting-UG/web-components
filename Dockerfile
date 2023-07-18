FROM yobasystems/alpine-nginx:latest
WORKDIR /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY /storybook-static /etc/nginx/html
COPY /storybook-static/components /etc/nginx/html/components
COPY /storybook-static/compositions /etc/nginx/html/compositions
COPY /.storybook/global.css /etc/nginx/html/components

