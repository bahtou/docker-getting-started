const dbConfig = {
  host: 'postgres', // name of the container
  user: 'novice',
  password: 'password',
  database: 'gettingStarted'
};

const initOptions = {
  schema: 'public',
  connect(client, dc, useCount) {
    const { connectionParameters, processID, secretKey } = client;
    console.info(`CONNECT--dc:${dc} processId:${processID} key:${secretKey} used:${useCount}`, { connectionParameters });
  },
  disconnect(client, dc) {
    const { connectionParameters, processID, secretKey } = client;
    console.warn(`DISCONNECT--releasing the virtual connection--dc:${dc} processId:${processID} key:${secretKey}`, { connectionParameters });
  },
  query(queryToBeExecuted) {
    const { query } = queryToBeExecuted;
    console.info(`QUERY`, { query });
  }
};

const pgp = require('pg-promise')(initOptions);
const db = pgp(dbConfig);


module.exports = db;
