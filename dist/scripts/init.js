'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _packageFs;

exports.default = function* (args) {
  yield (0, _erector.assignState)(mapArgsToState(args));
  yield create;
};

var _erector = require('erector');

var _selectors = require('erector/selectors');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  return JSON.stringify({
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

function* deployScript(_ref) {
  var moduleName = _ref.moduleName;

  var filename = nameToJsFilename(moduleName);
  while (true) {
    if (!filename) {
      filename = yield (0, _erector.dialog)({
        message: 'Enter file name',
        type: 'input',
        required: true,
        validate: function validate(filename) {
          return JS_FILE_REGEXP.test(filename) ? true : 'Filename must have .js extension';
        }
      });
    }
    if (yield (0, _erector.writeFileSafe)(filename, SCRIPT_SCAFFOLDING)) {
      yield _erector.echo.success(filename + ' created');
      filename = false;
      break;
    }
  }
}

function* deployProjectScript(_ref2) {
  var moduleName = _ref2.moduleName;

  var filename = nameToJsFilename(moduleName);
  while (true) {
    if (!filename) {
      filename = yield (0, _erector.dialog)({
        message: 'Enter file name',
        type: 'input',
        required: true,
        validate: function validate(filename) {
          return JS_FILE_REGEXP.test(filename) ? true : 'Filename must have .js extension';
        }
      });
    }
    yield (0, _erector.createDir)('./__erector__');
    var filepath = _path2.default.join('./__erector__', filename);
    if (yield (0, _erector.writeFileSafe)(filepath, SCRIPT_SCAFFOLDING)) {
      yield _erector.echo.success(filepath + ' created');
      filename = false;
      break;
    }
  }
}

var packageFs = (_packageFs = {}, _defineProperty(_packageFs, 'index.js', SCRIPT_SCAFFOLDING), _defineProperty(_packageFs, 'package.json', PACKAGEJSON_SCAFFOLDING), _packageFs);

function* deployPackage(name, packagePath) {
  if (!name) {
    name = yield (0, _erector.dialog)({
      message: 'Enter package name',
      type: 'input',
      required: true,
      validate: function validate(filename) {
        return PROJECT_TOOL_PACKAGE_REGEXP.test(filename) ? true : 'Invalid package name';
      }
    });
  }
  var state = yield (0, _erector.assignState)({
    name: name
  });
  var log = yield (0, _erector.map)(packageFs, function* (scaffolding, filename) {
    var content = "function" === typeof scaffolding ? scaffolding(state) : scaffolding;
    var filepath = _path2.default.join(packagePath, filename);
    if (yield (0, _erector.writeFileSafe)(filepath, content)) {
      yield _erector.echo.success(filepath + ' created');
      yield true;
    } else {
      yield false;
    }
  });
  if (Object.values(log).filter(isFalse).length === 0) {
    if (!state.noNpmInit) {
      var absolutePackagePath = yield (0, _erector.resolve)(packagePath);
      yield (0, _erector.spawn)('npm', ['init'], {
        cwd: absolutePackagePath
      });
    }
    yield true;
  } else {
    yield _erector.echo.warn('Package is not created');
    yield false;
  }
}

function* deployProjectPackage(_ref3) {
  var moduleName = _ref3.moduleName;

  var packageName = moduleName;
  while (true) {
    if (!packageName) {
      packageName = yield (0, _erector.dialog)({
        message: 'Enter package name',
        type: 'input',
        required: true,
        validate: function validate(filename) {
          return PROJECT_TOOL_PACKAGE_REGEXP.test(filename) ? true : 'Invalid package name';
        }
      });
    }
    var packagePath = _path2.default.join('./__erector__', packageName);
    if (yield (0, _erector.pathExists)(packagePath)) {
      yield _erector.echo.warn(packagePath + ' already exists');
      packageName = false;
      continue;
    }
    yield (0, _erector.createDir)(packagePath);
    if (yield deployPackage(packageName, packagePath)) {
      break;
    }
  }
}

function* getModuleType(state) {
  yield (0, _erector.assignState)((0, _erector.dialog)({
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
}

function* create(state) {
  switch (state.moduleType) {
    case SCRIPT:
      yield deployScript;
      break;
    case PROJECT_SCRIPT:
      yield deployProjectScript;
      break;
    case PROJECT_PACKAGE:
      yield deployProjectPackage;
      break;
    case PACKAGE:
      yield deployPackage(state.moduleName, './');
      break;
    default:
      yield _erector.echo.error('Unknown module type ' + state.moduleType);
      break;
  }
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

module.exports = exports['default'];