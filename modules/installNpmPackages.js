var spawn = require('cross-spawn');
var util = require('util');
var _ = require('lodash');

function spawnNpmInstallDependencies(isDev, dependencies, options) {
	var argsPairs = _.toPairs(options.args||{}).map(function(v, key) {
		return key+("string"===typeof v ? (' '+v) : '');
	});

	if (options.save) {
		argsPairs.push('--save'+(isDev ? '-dev': ''));
	}

	output = spawn.sync("npm", (["install"]).concat(dependencies).concat(argsPairs), {
      stdio: ["ignore", "pipe", "inherit"]
    });
}

module.exports = function(options) {
	return function() {
		if (options.dependencies) {
			spawnNpmInstallDependencies(false, options.dependencies, options);
		}

		if (options.devDependencies) {
			spawnNpmInstallDependencies(true, options.devDependencies, options);
		}
		
		return true;
	}
}
