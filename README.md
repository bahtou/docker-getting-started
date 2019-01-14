# docker-getting-started

Assume that docker is installed
* [for LNX](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
* [for OSX](https://docs.docker.com/docker-for-mac/)
* [for WIN](https://docs.docker.com/docker-for-windows/)

## Build
`docker image build -t node-api .`

## Run
`docker container run -d -p 3000:3000 --name api-1 -v $(pwd)/src:/app/src node-api-1`
