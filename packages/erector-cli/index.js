#! /usr/bin/env node
// -*- js -*-
"use strict";
const os = require('os');
const fs = require('fs');
const path = require('path');
const erector = require("erector-core");
const args = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const uuid4 = require('uuid4');
const resolvePackage = require('erector-node-utils/resolvePackage');
const isFileSync = require('erector-node-utils/isFileSync');
const exec = require('child_process').exec;
const sideeffects = require('./lib/sideeffects.js');
const middlewares = require('./lib/middlewares.js');
const executeSystemCommand = require('./lib/helpers/executeSystemCommand.js');
const tillMatchAsync = require('./lib/helpers/tillMatchAsync.js');
const resolveGist = require('./lib/helpers/resolveGist.js');
const resolveModule = require('./lib/helpers/resolveModule.js');
const cutArgsCommands = require('./lib/helpers/cutArgsCommands.js');
const inspector = require('./inspector');

function echoError(e) {
  const message = e.message;
  const stack = e.stack;
  console.log(chalk.bgYellow.black.bold('Erector caught'+e.name)
    + "\n\n"
    + chalk.bgYellow.black.bold('Location:') + ' ' + chalk.inverse(' '+message));
  let hint = inspector(message, stack);
  console.log(hint ? hint : chalk.dim(stack.substr(stack.indexOf(message)+message.length)));
  process.exit(1);
}

function pushError(payload) {
  if (payload instanceof Error) {
    throw payload;
  }
  return payload;
}

function values(obj) {
  return Object.keys(obj).map(key => obj[key]);
}

const app = erector();
app.use(erector.pwd(process.env.PWD || process.cwd()));
app.use(erector.sideeffect(sideeffects))
app.use(erector.middleware(middlewares));
Promise.resolve({
  command: args._[0],
  args,
})
.then(
  tillMatchAsync(
    executeSystemCommand(app),
    resolveGist(app),
    resolveModule(app),
  )
)
.catch(function(e) {
  echoError(e);
});
