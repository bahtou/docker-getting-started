# ---- Base ----
FROM node:11.6.0-alpine as base

ENV APP_NAME=getting-started-node-api


# ---- Build ----
FROM base as build

WORKDIR /opt/$APP_NAME/local

RUN set -ex; \
    apk update; \
    apk add --no-cache build-base

COPY package*.json ./

RUN npm install --no-progress --loglevel error


# --- Release ----
FROM base as release

ENV NODE_ENV=production

RUN set -ex; \
    apk update; \
    apk add --no-cache tini

USER node

WORKDIR /opt/$APP_NAME

COPY --from=build /opt/$APP_NAME/local/node_modules ./node_modules
COPY ./src ./src

ENTRYPOINT ["/sbin/tini", "--"]

EXPOSE 3000

CMD ["node", "--use-strict", "src/index.js"]
