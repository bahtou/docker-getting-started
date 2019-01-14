# docker-getting-started

Assume that docker is installed
* [for LNX](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* [for OSX](https://docs.docker.com/docker-for-mac/)
* [for WIN](https://docs.docker.com/docker-for-windows/)

## Goal

Mirror current local development experience with docker

## Build
`docker image build -t node-api:getting-started .`

## Run
`docker container run --rm --name api-1 -v $(pwd)/src:/app/src -p 3000:3000 -it node-api-1 sh`

this will put you inside the contaier. Run the following command to get the server running:

`node --use-strict src/server.js`

Whenever there is a file change you have have to manually restart the server inside the container.

Use `nodemon` to auto-restart the server. So instead of the above command use the following:

`node_modules/.bin/nodemon --use-strict src/server.js`

## Notes

>I recommend that your **dockerfile** represent as close as possible to what will be use for production (more on this later)

### Tini

[using tini](https://github.com/krallin/tini#using-tini)

Inside the **dockerfile**:

```
RUN apk add --no-cache tini
# Tini is now available at /sbin/tini
ENTRYPOINT ["/sbin/tini", "--"]
```

# References
* [Docker Node.js Best Practices](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)

* [Alphine build essentials](https://spock.rocks/tech/2016/03/30/docker-alpine-cheat-sheet.html)

* [Tips for a smaller docker image](https://learnk8s.io/blog/smaller-docker-images)
