export default function getState(selector) {
  return function(state) {
    return typeof selector === "function" ? selector(state) : state;
  }
}
