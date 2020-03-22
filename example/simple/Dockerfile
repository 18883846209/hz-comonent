FROM mhart/alpine-node:latest
WORKDIR /web
# args
ARG APP_VERSION
ENV APP_VERSION=$APP_VERSION


ADD . ./
RUN rm -rf node_modules build
RUN npm install --registry=https://registry.npm.taobao.org
ENV NODE_ENV=production
RUN npm run build
EXPOSE 3000
CMD APP_VERSION=$APP_VERSION NODE_ENV=$NODE_ENV npm run start
