import dispatch from './dispatch';
import { MESSAGE } from 'reciprocator';

function noop() { return true; }

function typeEcho(messages, type = 'log') {
  return function* () {
    yield dispatch({
      type: MESSAGE,
      message: messages,
      messageType: type
    });
    yield true;
  }
}

/**
* Echo log message
*/
const echo = function echo(...messages) {
  return typeEcho(messages, 'log');
}

/**
* Echo error message
*/
echo.error = function errorEcho(...messages) {
  return typeEcho(messages, 'error');
}

/**
* Echo warning
*/
echo.warn = function errorEcho(...messages) {
  return typeEcho(messages, 'warn');
}

/**
* Echo debug message (only for development mode)
*/
echo.denug = function errorEcho(...messages) {
  return process.env.NODE_ENV==='development' ? typeEcho(messages, 'debug') : noop;
}

export default echo;
