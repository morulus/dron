import assignMiddleware from './assignMiddleware';

export default function* connectDispatcher(handler) {
  yield echo.warn('connectDispatcher is deprecated, use applyDispatcher instead');
  yield assignMiddleware(function() {
    return function() {
      return handler;
    }
  });
}
