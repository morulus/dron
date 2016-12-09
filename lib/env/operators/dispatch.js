export default function(action) {
  return function lateDispatch(props, store) {
    store.dispatch(action);
    return true;
  }
}
