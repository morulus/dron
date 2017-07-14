'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _echo = require('./echo');

var _echo2 = _interopRequireDefault(_echo);

var _writeFile = require('./writeFile');

var _writeFile2 = _interopRequireDefault(_writeFile);

var _each = require('./each');

var _each2 = _interopRequireDefault(_each);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _getState = require('./getState');

var _getState2 = _interopRequireDefault(_getState);

var _eslint = require('eslint');

var _constants = require('../../constants');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _uuid = require('uuid4');

var _uuid2 = _interopRequireDefault(_uuid);

var _helpers = require('./eslint/helpers');

var _selectors = require('./eslint/selectors');

var selectors = _interopRequireWildcard(_selectors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function* fromPlugin(name, plugin, parserOptions) {
  var state = yield (0, _getState2.default)();
  var cwd = state[_constants.__CONFIG__].pwd;
  var rules = {};
  Object.keys(plugin.rules).forEach(function (ruleName) {
    rules[name + '/' + ruleName] = 2;
  });
  var cli = new _eslint.CLIEngine({
    parser: "babel-eslint",
    baseConfig: {
      parserOptions: _extends({
        ecmaVersion: 6,
        sourceType: 'module'
      }, parserOptions)
    },
    fix: false,
    useEslintrc: false,
    cwd: cwd,
    rules: rules
  });
  /**
   *
   rules: {
     [`${pluginUuin}/rule`]: 2
   },
   */
  cli.addPlugin(name, plugin);
  yield Object.create(cli, {
    lint: {
      value: function* value(files, autoFix) {
        yield _echo2.default.clear();
        cli.options.fix = autoFix;
        if (typeof files === 'string' || typeof files === 'object' && files instanceof Array) {
          var filenames = typeof files === 'string' ? [files] : files;
          var report = cli.executeOnFiles(filenames);
          var success = yield (0, _map2.default)(report.results, function* (result, index) {
            if (result.warningCount || result.errorCount) {
              yield _echo2.default.log(_path2.default.relative(cwd, result.filePath));
              if (result.warningCount) {
                yield (0, _echo2.default)('  **Warnings**: ' + result.warningCount + (result.fixableWarningCount ? ' (' + result.fixableWarningCount + ' fixable)' : ''));
              }
              if (result.errorCount) {
                yield (0, _echo2.default)('  **Errors**: ' + result.errorCount + (result.fixableErrorCount ? ' (' + result.fixableErrorCount + ' fixable)' : ''));
              }
              yield (0, _each2.default)(result.messages, (0, _helpers.displayEsLintErrorMessage)(result.filePath));
            }
            if (autoFix && result.output) {
              try {
                yield (0, _writeFile2.default)(result.filePath, result.output);
                yield _echo2.default.ok('Updated');
                yield true;
              } catch (e) {
                yield _echo2.default.error(e.message);
                yield false;
              }
            }
          });
          if (!success.some(function (value) {
            return value === false;
          })) {
            yield _echo2.default.ok('Linted');
            yield true;
          } else {
            yield false;
          }
        } else if (isChannel(files)) {
          while (data = yield files) {
            var _data = data,
                _data2 = _slicedToArray(_data, 2),
                file = _data2[0],
                cb = _data2[1];

            var filename = file.path;
            if (file.contents) {
              var _report = cli.executeOnText(file.contents.toString(), filename);
              if (_report.results.length) {
                yield (0, _each2.default)(_report.results[0].messages, (0, _helpers.displayEsLintErrorMessage)(filename));
                if (autoFix && _report.results[0].output) {
                  file.contents = new Buffer(result.output, 'utf-8');
                }
              }
              cb(null, file);
            }
          }
        } else {
          yield _echo2.default.warn('eslint::fix expects string, or array, or channel. ' + typeof files + ' given');
        }
      }
    },
    fix: {
      value: function* value(files) {
        return this.lint(files, true);
      }
    }
  });
}

function* fromRule(rule, parserOptions) {
  var pluginUuin = (0, _uuid2.default)();
  var cli = yield fromPlugin(pluginUuin, {
    fix: true,
    rules: {
      "rule": rule
    }
  });
}

/**
while(data = yield files) {
    const [file, cb] = data;
    if (file.contents) {
      file.contents = new Buffer(file.contents.toString()+"\n#ok", 'utf-8');
      cb(null, file);
    }
  }
**/
function* eslint() {
  yield _echo2.default.error('Use eslint.fromRule instead eslint');
}

eslint.fromPlugin = fromPlugin;
eslint.fromRule = fromRule;
eslint.selectors = selectors;

exports.default = eslint;
module.exports = exports['default'];