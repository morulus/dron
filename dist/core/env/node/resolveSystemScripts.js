'use strict';

var path = require('path');

module.exports = function resolveSystemScripts(name) {
  return require.resolve(path.resolve(__dirname, '../../../scripts/' + name + '.js'));
};