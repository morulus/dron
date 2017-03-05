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
export default function getState(selector) {
  return function(state) {
    return typeof selector === "function" ? selector(state) : state;
  }
}
