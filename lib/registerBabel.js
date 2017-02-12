const child_process = require('child_process');
const path = require('path');
const requireg = require('requireg');
module.exports = function registerBabel(mwd) {
  const aliases = {
    "erector": path.resolve(__dirname, './env/erector.js'),
    "erector/constants": path.resolve(__dirname, './constants.js'),
    "module": mwd,
    "babel-runtime": path.resolve(__dirname, './../node_modules/babel-runtime/')
  };
  const globalPackages = child_process.execSync('npm config get erector.global.packages').toString();
  if (globalPackages) {
    globalPackages
    .trim()
    .split(';')
    .forEach(function(packageName) {
      if (packageName && packageName !== 'undefined') {
        const basename = path.basename(packageName);
        if (!aliases[basename]) {
          if (!path.isAbsolute(packageName)) {
            packageName = requireg.resolve(packageName);
          }
          aliases[basename] = packageName;
        }
      }
    });
  }
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
        "alias": aliases
      }]
    ]
  });
}
