var spawn = require('cross-spawn');
var util = require('util');
var path = require('path');
var chalk = require('chalk');

function ensurePackage() {
	return function() {
		var correct = true,
		packageJson;
		try {
		    packageJson = require(this.touch('package.json').fullname);
				if ("object"!==typeof packageJson) {
					this.warn('invalid package.json');
					correct = false;
				}
		} catch (e) {
			//this.warn('package.json not found');
			correct = false;
		}
		return new Promise(function(resolve, reject) {
			(correct ? Promise.resolve(true) : this.run('confirm', {
				question: 'Package.json is not exists. Do you want to create it?'
			}))
			.then(function(answer) {
				if (!answer) {
					resolve(false);
				} else {
						if (!correct) {
							var peers = [],
					  	output = spawn.sync("npm", ["init"], {
					      stdio: [process.stdin, process.stdout, "inherit"]
					    });
					    try {
					    	var newPackageJson = require(require.resolve(this.touch('package.json').fullname));
					    	console.log(chalk.green('Package.json successfully created'));
					    	resolve(newPackageJson);
					    } catch(e) {
					    	resolve(false);
					    }
						} else {
							resolve(packageJson);
						}
				}
			})
			.catch(reject);
		}.bind(this));
	}
}

module.exports = function() {
	return ensurePackage;
}
