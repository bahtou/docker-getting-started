/**
 *  RobotsTxt Middleware
 */
const maxAge = 31556926000; //1 year
const perms = `
  User-agent: *
  Disallow: /
`;

const robotsTxt = async (ctx, next) => {
  const { headers, method, path } = ctx;

  if (!path) return;
  if (path !== '/robots.txt') return next();

  if (method !== 'GET' && method !== 'HEAD') {
    ctx.status = method === 'OPTIONS' ? 200 : 405;
    ctx.set('Allow', 'GET, HEAD, OPTIONS');

    return;
  }

  ctx.set('Cache-Control', 'public, max-age=' + (maxAge / 1000 | 0));
  ctx.type = 'text/plain';
  ctx.body = perms;

  return;
};


module.exports = robotsTxt;
