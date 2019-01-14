

async function fetchOrders(ctx, next) {

  logger.info('PIPELINE--fetchOrders');

  return next();
}


module.exports = fetchOrders;
