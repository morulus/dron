export default function dispatch(action) {
  return function lateDispatch(props, store) {
    store.dispatch(action);
    return true;
  }
}
