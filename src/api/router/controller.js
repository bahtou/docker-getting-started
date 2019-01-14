const handleInitialRequest = async (ctx, next) => {
  const { method, headers, ip, ips, path, querystring, origin, hostname } = ctx;
  const { reqId } = ctx.state;

  let entryPoint = {
    xForwardedFor: headers['x-forwarded-for'],
    ipAddress: ip,
    ipAddresses: ips,
    method,
    path,
    querystring,
    hostname,
    origin,
    userAgent: headers['user-agent']
  };

  ctx.state = { ...ctx.state, entryPoint };
  logger.info('ENTRY POINT', { reqId, entryPoint });

  return next();
};

const responseHandler = async (ctx, next) => {
  const { reqBegin } = ctx.state;

  try {
    await next();
    const reqDuration = `${Date.now() - reqBegin}ms`;
    ctx.set('X-ResponseTime', reqDuration);
  } catch (err) {
    const reqDuration = `${Date.now() - reqBegin}ms`;
    const { state:{ reqId, entryPoint, response }} = ctx;
    const { status=500, headers, body } = response;

    logger.warn(`RESPONSE ERROR`, { reqId, body, headers, status, entryPoint, reqDuration });

    if (headers) {
      ctx.set(headers);
    }

    ctx.set('X-ResponseTime', reqDuration);
    ctx.status = status;
    ctx.body = { reqId, ...body };

    return;
  }
};


module.exports = {
  handleInitialRequest,
  responseHandler
};
