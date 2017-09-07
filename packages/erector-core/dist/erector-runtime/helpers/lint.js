'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isIterable2 = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/is-iterable');

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _create = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _keys = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if ((0, _isIterable3.default)(Object(arr))) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = _assign2.default || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _marked = /*#__PURE__*/_regenerator2.default.mark(fromPlugin),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(fromRule),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(eslint);

function fromPlugin(name, plugin, parserOptions) {
  var state, cwd, rules, cli;
  return _regenerator2.default.wrap(function fromPlugin$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return (0, _getState2.default)();

        case 2:
          state = _context4.sent;
          cwd = state[_constants.__CONFIG__].pwd;
          rules = {};

          (0, _keys2.default)(plugin.rules).forEach(function (ruleName) {
            rules[name + '/' + ruleName] = 2;
          });
          cli = new _eslint.CLIEngine({
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
          _context4.next = 10;
          return (0, _create2.default)(cli, {
            lint: {
              value: /*#__PURE__*/_regenerator2.default.mark(function value(files, autoFix) {
                var filenames, report, success, _data, _data2, file, cb, filename, _report;

                return _regenerator2.default.wrap(function value$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return _echo2.default.clear();

                      case 2:
                        cli.options.fix = autoFix;

                        if (!(typeof files === 'string' || typeof files === 'object' && files instanceof Array)) {
                          _context2.next = 20;
                          break;
                        }

                        filenames = typeof files === 'string' ? [files] : files;
                        report = cli.executeOnFiles(filenames);
                        _context2.next = 8;
                        return (0, _map2.default)(report.results, /*#__PURE__*/_regenerator2.default.mark(function _callee(result, index) {
                          return _regenerator2.default.wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  if (!(result.warningCount || result.errorCount)) {
                                    _context.next = 11;
                                    break;
                                  }

                                  _context.next = 3;
                                  return _echo2.default.log(_path2.default.relative(cwd, result.filePath));

                                case 3:
                                  if (!result.warningCount) {
                                    _context.next = 6;
                                    break;
                                  }

                                  _context.next = 6;
                                  return (0, _echo2.default)('  **Warnings**: ' + result.warningCount + (result.fixableWarningCount ? ' (' + result.fixableWarningCount + ' fixable)' : ''));

                                case 6:
                                  if (!result.errorCount) {
                                    _context.next = 9;
                                    break;
                                  }

                                  _context.next = 9;
                                  return (0, _echo2.default)('  **Errors**: ' + result.errorCount + (result.fixableErrorCount ? ' (' + result.fixableErrorCount + ' fixable)' : ''));

                                case 9:
                                  _context.next = 11;
                                  return (0, _each2.default)(result.messages, (0, _helpers.displayEsLintErrorMessage)(result.filePath));

                                case 11:
                                  if (!(autoFix && result.output)) {
                                    _context.next = 27;
                                    break;
                                  }

                                  _context.prev = 12;
                                  _context.next = 15;
                                  return (0, _writeFile2.default)(result.filePath, result.output);

                                case 15:
                                  _context.next = 17;
                                  return _echo2.default.ok('Updated');

                                case 17:
                                  _context.next = 19;
                                  return true;

                                case 19:
                                  _context.next = 27;
                                  break;

                                case 21:
                                  _context.prev = 21;
                                  _context.t0 = _context['catch'](12);
                                  _context.next = 25;
                                  return _echo2.default.error(_context.t0.message);

                                case 25:
                                  _context.next = 27;
                                  return false;

                                case 27:
                                case 'end':
                                  return _context.stop();
                              }
                            }
                          }, _callee, this, [[12, 21]]);
                        }));

                      case 8:
                        success = _context2.sent;

                        if (success.some(function (value) {
                          return value === false;
                        })) {
                          _context2.next = 16;
                          break;
                        }

                        _context2.next = 12;
                        return _echo2.default.ok('Linted');

                      case 12:
                        _context2.next = 14;
                        return true;

                      case 14:
                        _context2.next = 18;
                        break;

                      case 16:
                        _context2.next = 18;
                        return false;

                      case 18:
                        _context2.next = 39;
                        break;

                      case 20:
                        if (!isChannel(files)) {
                          _context2.next = 37;
                          break;
                        }

                      case 21:
                        _context2.next = 23;
                        return files;

                      case 23:
                        if (!(data = _context2.sent)) {
                          _context2.next = 35;
                          break;
                        }

                        _data = data, _data2 = _slicedToArray(_data, 2), file = _data2[0], cb = _data2[1];
                        filename = file.path;

                        if (!file.contents) {
                          _context2.next = 33;
                          break;
                        }

                        _report = cli.executeOnText(file.contents.toString(), filename);

                        if (!_report.results.length) {
                          _context2.next = 32;
                          break;
                        }

                        _context2.next = 31;
                        return (0, _each2.default)(_report.results[0].messages, (0, _helpers.displayEsLintErrorMessage)(filename));

                      case 31:
                        if (autoFix && _report.results[0].output) {
                          file.contents = new Buffer(result.output, 'utf-8');
                        }

                      case 32:
                        cb(null, file);

                      case 33:
                        _context2.next = 21;
                        break;

                      case 35:
                        _context2.next = 39;
                        break;

                      case 37:
                        _context2.next = 39;
                        return _echo2.default.warn('eslint::fix expects string, or array, or channel. ' + typeof files + ' given');

                      case 39:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, value, this);
              })
            },
            fix: {
              value: /*#__PURE__*/_regenerator2.default.mark(function value(files) {
                return _regenerator2.default.wrap(function value$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        return _context3.abrupt('return', this.lint(files, true));

                      case 1:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, value, this);
              })
            }
          });

        case 10:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked, this);
}

function fromRule(rule, parserOptions) {
  var pluginUuin, cli;
  return _regenerator2.default.wrap(function fromRule$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          pluginUuin = (0, _uuid2.default)();
          _context5.next = 3;
          return fromPlugin(pluginUuin, {
            fix: true,
            rules: {
              "rule": rule
            }
          });

        case 3:
          cli = _context5.sent;

        case 4:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked2, this);
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
function eslint() {
  return _regenerator2.default.wrap(function eslint$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _echo2.default.error('Use eslint.fromRule instead eslint');

        case 2:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked3, this);
}

eslint.fromPlugin = fromPlugin;
eslint.fromRule = fromRule;
eslint.selectors = selectors;

exports.default = eslint;
module.exports = exports['default'];