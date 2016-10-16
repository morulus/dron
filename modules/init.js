var path = require('path');
var npmDronModuleExpr = require('./../lib/exprs.js').npmDronModuleExpr;

function camelize(txt) {
	return txt.replace(/-([\da-z])/gi, function( all, letter ) {
		return letter.toUpperCase();
	});
};

/**
 * Get name of current folder
 */
function getRootName() {
	return path.basename(this.touch('.').fullname);
}

/**
 * Create default files
 */
function createFiles(package) {
	var packageName = camelize(package.name);
	return function() {
		this.touch(package.main).write("/**\n Dron module `"+package.name+"`*\n*/\nfunction "+packageName+"() {\n\n}\n\nmodule.exports = function factory(argv) {\n	return "+packageName+";\n}");
		return [
			function() {
				return this.touch('README.md').safeWrite(package.name+"\n--\n\n");
			},
			function() {
				return this.touch('gitignore.md').safeWrite("node_modules");
			}
		];

		return true;
	}
	return true;
}

/**
 * Create minimal package.json
 */
function createPackageJson() {
	return function() {

		this.spawn('npm', ['init'], {
			stdio: [process.stdin, process.stdout, "inherit"]
		});
		/**
		 * Validate package name
		 */
		var package = this.touch('package.json').require();
		if (!npmDronModuleExpr.exec(package.name)) {
			this.warn('Invalid package name. Module name must begin with the prefix `dron-`.');
			return createPackageJson;
		} else {
			return createFiles(package);
		}
	}
}

/**
 * Deploy dron module
 */
function deployBoilerplate() {
	return function() {
		var packageFile = this.touch('package.json');
		var packageJson = {
			name: getRootName.call(this),
			version: "0.0.1",
			license: 'MIT',
			dron: {
				version: this.dron.package.version
			},
			description: '',
			keywords: ['dron','module']
		};

		if (!npmDronModuleExpr.exec(packageJson.name)) {
			delete packageJson.name;
		}
		packageFile.write(JSON.stringify(packageJson, null, 2));
		return createPackageJson;
	}
}

function checkPackageJson() {
	return function() {
		this.log('Check package.json');
		if (this.touch('package.json').exists()) {
			return this.run('confirm', {
				question: 'package.json already exists, override it?'
			})
			.then(function(answer) {

				if (answer) {
					return deployBoilerplate;
				} else {
					return false;
				}
			})
		} else {
			return deployBoilerplate;
		}
	}
}

module.exports = function() {
	return checkPackageJson;
}
