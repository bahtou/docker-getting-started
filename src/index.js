const redis = require('redis');
const client = redis.createClient({
  host: 'redis'
});

client.on('error', function (err) {
    console.log(err);
});

client.set('hola', 'amigos!', redis.print);
client.set('hello', 'world!', redis.print);
client.set('bonjour', 'le monde!', redis.print);
client.get('hola', redis.print);
client.get('hello', redis.print);
client.get('bonjour', redis.print);
