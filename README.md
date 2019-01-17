# GOAL

Create a postgres container & run a script that connects to the redis container.

# Build

`docker image build -t pg:getting-started .`

# Run

`docker container run --rm --name pg -v pgData:/var/lib/postgresql/data -p 5432:5432 -d pg:getting-started`

# Test

Open pgAdmin4 and create a server to connect to the container `pg`. Run another container and `sh` into it:

`docker container exec -it pg sh`

`psql -U novice -d gettingStarted -W` and put the password upon being prompted.

In the psql command line create a table, insert data, and verify it with pgAdmin4

```
CREATE TABLE link (
ID serial PRIMARY KEY,
url VARCHAR (255) NOT NULL,
name VARCHAR (255) NOT NULL,
description VARCHAR (255),
rel VARCHAR (50)
);

INSERT INTO link (url, name)
VALUES
('http://www.postgresqltutorial.com','PostgreSQL Tutorial');

INSERT INTO link (url, name)
VALUES
('http://www.oreilly.com','O''Reilly Media');

INSERT INTO link (url, name)
VALUES
('http://www.google.com','Google'),
('http://www.yahoo.com','Yahoo'),
('http://www.bing.com','Bing');
```

Remove `pg` container, run it again & verify data is persisted.

# References

* [postgresql tutorial](https://www.postgresqltutorial.com/postgresql-insert/)
