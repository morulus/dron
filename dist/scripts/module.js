'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.build = build;
exports.default = entry;

var _erector = require('erector');

var DEFAULT_SRC = './src/index.js';
var DEFAULT_OUTPUT = './index.js';

function mapArgsToState(args) {
  return {
    entry: args.entry || false,
    output: args.output || false
  };
}

function* build(state) {
  try {
    var _packageJson = yield (0, _erector.readJson)('./package.json');
  } catch (e) {
    yield _erector.echo.error('No package.json found');
  }
  if (!state.entry) {
    yield (0, _erector.assignState)({
      entry: typeof packageJson.src === 'string' ? packageJson.src : DEFAULT_SRC
    });
  }

  if (!state.output) {
    yield (0, _erector.assignState)({
      output: typeof packageJson.main === 'string' ? packageJson.main : DEFAULT_OUTPUT
    });
  }
}

function* help() {
  yield _erector.echo.note('Usage: erect module <command>');
  yield _erector.echo.note('Commands:');
  yield _erector.echo.note(' - build');
}

function* entry(args) {
  yield (0, _erector.assignState)(mapArgsToState(args));
  if (args._ && args._[1]) {
    switch (args._[1]) {
      case 'build':
        yield build;
        break;
      default:
        yield help;
        break;
    }
  } else {
    yield help;
  }
}