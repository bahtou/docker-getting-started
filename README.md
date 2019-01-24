# GOAL

Use `docker-compose` to spin up three services that consist of Node.js, Redis & Postgres. The storage service should pull in their respective images, create named volumes & expose their ports. The Node.js
service should build from context with a development `ENV` variable, a volume of type `bind` that pairs the
host `src` directory with the container, and set the `depends_on` to postgres & redis.

# Run

`docker-compose up -d`

# NOTES

Docker compose automatically creates a project name if one is not specified. The default project name is the name of the directory.

* [project name](https://docs.docker.com/compose/reference/overview/#use--p-to-specify-a-project-name)

# References

* [docker-compose]()
* [docker volumes]()
* [docker networks]()

* [Linux : Directory /opt vs /usr/local](http://www.extradrm.com/?p=2266)
* [Linux FHS](https://www.tldp.org/LDP/Linux-Filesystem-Hierarchy/html/index.html)
* [FHS](http://www.pathname.com/fhs/pub/fhs-2.3.html)
* [FHS-wiki](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard)

* [Docker Redis](https://docs.docker.com/samples/library/redis/)
* [Redis warnings](https://github.com/docker-library/redis/issues/55)
