

async function validateOrderId(ctx, next) {
  const { params:{ orderId }} = ctx;

  logger.info('PIPELINE--validateOrderId', { orderId });

  return next();
}


module.exports = {
  validateOrderId
};
