const babelModuleResolverPath = require.resolve('babel-plugin-module-resolver');
/**
 * getBabelConfiguration - return babel configuration
 *
 * @param  {type} opt
 * @param  {bool} opt.resolvePath Custom module resolver
 * @param  {bool} opt.aliases Aliases
 * @param  {array|function} opt.ignore Ignore paths
 * @return {type}
 */
module.exports = function getBabelConfiguration(opt) {
  return {
    babelrc: false,
    plugins: [
      [babelModuleResolverPath, {
        root: [opt.root || __dirname],
        alias: opt.aliases || {},
        resolvePath: opt.resolvePath || babelModuleResolverPath.resolvePath,
      }],
      [require.resolve("babel-plugin-transform-runtime"), {
        "helpers": false,
        "polyfill": false,
        "regenerator": true,
        "moduleName": "babel-runtime"
      }],
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
