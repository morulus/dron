const run = require('loopback-run');
module.exports = function dronRun(fn, props) {
  return run(fn, props);
}
