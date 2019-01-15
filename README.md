
# GOAL

Have a node container connect & push data into a redis container over the same network

## Build

Create `redis_net` network

`docker network create --driver bridge redis_net`

Build redis image

`docker image build -t redis -f ./Dockerfile_redis .`

Build node image

`docker image build -t node:to-redis -f ./Dockerfile_node .`

## Run

Run redis container

`docker container run --rm --name redis --net redis_net -v redis_data:/data -p 6379:6379 -d redis`

Run node container

`docker container run --rm --name node-redis --net redis_net -v $(pwd)/src:/home/node/src -p 3000:3000 -it node:to-redis sh`

This will put you inside the container. Run the command `./node_modules/.bin/nodemon src/index.js` to connect to redis (on the same network `redis_net`).

The output should be:

```
Reply: OK
Reply: OK
Reply: amigos!
Reply: world!
```

Go into the redis container and veryify that the data is indeed there.

`docker container exec -it redis sh`

`redis-cli`

`> get hola`

`> get hello`

Stop & remove the redis container, and then run the redis container as above.
Go inside the redis container and check that the data is persisted.

Stop & remove the node container, and then run the node container as above.
