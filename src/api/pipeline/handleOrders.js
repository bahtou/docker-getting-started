

async function handleOrders(ctx) {
  const { params:{ orderId }} = ctx;

  logger.info('PIPELINE--handleOrders');

  ctx.body = `order ID ${orderId} handled`;
}


module.exports = handleOrders;
