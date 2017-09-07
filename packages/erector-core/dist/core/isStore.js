"use strict";

module.exports = function isStore(storeLike) {
  return "object" === typeof storeLike && "function" === typeof storeLike.getState && "function" === typeof storeLike.dispatch && "function" === typeof storeLike.replaceReducer;
};