'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cliapp;

var _lodash = require('lodash.isPlainObject');

var _lodash2 = _interopRequireDefault(_lodash);

var _assignState = require('./assignState');

var _assignState2 = _interopRequireDefault(_assignState);

var _recycle = require('./recycle');

var _recycle2 = _interopRequireDefault(_recycle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cliapp(app) {
  if (!(0, _lodash2.default)(app)) {
    throw new Error('cliapp requires configuration of plain object');
  }
  var description = app.description,
      help = app.help,
      getInitialState = app.getInitialState,
      worker = app.worker;
  // Validate

  var typeOfDescription = typeof description;
  var typeOfHelp = typeof help;
  var typeOfGetInitialState = typeof getInitialState;
  var typeOfWorker = typeof worker;
  // Description
  if (typeOfDescription !== 'string' || description.length === 0) {
    throw new Error('cliapp expects app.descripton to be a string and non-empty');
  }
  // Description
  if (typeOfHelp !== 'string' || help.length === 0) {
    throw new Error('cliapp expects app.descripton to be a string and non-empty');
  }
  // getInitialState
  if (typeOfGetInitialState !== 'function') {
    throw new Error('cliapp expects getInitialState to be a function, ' + typeOfGetInitialState + ' given');
  }
  // typeOfWorker
  if (typeOfWorker !== 'function') {
    throw new Error('cliapp expects worker to be a function, ' + typeOfWorker + ' given');
  }
  var cliApplication = function* cliApplication(args) {
    var initialState = getInitialState(args);
    // Validate initial state
    if (!(0, _lodash2.default)(initialState)) {
      throw new Error('getInitialState must return plain object, ${typeof initialState} given');
    }
    // Assign initial state
    yield (0, _assignState2.default)(initialState);
    // Run
    yield (0, _recycle2.default)(worker);
  };
  cliApplication.help = help;
  cliApplication.description = description;
  return cliApplication;
}
module.exports = exports['default'];