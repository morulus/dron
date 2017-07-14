'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isChannel;

var _constants = require('../../constants');

function isChannel(channelLike) {
  return channelLike[_constants.CHANNEL] === true;
}
module.exports = exports['default'];