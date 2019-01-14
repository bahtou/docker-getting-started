const KoaRouter = require('koa-router');
const { validateOrderId } = require('./validation');

const fetchOrders = require('./fetchOrders');
const getOrders = require('./getOrders');
const handleOrders = require('./handleOrders');


const Router = new KoaRouter();
const Root = new KoaRouter();

Root
  .get('/',
    getOrders)

Root
  .get('/:orderId',
    validateOrderId,
    fetchOrders,
    handleOrders);

Router.use(
  Root.routes(), Root.allowedMethods()
);


module.exports = Router;


/**
 * /orders
 * /orders/:orderId
 */
