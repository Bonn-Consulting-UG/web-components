FROM hoosin/alpine-nginx-nodejs:latest
WORKDIR /app
COPY ./ ./
RUN npm ci --only=production
RUN npm run storybook:build
COPY /app/storybook-static /usr/share/nginx/html