var isPromise = require('./isPromise.js');
var path = require('path');
var FileRef = require('./FileRef');
var chalk = require('chalk');
var spawn = require('cross-spawn');

function Workflow(cli) {
	this.cli = cli; // DEPRECATED
	this.dron = cli;
	this.runCounts = 0;
}

Workflow.prototype = {
	constructor: Workflow,
	run: function(subject, args) {
		
		return Promise.resolve(subject).then(function(subject) {
			//process.stdout.write('.');
			if ("string"===typeof subject) {
				return this.dron.usePackage(subject, args);
			} else if (isPromise(subject)) {
				var promise = subject
				.then(this.run.bind(this));
				promise.catch(this.run.bind(this));
				return promise;
			} else if ("function"===typeof subject) {
				return this.run(subject.call(this, args));
			} else if ("boolean"===typeof subject) {
				if (subject) {
					return Promise.resolve(true);
				} else {
					return Promise.resolve(false);
				}
			} else if (subject instanceof Error) {
				console.log(chalk.red('Aborted by error'), e);
				throw subject;
			} else if (subject==null) {
				//console.log(chalk.red('Aborted'));
				process.exit(0);
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
