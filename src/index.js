const redis = require('redis');
const client = require('./redis');
const db = require('./postgres');


client.on('error', function (err) {
    console.log(err);
});

client.set('hola', 'amigos!', redis.print);
client.set('hello', 'world!', redis.print);
client.set('bonjour', 'le monde!', redis.print);
client.get('hola', redis.print);
client.get('hello', redis.print);
client.get('bonjour', redis.print);

async function main() {

  try {
    const links = await db.any('SELECT * FROM link;');
    console.log('links\n', links);
    console.log('Node container connected to Postgres container successfully');
  }
  catch(e) {
    console.error(e);
  }
}


main();
