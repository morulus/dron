const child_process = require('child_process');
const path = require('path');
const requireg = require('requireg');
const ERECTOR_LOCAL_DIRS = require('./constants').ERECTOR_LOCAL_DIRS;
module.exports = function registerBabel(mwd) {
  const aliases = {
    "erector/constants": path.resolve(__dirname, './constants.js'),
    "erector/selectors": path.resolve(__dirname, './selectors.js'),
    "erector": path.resolve(__dirname, './env/erector.js'),
    "module": mwd
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
  const babelModuleResolverPath = require.resolve("babel-plugin-module-resolver");
  const resolvePath = require(babelModuleResolverPath).resolvePath;
  require('babel-register')({
    babelrc: false,
    plugins: [
      [babelModuleResolverPath, {
        root: [__dirname],
        alias: aliases,
        resolvePath: function (sourcePath, currentFile, opts) {
          const splitedPath = sourcePath.split(path.sep);
          const firstDir = splitedPath.shift();
          let startDir = path.dirname(sourcePath);
          if (~ERECTOR_LOCAL_DIRS.indexOf(firstDir)) {
            while (true) {
              const targetFolder = searchFolderInParentDirs(startDir);
              if (!targetFolder) {
                break;
              } else {
                const targetSource = path.join(targetFolder, splitedPath.join(path.sep));
                try {
                  return require.resolve(targetSource);
                } catch (e) {
                  const parentFromSource = path.resolve(targetFolder, '..');
                  const nextStartDir = startDir === parentFromSource
                    ? path.resolve(parentFromSource, '..')
                    : targetSource;
                  if (nextStartDir === startDir) {
                    break;
                  }
                  startDir = nextStartDir;
                  continue;
                }
              }
            }
          }
          const resolvedPath = resolvePath(sourcePath, currentFile, opts);
          return resolvedPath;
        }
      }],
      [require.resolve("babel-plugin-transform-runtime"), {
        "helpers": false,
        "polyfill": false,
        "regenerator": true,
        "moduleName": "babel-runtime"
      }],
      // require.resolve("babel-plugin-add-module-exports"),
      require.resolve("babel-plugin-transform-es2015-modules-commonjs"),
      require.resolve("babel-plugin-syntax-trailing-function-commas"),
      require.resolve("babel-plugin-syntax-dynamic-import"),
      require.resolve("babel-plugin-check-es2015-constants"),
      require.resolve("babel-plugin-transform-class-properties"),
      require.resolve("babel-plugin-transform-es2015-arrow-functions"),
      require.resolve("babel-plugin-transform-es2015-block-scoped-functions"),
      require.resolve("babel-plugin-transform-es2015-block-scoping"),
      require.resolve("babel-plugin-transform-es2015-classes"),
      require.resolve("babel-plugin-transform-es2015-computed-properties"),
      require.resolve("babel-plugin-transform-es2015-destructuring"),
      require.resolve("babel-plugin-transform-function-bind"),
      require.resolve("babel-plugin-transform-es2015-function-name"),
      require.resolve("babel-plugin-transform-es2015-object-super"),
      require.resolve("babel-plugin-transform-es2015-parameters"),
      require.resolve("babel-plugin-transform-es2015-shorthand-properties"),
      require.resolve("babel-plugin-transform-es2015-spread"),
      require.resolve("babel-plugin-transform-es2015-template-literals"),
      require.resolve("babel-plugin-transform-export-extensions"),
      require.resolve("babel-plugin-transform-object-rest-spread"),
      require.resolve("babel-plugin-transform-object-assign")
    ],
    cache: false
  });
}
