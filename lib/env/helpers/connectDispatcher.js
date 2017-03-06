import { assignMiddleware } from 'erector';

export default function* connectDispatcher(handler) {
  yield assignMiddleware(function() {
    return function() {
      return handler;
    }
  });
}
