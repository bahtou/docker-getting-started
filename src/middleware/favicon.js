/**
 *  Favicon Middleware
 */
const favicon  = async (ctx, next) => {
  const { path } = ctx;

  if (!path) return;
  if (path !== '/favicon.ico') return next();

  return;
};


module.exports = favicon;
