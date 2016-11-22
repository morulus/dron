"use strict";
const path = require('path');
const ENV = require('dron-constants').ENV;
const run = require('./run.js');

/**
 * Run loopback generators from concrete file
 *
 * @param  {string} file Path to file
 * @param  {object} args Arguments
 * @return {Promise}
 */
function runFile(file, args) {
  let cwd = path.dirname(file);
  require('babel-register')({
    babelrc: false,
    presets: [require("babel-preset-latest")],
    plugins: [
      require("babel-plugin-transform-runtime"),
      require("babel-plugin-add-module-exports"),
      [require.resolve("babel-plugin-module-resolver"), {
        "root": [cwd],
        "alias": {
          "dron": path.resolve(__dirname, './env/dron.js')
        }
      }]
    ]
  });

  const entry = require(file);
  return run(entry, {
    [ENV]: {
      CWD: cwd
    },
    args: args
  });
}

module.exports = runFile;
