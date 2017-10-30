const path = require('path');
const erector = require("erector");
const args = require('minimist')(process.argv.slice(2));
const sideeffects = require('../sideeffects.js');
const middlewares = require('../middlewares.js');

module.exports = function create() {
  const app = erector();
  app.use(erector.pwd(process.env.PWD || process.cwd()));
  app.use(erector.sideeffect(sideeffects));
  app.use(erector.middleware(middlewares));
  app.run(path.resolve(__dirname, '../scripts/init/index.js'), args)
  .catch(function(e) {
    throw e;
  });
}
