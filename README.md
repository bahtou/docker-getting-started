# docker-redis

## Goal

Create a redis container & run a script that connects to the redis container.

## Build

`docker image build -t redis .`

## RUN

`docker container run --rm --name redis -v redis_data:/data -p 6379:6379 -d redis`

## Test

From the commandline run the following:

1) `npm install -S redis`

2) `node index.js`

The script will connect to the redis instance, `set` a key/value, and print the value to the commandline to show that there is indeed a container connection.

## NOTES

`-v` creates a named volume on the docker host to persist data

## References

* [Redis persistance](https://hub.docker.com/_/redis?tab=description#start-with-persistent-storage)
* [Docker volumes](https://docs.docker.com/storage/volumes/)
* [Redis security](https://redis.io/topics/security)
