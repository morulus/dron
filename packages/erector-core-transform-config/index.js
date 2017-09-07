const path = require('path');
const babelModuleResolverPath = require.resolve('babel-plugin-module-resolver');
/**
 * getBabelConfiguration - return babel configuration
 *
 * @param  {type} opt
 * @param  {bool} opt.resolvePath Custom module resolver
 * @param  {bool} opt.aliases Aliases
 * @param  {bool} opt.runtime Use only for runtime mode
 * @param  {array|function} opt.ignore Ignore paths
 * @return {type}
 */
module.exports = function getBabelConfiguration(opt) {
  const babelRuntimeRoot = path.dirname(require.resolve("babel-runtime/package.json"), '../');
  const babelRuntimeRegenerator = require.resolve("regenerator-runtime");
  const regenerator = require(babelRuntimeRegenerator);
  const finalAliases = {
    "babel-runtime": babelRuntimeRoot,
    "babel-runtime/regenerator": babelRuntimeRegenerator,
  };
  if (!opt.runtime) {
    finalAliases["erector"] = "erector"
  }
  return {
    babelrc: false,
    plugins: [
      require.resolve("babel-plugin-transform-regenerator"),
      [require.resolve("babel-plugin-transform-runtime"), {
        "helpers": false,
        "polyfill": true,
        "regenerator": true,
        "moduleName": opt.runtime ? babelRuntimeRoot : "babel-runtime"
      }],
      [babelModuleResolverPath, opt.runtime ? {
        root: [opt.root || __dirname],
        alias: Object.assign(opt.aliases || {}, finalAliases),
        resolvePath: opt.resolvePath || babelModuleResolverPath.resolvePath,
      } : {}],
      require.resolve("babel-plugin-add-module-exports"),
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
    ignore: opt.ignore || [],
  };
}
