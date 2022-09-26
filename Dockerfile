FROM yobasystems/alpine-nginx:latest
WORKDIR /app
COPY nginx.conf /etc/nginx/nginx.conf
COPY /storybook-static /etc/nginx/html
COPY /dist/ /etc/nginx/html/components
COPY /.storybook/global.css /etc/nginx/html/components

