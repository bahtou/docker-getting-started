const redis = require('redis');
const client = redis.createClient({
  host: '127.0.0.1'
});

client.on("error", function (err) {
    console.log(err);
});

client.set("hola", "amigos!", redis.print);
client.get("hola", redis.print);
