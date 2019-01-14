const KoaRouter = require('koa-router');

const { handleInitialRequest, responseHandler } = require('./controller');
const OrdersPL = require('../pipeline');


const OrdersEPI = new KoaRouter();
OrdersEPI
  .use('/orders', OrdersPL.routes());


module.exports = app => {
  app
    .use(responseHandler)
    .use(handleInitialRequest)

    .use(OrdersEPI.routes())
    .use(OrdersEPI.allowedMethods());
};
