"use strict";


const ACTION_SET_STATE = require('dron-constants').ACTION_SET_STATE;
const ENV = require('dron-constants').ENV;
const isGenerator = require('is-generator')
const MESSAGE = Symbol('MESSAGE');

function isFunction(next) {
  return "function"===typeof next;
}

function isObject(next) {
  return next!==null&&"object"===typeof next;
}

function isGeneratorResult(next) {
  return next.hasOwnProperty('value')&&next.hasOwnProperty('done')&&"boolean"===typeof next.done;
}

function isPromise(next) {
	return next!==null&&"object"===typeof next&&"function"===typeof next.then&&"function"===typeof next['catch'];
}

function isError(next) {
  return next instanceof Error;
}

const defaultStore = {}
module.exports = function run(next, props, store, previousNext) {
  const stateToProps = "undefined"===typeof props;
  if ("object"!==typeof store) {
    throw new Error("store must be defined");
  }

  if (stateToProps) {
    props = store.getState();
  }

  if (isFunction(next)) {
    let state = store.getState();
    if ("undefined"===typeof state) {

      console.log(new Error("fuck").stack); process.exit(0);
    }
    if (state[ENV].DEV) {
      store.dispatch({
        type: MESSAGE,
        message: '> '+(next.name||'anonymus')
      });
    }
    /**
     * Patch store with default state
     */
    if (next.hasOwnProperty('state')) {
      store.dispatch({
        type: ACTION_SET_STATE,
        state: Object.assign(next.state, state)
      });
      state = store.getState();
      if (stateToProps) {
        props = state;
      }
    }
    try {
      return run(next(props, store), state, store);
    } catch(e) {
      return Promise.reject(e);
    }
  } else if (isObject(next)) {
    if (isObject(previousNext)&&isGeneratorResult(next)) {
      // Means it is generator result
      if (!next.done) {
        return run(next.value, store.getState(), store)
        .then(function(value) {
          try {
            let nextValue = previousNext.next(value);
            if (!nextValue.done) {
              return run(nextValue, store.getState(), store, previousNext);
            } else {
              return Promise.resolve(value);
            }
          } catch(e) {
            return Promise.reject(e);
          }
        });
      } else {
        return run(next.value, store.getState(), store);
      }
    } else if (isGenerator(next)) {
      // Means it is generator
      try {
        let value = next.next();
        return run(value, store.getState(), store, next);
      } catch(e) {
        return Promise.reject(e);
      }
    } else if (isPromise(next)) {
      return next.then(function(next) {
        return run(next, store.getState(), store);
      }).catch(function(err) {
        return run(err, store.getState(), store);
      });
    } else if (isError(next)){
      return Promise.reject(next);
    } else {
      // Returns plain object
      return Promise.resolve(next);
    }
  } else {
    // Returns plain object
    return Promise.resolve(next);
  }
}

module.exports.MESSAGE = MESSAGE;
