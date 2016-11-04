"use strict";

var isPromise = require('./isPromise.js');
var path = require('path');
var FileCursor = require('./FileCursor');
var chalk = require('chalk');
var spawn = require('cross-spawn');
var lodash = require('lodash');
var UniqArray = require('./UniqArray.js');
require('./promiseAllChain.js');



function Workspace(cli) {
	this.cli = cli; // DEPRECATED
	this.dron = cli;
	this.runCounts = 0;
	this._ = lodash;
	this.UniqArray = UniqArray;
}

Workspace.prototype = {
	constructor: Workspace,
	run: function(subject, props) {
		return Promise.resolve(subject).then(function(subject) {
			if ("string"===typeof subject) {
				return this.dron.usePackage(subject, props);
			} else if (subject instanceof Array) {
				return Promise.allChain(subject.map(function(subject) {
					return function(props) { return this.run(subject, props); }.bind(this)
				}.bind(this)), props);
			} else if (isPromise(subject)) {
				var promise = subject
				.then(this.run.bind(this));
				promise.catch(this.run.bind(this));
				return promise;
			} else if ("function"===typeof subject) {
				var preProcessors = [];
				// Function default props
				if (subject.hasOwnProperty('defaultProps') && subject.defaultProps) {
					preProcessors.push(Promise.resolve("function"===typeof subject.defaultProps ? subject.defaultProps.call(this, props) : subject.defaultProps));
				}
				// Push origin props
				preProcessors.push(Promise.resolve(props));
				// Function prompt
				if (subject.hasOwnProperty('prompt') && subject.prompt) {
					preProcessors.push(this.run('prompt', {
						questions: "function"===typeof subject.prompt ? subject.prompt.call(this, props) : subject.prompt
					}).then(function(answers) {
						return answers;
					}));
				};

				return Promise.all(preProcessors)
				.then(function(originalProps, propsMixins) {
					let mixedProps = Object.assign.apply(Object, [{}].concat(propsMixins));
					return this.run(subject.call(this, mixedProps), mixedProps);
				}.bind(this, props));

			} else if ("boolean"===typeof subject) {
				if (subject) {
					return Promise.resolve(true);
				} else {
					return Promise.resolve(false);
				}
			} else if (subject instanceof Error) {
				console.log(chalk.red('Aborted by error'), e);
				throw subject;
			} else if (subject===null) {
				this.log('Aborted');
				process.exit(0);
			} else if (subject===undefined) {
				this.warn('An installer returns nothing. For ditails see: httpы://github.com/morulus/dron/docs/errors/returnsNothing.md');
				Promise.reject(null);
			} else {
				return Promise.resolve(subject);
			}
		}.bind(this));
	},
	touch: function(relatedFile) {
		var realFilename = path.resolve(this.dron.process.cwd(), relatedFile);
		return new FileCursor(this, realFilename);
	},
	/**
	 * Display a text in command line
	 */
	log: function() {
		console.log(chalk.gray(Array.from(arguments).filter(function(v) {
			return "string"===typeof v||"number"===typeof v;
		}).join(" ")));
	},
	/**
	 * Display a text in command line
	 */
	message: function() {
		console.log(chalk.bold(Array.from(arguments).filter(function(v) {
			return "string"===typeof v||"number"===typeof v;
		}).join(" ")));
	},
	/**
	 * Display a warning in command line
	 */
	warn: function() {
		console.log(chalk.red(Array.from(arguments).filter(function(v) {
			return "string"===typeof v||"number"===typeof v;
		}).join(" ")));
	},
	/**
	 * Spawns a new sync process
	 * @param  {[string]} command
	 * @param  {[Array]} args
	 * @param  {[object]} options
	 * @return {Promise}
	 */
	spawn: function(command, args, options) {
		var result = spawn.sync(command, args, Object.assign({
	      stdio: [process.stdin, process.stdout, "inherit"]
	    }, options||{}));
	    return result;
	}
}

module.exports = Workspace;
