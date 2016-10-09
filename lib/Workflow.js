var isPromise = require('./isPromise.js');
var path = require('path');
var FileRef = require('./FileRef');
var chalk = require('chalk');
var spawn = require('cross-spawn');
var lodash = require('lodash');
var UniqArray = require('./UniqArray.js');
require('./promiseAllChain.js');

function Workflow(cli) {
	this.cli = cli; // DEPRECATED
	this.dron = cli;
	this.runCounts = 0;
	this._ = lodash;
	this.UniqArray = UniqArray;
}

Workflow.prototype = {
	constructor: Workflow,
	run: function(subject, args) {

		return Promise.resolve(subject).then(function(subject) {
			//process.stdout.write('.');
			if ("string"===typeof subject) {
				return this.dron.usePackage(subject, args);
			} else if (subject instanceof Array) {
				return Promise.allChain(subject.map(function(subject) {
					return function() { return this.run(subject); }.bind(this)
				}.bind(this)))
			} else if (isPromise(subject)) {
				var promise = subject
				.then(this.run.bind(this));
				promise.catch(this.run.bind(this));
				return promise;
			} else if ("function"===typeof subject) {
				if (subject.hasOwnProperty('prompt')) {
					return this.run('prompt', {
						questions: "function"===typeof subject.prompt ? subject.prompt.call(this) : subject.prompt
					}).then(function() {
						return this.run(subject.apply(this, Array.from(arguments)));
					}.bind(this));
				} else {
					return this.run(subject.call(this, args));
				}
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
				this.warn('An installer returns nothing. For ditails see: http://morulus.github.io/dron/docs/errors/returnsNothing.md');
				Promise.reject(null);
			} else {
				return Promise.resolve(subject);
			}
		}.bind(this));
	},
	touch: function(relatedFile) {
		var realFilename = path.resolve(this.dron.process.cwd(), relatedFile);
		return new FileRef(this, realFilename);
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

module.exports = Workflow;
