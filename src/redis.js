const redis = require('redis');
const client = redis.createClient({
  host: 'redis' // name of container
});


module.exports = client;
