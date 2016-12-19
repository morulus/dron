"use strict";

const path = require('path');
const ENV = require('./../constants.js').ENV;
const run = require('./run.js');

/**
 * Run loopback generators from concrete file
 *
 * @param  {string} file Path to file
 * @param  {object} args Arguments
 * @return {Promise}
 */
function runModule(file, args, env) {
  let mwd = path.dirname(file);
  require('babel-register')({
    babelrc: false,
    presets: [
      require.resolve('babel-preset-es2015'),
      require.resolve("babel-preset-stage-0"),
      require.resolve("babel-preset-stage-1"),
      require.resolve("babel-preset-stage-2"),
      require.resolve("babel-preset-stage-3"),
    ],
    plugins: [
      require.resolve("babel-plugin-transform-runtime"),
      require.resolve("babel-plugin-transform-object-assign"),
      require.resolve("babel-plugin-transform-regenerator"),
      require.resolve("babel-plugin-add-module-exports"),
      [require.resolve("babel-plugin-module-resolver"), {
        "root": [__dirname],
        "alias": {
          "erector": path.resolve(__dirname, './env/erector.js'),
          "erector/constants": path.resolve(__dirname, './../constants.js'),
          "module": mwd,
          "babel-runtime": path.resolve(__dirname, './../node_modules/babel-runtime/')
        }
      }]
    ]
  });

  const entry = require(file);
  const preloadedState = {
    [ENV]: Object.assign({}, env, {
      MWD: mwd,
      /**
       * Windows is not providing PWD constant, so we have to create it manually
       */
      PWD: env.PWD || process.cwd()
    })
  };
  return run(entry, args, preloadedState);
}

module.exports = runModule;
