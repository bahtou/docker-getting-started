# GOAL

Connect Node + Redis + Postgres to the same network and persist data to both redis + postgres

# Build

Create the `storage_net` network

`docker network create --driver bridge storage_net`

**Postgres**

`docker image build -t postgres -f ./Dockerfile_postgres .`

**Redis**

`docker image build -t redis -f ./Dockerfile_redis .`

**Node**

`docker image build -t node:to-redis-postgres -f ./Dockerfile_node .`

# Run

**Postgres**

`docker container run --rm --name postgres --net storage_net -v pgData:/var/lib/postgresql/data -p 5432:5432 -d postgres`

**Redis**

`docker container run --rm --name redis --net storage_net -v redis_data:/data -p 6379:6379 -d redis`

**Node**

`docker container run --rm --name node-redis-postgres --net storage_net -v $(pwd)/src:/home/node/src -p 3000:3000 -it node:to-redis-postgres sh`

This will put you inside the container. Run the command ./node_modules/.bin/nodemon src/index.js to connect to redis + postgres (on the same network storage_net).

```
Reply: OK
Reply: OK
Reply: OK
Reply: amigos!
Reply: world!
Reply: le monde!
CONNECT--dc:undefined processId:33 key:-1173502780 used:0 { connectionParameters:
   ConnectionParameters {
     user: 'novice',
     database: 'gettingStarted',
     port: 5432,
     host: 'postgres',
     binary: false,
     ssl: false,
     client_encoding: '',
     replication: undefined,
     isDomainSocket: false,
     application_name: undefined,
     fallback_application_name: undefined,
     statement_timeout: false,
     query_timeout: false } }
QUERY { query: 'SELECT * FROM link;' }
DISCONNECT--releasing the virtual connection--dc:undefined processId:33 key:-1173502780 { connectionParameters:
   ConnectionParameters {
     user: 'novice',
     database: 'gettingStarted',
     port: 5432,
     host: 'postgres',
     binary: false,
     ssl: false,
     client_encoding: '',
     replication: undefined,
     isDomainSocket: false,
     application_name: undefined,
     fallback_application_name: undefined,
     statement_timeout: false,
     query_timeout: false } }
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
Node container connected to Postgres container successfully
```
