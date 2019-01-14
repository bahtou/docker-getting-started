global._require = name => require(`${__dirname}/${name}`);

let app;
let httpServer;

async function server() {
  const http = require('http');

  try {
    await require('./onBoot/logger');
  } catch (err) {
    console.error('unable to initialize\n', err);
    return process.exit(1);
  }

  app = require('./app');
  httpServer =
    http.createServer(app.callback())
      .listen(3000, () => {
        logger.warn(`HTTP Koa server: listening on port 3000`);
      });

  httpServer.timeout = 1800000;
}

function shutdown() {
  logger.warn('Server shutting down');
  logger.warn('Closing HTTP server -- not accepting new connections but keeping existing connections');

  httpServer.close((err) => {
    if (err) logger.error('Server was not open when it was closed', err);
    app.emit('close', () => {
      process.exit(0);
    });
  });
}

server();

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('unhandledRejection', (reason, p) => {
  logger.error(`Unhandled Rejection because of ${reason}`, { p });
});


/**
 * https://nodejs.org/api/process.html
 * https://nodejs.org/api/net.html
 * https://nodejs.org/api/http.html
 * https://github.com/koajs/koa/blob/master/docs/api/index.md#appcallback
 */
