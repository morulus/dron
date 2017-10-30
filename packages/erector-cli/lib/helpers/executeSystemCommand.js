const ls = require('./../commands/ls.js');
const lsp = require('./../commands/lsp.js');
const location = require('./../commands/location.js');
const create = require('./../commands/create.js');
const init = require('./../commands/init.js');
const climb = require('./../commands/climb.js');

module.exports = function(app) {
  return function executeSystemCommand(state) {
    const command = state.command;
    const args = state.args;
    switch (command) {
      case 'ls':
        return ls();
      case 'lsp':
        return lsp();
      break;
      case 'loc':
        return location(args);
      break;
      // case 'create':
      //   return create();
      // break;
      case 'init':
        return init();
      break;
      case 'climb':
        return climb(args);
      break;
      default:
        return false;
      break;
    }
  };
}
