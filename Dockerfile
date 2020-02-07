# ---- Staging ----

FROM node:10-alpine as builder
WORKDIR /app

RUN apk update && apk add --no-cache bash git openssh python2
COPY package*.json ./
RUN npm install prod
COPY . .
RUN npm run build -s


# ---- Prod ----
FROM nginx

EXPOSE 5000
ENV APPSETTING_ENV=local

RUN echo 'server { listen 5000; listen 80; root /usr/share/nginx/html; index index.html; server_name _; location / { try_files $uri /index.html; } }' > /etc/nginx/conf.d/default.conf
RUN cat /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build/dist /usr/share/nginx/html
COPY --from=builder /app/build ./config

CMD  ls -a ./config/ \
    && cp ./config/app.${APPSETTING_ENV}.config.js /usr/share/nginx/html/app.config.js \
    && cat /usr/share/nginx/html/app.config.js && nginx -g 'daemon off;'


