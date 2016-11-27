"use strict";

const ACTION_SET_STATE = require('dron-constants').ACTION_SET_STATE;
const isGenerator = require('is-generator')

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
  if ("object"!==typeof store) {
    throw new Error("store must be defined");
  }

  if ("undefined"===typeof props) {
    props = store.getState();
  }

  if (isFunction(next)) {
    /**
     * Patch store with default state
     */
    if (next.hasOwnProperty('defaultState')) {
      store.dispatch({
        type: ACTION_SET_STATE,
        data: Object.assign(next.defaultState, store.getState())
      });
    }
    try {
      return run(next.call(store, props), store.getState(), store);
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
    } else {
      // Returns plain object
      return Promise.resolve(next);
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
    return Promise.resolve(next);
  }
}
