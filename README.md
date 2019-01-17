# GOAL

Have a node container connect & push data into a postgres container over the same network

## Build

Create `postgres_net` network

`docker network create --driver bridge postgres_net`

Build postgres image

`docker image build -t postgres -f ./Dockerfile_postgres .`

Build node image

`docker image build -t node:to-postgres -f ./Dockerfile_node .`

## Run

Run postgres container

`docker container run --rm --name postgres --net postgres_net -v pgData:/var/lib/postgresql/data -p 5432:5432 -d postgres`

Run node container

`docker container run --rm --name node-postgres --net postgres_net -v $(pwd)/src:/home/node/src -p 3000:3000 -it node:to-postgres sh`

This will put you inside the container. Run the command `./node_modules/.bin/nodemon src/index.js` to connect to postgres (on the same network `postgres_net`).

The result of the query should be:

```
links
 [ { id: 1,
    url: 'http://www.postgresqltutorial.com',
    name: 'PostgreSQL Tutorial',
    description: null,
    rel: null },
  { id: 2,
    url: 'http://www.oreilly.com',
    name: "O'Reilly Media",
    description: null,
    rel: null },
  { id: 3,
    url: 'http://www.google.com',
    name: 'Google',
    description: null,
    rel: null },
  { id: 4,
    url: 'http://www.yahoo.com',
    name: 'Yahoo',
    description: null,
    rel: null },
  { id: 5,
    url: 'http://www.bing.com',
    name: 'Bing',
    description: null,
    rel: null } ]
```

Go into the postgres container and veryify that the data is indeed there.

`docker container exec -it postgres sh`

`psql -U novice -d gettingStarted -W`

`SELECT * FROM link;

Stop & remove the postgres container, and then run the postgres container as above.
Go inside the postgres container and check that the data is persisted.

Stop & remove the node container, and then run the node container as above.
