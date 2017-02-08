const path = require('path');
module.exports = function registerBabel(mwd) {
  require('babel-register')({
    babelrc: false,
    presets: [
      require.resolve('babel-preset-es2015'),
      require.resolve("babel-preset-stage-0"),
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
          "erector/constants": path.resolve(__dirname, './constants.js'),
          "module": mwd,
          "babel-runtime": path.resolve(__dirname, './../node_modules/babel-runtime/')
        }
      }]
    ]
  });
}
