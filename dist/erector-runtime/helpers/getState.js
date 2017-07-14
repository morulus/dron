"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getState;
/**
 * Get current state
 * ```js
 * const state = yield getState();
 * ```
 * The helper can accept selector.
 * ```js
 * const files = yield getState(state => state.files);
 * ```
 * @param  {function} selector
 * @return {any}
 */
function getState(selector) {
  return function (state) {
    return typeof selector === "function" ? selector(state) : state;
  };
}
module.exports = exports["default"];