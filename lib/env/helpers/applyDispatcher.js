import { assignMiddleware } from 'erector';

/**
 * Apply custom dispatcher, which will be accept all Erector actions.
 *
 * @param  {function|generator} handler
 * @return {function} Unapplier
 */
export default function* connectDispatcher(handler) {
  yield assignMiddleware(function() {
    return function() {
      return handler;
    }
  });
}
