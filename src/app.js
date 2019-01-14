const Koa = require('koa');
const koaLogger = require('koa-logger');

const middleware = require('./middleware');
const router = require('./api/router');
const app = new Koa();


app.proxy = true;
app
  .use(koaLogger())
  .use(middleware.favicon)
  .use(middleware.robotsTxt)
  .use(middleware.assignRequestId)
  .on('close', callback => {
    logger.warn('app closing');

    return callback();
  })

  .on('error', (err, ctx) => {
    logger.error(err);

    // if an error is in the req/res cycle and is not possible to respond to the client,
    // the CTX instance is passed application specific logging, throwing an error, or other logic here
    if (ctx) {
      logger.error('req/res cycle : unable to respond to client', ctx);
    }
  });

router(app);


module.exports = app;
