FROM node:11.6.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --no-progress --loglevel error

ENV NODE_ENV local

EXPOSE 3000

CMD ["node", "node_modules/.bin/nodemon", "--use-strict", "src/server.js"]
