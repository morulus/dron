const path = require('path');
const resolveModuleLocation = require('erector-node-utils/resolveModuleLocation.js');
const cutArgsCommands = require('./cutArgsCommands.js');

module.exports = function preapreResolveModule(app) {
  return function resolveModule(state) {
    const command = state.command;
    const args = state.args;
    return resolveModuleLocation(command, process.cwd(), {
      paths: [path.resolve(__dirname, '../erector-base-scripts')],
    }).then(function(filename) {
      return app.run(filename, cutArgsCommands(args), {
        autoinstall: false
      });
    })
  };
};
