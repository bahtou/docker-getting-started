const stackTrace = require('stack-trace');
const ip = require('ip');
const moment = require('moment');
const os = require('os');
const util = require('util');
require('colors');


const env = 'local';
const _baseLog = {
  boxHost: os.hostname(),
  boxIpAddress: ip.address(),
  env,
  service: 'meetup-nodejs',
  appVersion: `12341234`
};
const _methodMap = {
  debug: 'debug',
  error: 'erroror',
  info: 'info',
  warn: 'warning'
};
let utilConfig = {
  showhidden: false,
  depth: null, //Specifies the number of times to recurse while formatting the object.
  colors: false,
  maxArrayLength: 100, //Specifies the maximum number of array and TypedArray elements to include when formatting
  breakLength: 60 //The length at which an object's keys are split across multiple lines -- default: 60
};
const color = {
  debug: 'blue',
  error: 'red',
  info: 'green',
  warn: 'yellow'
};

// Just proxy methods we don't care about on the original console object
function consoleProxy(obj) {
  const methods = ['log', 'dir', 'time', 'timeEnd', 'trace', 'assert'];

  methods.forEach(method => {
    if (!obj[method]) {
      obj[method] = () => {
        return console[method].apply(console, arguments);
      };
    }
  });
}

function createLogger(method) {
  const obj = {
    [method](msg='', data={}) {
      const trace = stackTrace.get(this[method])
      const msgType = Object.prototype.toString.call(msg);
      const dataType = Object.prototype.toString.call(data);
      let log = {};

      if (msg && msgType === '[object Object]') {
        data = msg;
        msg = '';
      }

      // for devs
      if (data && dataType !== '[object Object]') {
        logger.error(`logging data must be an Object but given ${dataType}: ${data} --${msg}--`);
        return;
      }

      log = {
        msg,
        data,
        ..._baseLog,
        level: method,
        time: moment().format('DD MMM HH:mm:ss-SSSTZZ')
      };

      if (method === 'error' ) {
        log = { ...log, stack: stitchStackTrace(msg, trace) };
      }

      if (env !== 'local') {
        utilConfig = { ...utilConfig, breakLength: Infinity };
        return process.stdout.write(util.inspect(log, utilConfig)[color[method]] + '\n');
      }

      return process.stdout.write(util.inspect(log, utilConfig)[color[method]] + '\n\n');
    }
  }

  function stitchStackTrace(msg, trace) {
    let stackTrace = `${method.toUpperCase()}: ${msg}`;

    for (const stack of trace) {
      let typeName = stack.getTypeName();
      typeName = typeName ? typeName + '.' : '';

      stackTrace += `
        at ${typeName}${stack.getFunctionName()} (${stack.getFileName()}:${stack.getLineNumber()}:${stack.getColumnNumber()})`;
    }

    return stackTrace;
  }

  return obj[method];
};

const spit = () => {
  let obj = {};

  obj.debug = createLogger('debug');
  obj.info = createLogger('info');
  obj.warn = createLogger('warn');
  obj.error = createLogger('error');

  consoleProxy(obj);

  return obj;
};


global.logger = spit();
module.exports = async function() {
  return spit();
}


/**
 * https://github.com/felixge/node-stack-trace
 */

// function _logResponse(ctx, body, httpCode, statusCode) {
//   var logBody = { responseBody: body };
//   logBody.request = {
//     protocol: ctx.protocol,
//     url: ctx.url,
//     originalUrl: ctx.originalUrl,
//     method: ctx.method,
//     body: ctx.body,
//     query: ctx.query,
//     params: ctx.params,
//     accepted: ctx.accepted,
//     ips: ctx.ips
//   };

//   if (_isServerError(httpCode, statusCode)) {
//     logger.err('ApiResponse (' + httpCode + ')', logBody);
//   } else if (_isTooManyRequestsError(httpCode) || _isServerWarning(httpCode, statusCode)) {
//     logger.warn('ApiResponse (' + httpCode + ')', logBody);
//   } else {
//     logger.info('ApiResponse (' + httpCode + ')', logBody);
//   }
// }
