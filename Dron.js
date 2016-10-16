var path = require('path');
var requireg = require('requireg');
var Workspace = require('./lib/Workspace.js');
var chalk = require('chalk');
var npmPackageExpr = require('./lib/exprs.js').npmPackageExpr;
var spawn = require('cross-spawn');
var stream = require('stream');
// var stream = require('stream');
// var util = require('util');
// function EchoStream () { // step 2
//   stream.Writable.call(this);
// };
// util.inherits(EchoStream, stream.Writable); // step 1
// EchoStream.prototype._write = function (chunk, encoding, done) { // step 3
//   console.log(chunk.toString());
//   done();
// }
//
// var myStream = new EchoStream(); // instanciate your brand new stream
//
//

var slashrize= function(url) {
	url=url.replace(/\\/g, "/").replace('//', '/');
	if (url.substr(-1)!=='/') url+='/';
	return url;
}


/**
 * Collection of embedded modules
 */
const modules = {
	ensurePackage: require('./modules/ensurePackage.js'),
	installNpmPackages: require('./modules/installNpmPackages.js'),
	confirm: require('./modules/confirm.js'),
	message: require('./modules/message.js'),
	debug: require('./modules/debug.js'),
	prompt: require('./modules/prompt.js'),
	gitcommit: require('./modules/gitcommit.js'),
	init: require('./modules/init.js')
}

function preInstallDronPackage(packageName) {
	var writable = new stream.Writable({
	  write: function(chunk, encoding, next) {
	    console.log(chunk.toString());
	    next();
	  }
	});
	var result = spawn.sync('npm', ['install', packageName, '-g'], Object.assign({
			stdio: [process.stdin, 'pipe', "inherit"]
		}, {}));
	var response = result.stdout.toString('utf8');
	if (~response.indexOf('Registry returned 404')) {
		console.log(chalk.red('Package is not exists'));
		return false;
	} else {
		return true;
	}
	//console.log('result', result);
	//result.stdout.pipe(writable);
}

function Dron(process, argv) {
	// console.log(chalk.yellow('    *'));
	// console.log('   _|_');
	// console.log(('|_(')+chalk.blue('o')+' '+chalk.blue('o')+')_|');
	// console.log(('  | @ |'));
	// console.log(('   ---'));

	this.config = {
		showErrors: !!argv['show-errors']
	};
	this.process = process;
	this.package = require(path.join(__dirname, 'package.json'));
}

Dron.prototype = {
	constructor: Dron,
	usePackage: function(packageName, argv) {

		var dron = this.requirePackage(packageName);
		/**
		 * Valiate module
		 */
		if ("function"!==typeof dron) {
			console.log(chalk.red('Invalid module `'+packageName+'`. Make sure that module exports the function.'));
			process.exit(0);
		}

		if (!dron) {
			console.log(('Please, run command `npm i '+packageName+' -g`').green);
		} else {
			try {
				var workspace = new Workspace(this);
				return workspace.run(dron, argv);
			} catch(e) {
				if (this.config.showErrors){
					throw e;
				} else {
					console.log(chalk.red('Package '+packageName+' has runtime errors. Run `dron '+packageName+' --show-errors` for ditails.'));
				}
			}
		}
	},
	requirePackage: function(moduleName, forceConfig) {
		var config = "object"===typeof forceConfig ? Object.assign({}, this.config, forceConfig) : this.config;
		if (modules.hasOwnProperty(moduleName)) {
			return config.justResolve ? ':memory:' : modules[moduleName];
		}

		var packageName = npmPackageExpr.exec(moduleName) ? 'dron-'+moduleName : moduleName;

		try {
			return config.justResolve ? require.resolve(packageName) : require(packageName);
		} catch(e) {
			try {
				if (e.code=='MODULE_NOT_FOUND') {
					var localPath = path.join(process.cwd(), 'node_modules', packageName);
					var resolvePath = require.resolve(localPath);
					return config.justResolve ? resolvePath : require(resolvePath);
				} else {
					console.log(chalk.red('Error'), e);
				}
			} catch(e) {
				if (e.code=='MODULE_NOT_FOUND') {
					try {
						return config.justResolve ? requireg.resolve(packageName) : requireg(packageName);
					} catch(e) {
						if (e.code=='MODULE_NOT_FOUND'||~e.message.indexOf('Cannot find global module')) {
							console.log(chalk.blue('Package '+packageName+' is missed and package will be installed now.'));
							// Module is not exists. Lets try to install it.
							if (!config.lastTry&&preInstallDronPackage.call(this, packageName)) {
								return this.requirePackage(moduleName, Object.assign({}, forceConfig, {
									lastTry: true
								}));
							} else {
								process.exit(0);
							}
						} else {
							var shortPackageName = (packageName.split('/').pop());

							console.log(chalk.red('Package '+shortPackageName+' has an errors. Run `dron debug '+packageName+'` to find a problem.'));
							if (config.showErrors) {
								console.log(e.message, e.stack);
							}
							process.exit(0);
						}

					}
				} else {
					console.log('Error'.red, e);
				}
			}

		}
	}
}

module.exports = Dron;
