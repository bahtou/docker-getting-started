

async function getOrders(ctx) {

  logger.info('PIPELINE--getOrders');

  ctx.body = 'orders gotten';
}


module.exports = getOrders;
