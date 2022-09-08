FROM hoosin/alpine-nginx-nodejs:latest
WORKDIR /app
COPY ./ ./
RUN npm ci
RUN npm run storybook:build
RUN npm prune --production
COPY /app/storybook-static /usr/share/nginx/html