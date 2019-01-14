# ---- Base ----
FROM node:11.6.0-alpine as base


# ---- Builder ----
FROM base as builder

WORKDIR /srv

RUN set -ex; \
    apk update; \
    apk add --no-cache build-base

COPY package*.json ./

RUN npm install --no-progress --loglevel error


# --- Release ----
FROM base as release

ENV NODE_ENV local

RUN set -ex; \
    apk update; \
    apk add --no-cache tini

USER node

WORKDIR /home/node

COPY --from=builder /srv/node_modules ./node_modules/
COPY ./src ./src

ENTRYPOINT ["/sbin/tini", "--"]

EXPOSE 3000

CMD ["node", "--use-strict", "src/server.js"]
