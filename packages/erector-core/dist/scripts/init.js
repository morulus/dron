'use strict';

import _Object$defineProperty from '/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/object/define-property';
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _values = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _regenerator = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _stringify = require('/Users/morulus/Work/morulus/projects/erector/packages/erector-core-transform-config/node_modules/babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _packageFs;

exports.default = _callee2;

var _erector = require('erector');

var _selectors = require('erector/selectors');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { _Object$defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(deployScript),
    _marked2 = /*#__PURE__*/_regenerator2.default.mark(deployProjectScript),
    _marked3 = /*#__PURE__*/_regenerator2.default.mark(deployPackage),
    _marked4 = /*#__PURE__*/_regenerator2.default.mark(deployProjectPackage),
    _marked5 = /*#__PURE__*/_regenerator2.default.mark(getModuleType),
    _marked6 = /*#__PURE__*/_regenerator2.default.mark(create),
    _marked7 = /*#__PURE__*/_regenerator2.default.mark(_callee2);

function isFalse(value) {
  return value === false;
}

var SCRIPT = 'SCRIPT';
var PROJECT_SCRIPT = 'PROJECT_SCRIPT';
var PROJECT_PACKAGE = 'PROJECT_PACKAGE';
var PACKAGE = 'PACKAGE';

var JS_FILE_REGEXP = /\.js$/;
var PROJECT_TOOL_PACKAGE_REGEXP = /[a-z0-9\-_]+/i;

var SCRIPT_SCAFFOLDING = 'import { echo } from \'erector\';\n\nfunction mapArgsToState(args) {\n  return {};\n}\n\nexport default function* (args) {\n  yield assignState(mapArgsToState(args));\n  yield echo(\'OK\');\n}\n';

var PACKAGEJSON_SCAFFOLDING = function PACKAGEJSON_SCAFFOLDING(state) {
  return (0, _stringify2.default)({
    "name": 'erector-' + state.name,
    "version": "0.1.0",
    "engines": {
      "erector": '^' + (0, _selectors.engineVersion)(state)
    },
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "erect index.js"
    },
    "keywords": ["Erector", "module"],
    "author": "",
    "license": "ISC"
  }, null, 2);
};

function nameToJsFilename(name) {
  return JS_FILE_REGEXP.test(name) ? name : name + '.js';
}

function deployScript(_ref) {
  var moduleName = _ref.moduleName;
  var filename;
  return _regenerator2.default.wrap(function deployScript$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          filename = nameToJsFilename(moduleName);

        case 1:
          if (!true) {
            _context.next = 15;
            break;
          }

          if (filename) {
            _context.next = 6;
            break;
          }

          _context.next = 5;
          return (0, _erector.dialog)({
            message: 'Enter file name',
            type: 'input',
            required: true,
            validate: function validate(filename) {
              return JS_FILE_REGEXP.test(filename) ? true : 'Filename must have .js extension';
            }
          });

        case 5:
          filename = _context.sent;

        case 6:
          _context.next = 8;
          return (0, _erector.writeFileSafe)(filename, SCRIPT_SCAFFOLDING);

        case 8:
          if (!_context.sent) {
            _context.next = 13;
            break;
          }

          _context.next = 11;
          return _erector.echo.success(filename + ' created');

        case 11:
          filename = false;
          return _context.abrupt('break', 15);

        case 13:
          _context.next = 1;
          break;

        case 15:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this);
}

function deployProjectScript(_ref2) {
  var moduleName = _ref2.moduleName;
  var filename, filepath;
  return _regenerator2.default.wrap(function deployProjectScript$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          filename = nameToJsFilename(moduleName);

        case 1:
          if (!true) {
            _context2.next = 18;
            break;
          }

          if (filename) {
            _context2.next = 6;
            break;
          }

          _context2.next = 5;
          return (0, _erector.dialog)({
            message: 'Enter file name',
            type: 'input',
            required: true,
            validate: function validate(filename) {
              return JS_FILE_REGEXP.test(filename) ? true : 'Filename must have .js extension';
            }
          });

        case 5:
          filename = _context2.sent;

        case 6:
          _context2.next = 8;
          return (0, _erector.createDir)('./__erector__');

        case 8:
          filepath = _path2.default.join('./__erector__', filename);
          _context2.next = 11;
          return (0, _erector.writeFileSafe)(filepath, SCRIPT_SCAFFOLDING);

        case 11:
          if (!_context2.sent) {
            _context2.next = 16;
            break;
          }

          _context2.next = 14;
          return _erector.echo.success(filepath + ' created');

        case 14:
          filename = false;
          return _context2.abrupt('break', 18);

        case 16:
          _context2.next = 1;
          break;

        case 18:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

var packageFs = (_packageFs = {}, _defineProperty(_packageFs, 'index.js', SCRIPT_SCAFFOLDING), _defineProperty(_packageFs, 'package.json', PACKAGEJSON_SCAFFOLDING), _packageFs);

function deployPackage(name, packagePath) {
  var state, log, absolutePackagePath;
  return _regenerator2.default.wrap(function deployPackage$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (name) {
            _context4.next = 4;
            break;
          }

          _context4.next = 3;
          return (0, _erector.dialog)({
            message: 'Enter package name',
            type: 'input',
            required: true,
            validate: function validate(filename) {
              return PROJECT_TOOL_PACKAGE_REGEXP.test(filename) ? true : 'Invalid package name';
            }
          });

        case 3:
          name = _context4.sent;

        case 4:
          _context4.next = 6;
          return (0, _erector.assignState)({
            name: name
          });

        case 6:
          state = _context4.sent;
          _context4.next = 9;
          return (0, _erector.map)(packageFs, /*#__PURE__*/_regenerator2.default.mark(function _callee(scaffolding, filename) {
            var content, filepath;
            return _regenerator2.default.wrap(function _callee$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    content = "function" === typeof scaffolding ? scaffolding(state) : scaffolding;
                    filepath = _path2.default.join(packagePath, filename);
                    _context3.next = 4;
                    return (0, _erector.writeFileSafe)(filepath, content);

                  case 4:
                    if (!_context3.sent) {
                      _context3.next = 11;
                      break;
                    }

                    _context3.next = 7;
                    return _erector.echo.success(filepath + ' created');

                  case 7:
                    _context3.next = 9;
                    return true;

                  case 9:
                    _context3.next = 13;
                    break;

                  case 11:
                    _context3.next = 13;
                    return false;

                  case 13:
                  case 'end':
                    return _context3.stop();
                }
              }
            }, _callee, this);
          }));

        case 9:
          log = _context4.sent;

          if (!((0, _values2.default)(log).filter(isFalse).length === 0)) {
            _context4.next = 21;
            break;
          }

          if (state.noNpmInit) {
            _context4.next = 17;
            break;
          }

          _context4.next = 14;
          return (0, _erector.resolve)(packagePath);

        case 14:
          absolutePackagePath = _context4.sent;
          _context4.next = 17;
          return (0, _erector.spawn)('npm', ['init'], {
            cwd: absolutePackagePath
          });

        case 17:
          _context4.next = 19;
          return true;

        case 19:
          _context4.next = 25;
          break;

        case 21:
          _context4.next = 23;
          return _erector.echo.warn('Package is not created');

        case 23:
          _context4.next = 25;
          return false;

        case 25:
        case 'end':
          return _context4.stop();
      }
    }
  }, _marked3, this);
}

function deployProjectPackage(_ref3) {
  var moduleName = _ref3.moduleName;
  var packageName, packagePath;
  return _regenerator2.default.wrap(function deployProjectPackage$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          packageName = moduleName;

        case 1:
          if (!true) {
            _context5.next = 22;
            break;
          }

          if (packageName) {
            _context5.next = 6;
            break;
          }

          _context5.next = 5;
          return (0, _erector.dialog)({
            message: 'Enter package name',
            type: 'input',
            required: true,
            validate: function validate(filename) {
              return PROJECT_TOOL_PACKAGE_REGEXP.test(filename) ? true : 'Invalid package name';
            }
          });

        case 5:
          packageName = _context5.sent;

        case 6:
          packagePath = _path2.default.join('./__erector__', packageName);
          _context5.next = 9;
          return (0, _erector.pathExists)(packagePath);

        case 9:
          if (!_context5.sent) {
            _context5.next = 14;
            break;
          }

          _context5.next = 12;
          return _erector.echo.warn(packagePath + ' already exists');

        case 12:
          packageName = false;
          return _context5.abrupt('continue', 1);

        case 14:
          _context5.next = 16;
          return (0, _erector.createDir)(packagePath);

        case 16:
          _context5.next = 18;
          return deployPackage(packageName, packagePath);

        case 18:
          if (!_context5.sent) {
            _context5.next = 20;
            break;
          }

          return _context5.abrupt('break', 22);

        case 20:
          _context5.next = 1;
          break;

        case 22:
        case 'end':
          return _context5.stop();
      }
    }
  }, _marked4, this);
}

function getModuleType(state) {
  return _regenerator2.default.wrap(function getModuleType$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return (0, _erector.assignState)((0, _erector.dialog)({
            message: 'Select module type:',
            type: 'list',
            choices: [{
              name: 'Script',
              value: SCRIPT
            }, {
              name: 'Project helper',
              value: PROJECT_SCRIPT
            }, {
              name: 'Project helper package',
              value: PROJECT_PACKAGE
            }, {
              name: 'Package',
              value: PACKAGE
            }]
          }), function (moduleType) {
            return {
              moduleType: moduleType
            };
          });

        case 2:
        case 'end':
          return _context6.stop();
      }
    }
  }, _marked5, this);
}

function create(state) {
  return _regenerator2.default.wrap(function create$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.t0 = state.moduleType;
          _context7.next = _context7.t0 === SCRIPT ? 3 : _context7.t0 === PROJECT_SCRIPT ? 6 : _context7.t0 === PROJECT_PACKAGE ? 9 : _context7.t0 === PACKAGE ? 12 : 15;
          break;

        case 3:
          _context7.next = 5;
          return deployScript;

        case 5:
          return _context7.abrupt('break', 18);

        case 6:
          _context7.next = 8;
          return deployProjectScript;

        case 8:
          return _context7.abrupt('break', 18);

        case 9:
          _context7.next = 11;
          return deployProjectPackage;

        case 11:
          return _context7.abrupt('break', 18);

        case 12:
          _context7.next = 14;
          return deployPackage(state.moduleName, './');

        case 14:
          return _context7.abrupt('break', 18);

        case 15:
          _context7.next = 17;
          return _erector.echo.error('Unknown module type ' + state.moduleType);

        case 17:
          return _context7.abrupt('break', 18);

        case 18:
        case 'end':
          return _context7.stop();
      }
    }
  }, _marked6, this);
}

function mapArgsToState(args) {
  var moduleType = void 0;
  if (args.hasOwnProperty('e')) {
    if (args.hasOwnProperty('p')) {
      moduleType = PROJECT_PACKAGE;
    } else {
      moduleType = PROJECT_SCRIPT;
    }
  } else {
    if (args.hasOwnProperty('p')) {
      moduleType = PACKAGE;
    } else {
      moduleType = SCRIPT;
    }
  }
  return {
    moduleType: moduleType,
    noNpmInit: args.hasOwnProperty('npm-init'),
    moduleName: args._ && args._[1] || false
  };
}

function _callee2(args) {
  return _regenerator2.default.wrap(function _callee2$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return (0, _erector.assignState)(mapArgsToState(args));

        case 2:
          _context8.next = 4;
          return create;

        case 4:
        case 'end':
          return _context8.stop();
      }
    }
  }, _marked7, this);
}
module.exports = exports['default'];