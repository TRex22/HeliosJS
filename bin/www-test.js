#!/usr/bin/env node

/**
 * Module dependencies.
 */

var pkg = require('../package.json');
var config = require('../config.json');

var app = require('../app').app(pkg, config);
var debug = require('debug')('src:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(config.port);
if (process.env.NODE_ENV === 'production') {
  var port = normalizePort(process.env.PORT || config.port); //for heroku
} 
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

/**
Test hooks
Also only in dev env
**/
function listen(testPort) {
  /**
 * Listen on provided port, on all network interfaces.
 */

  console.log('\nStarting Borrow My Books backend...');
  server.listen(testPort);
  server.on('error', onError);
  server.on('listening', onListening);
  console.log('listening on port %s',testPort);
}

function close(callback) {
  this.server.close(callback);
}

if (process.env.NODE_ENV === 'test') {
  module.exports = {
      listen: listen,
      close: close,
      server: server
  };
};



