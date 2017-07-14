'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return function () {
    process.stdout.write('\x1B[2J\x1B[0f');
  };
};

module.exports = exports['default']; /**
                                      * Clear terminal
                                      * @example
                                      * yield clear();
                                      */