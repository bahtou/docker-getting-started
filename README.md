# docker-getting-started

Assume that docker is installed
* [for LNX](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* [for OSX](https://docs.docker.com/docker-for-mac/)
* [for WIN](https://docs.docker.com/docker-for-windows/)

## Build
`docker image build -t node-api .`

# Without `nodemon`

## Run
`docker container run -it -p 3000:3000 --name api-1 -v $(pwd)/src:/app/src node-api-1 sh`

this will put you inside the contaier. Run the following command to get the server running:

`node --use-strict src/server.js`

Whenever there is a file change you have have to manually restart the server inside the container.

# With `nodemon`

## Run
`docker container run -d -p 3000:3000 --name api-1 -v $(pwd)/src:/app/src node-api-1`
