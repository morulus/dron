var fs = require('fs');
var ejs = require('ejs');
var path = require('path');

function retFalse() {
	return false;
}

function Unexisten() {
	this.exists = false;
}

Unexisten.prototype = {
	constructor: Unexisten,
	isFile: retFalse,
	isDirectory: retFalse
}

function FileCursor(workflow, fullname) {
	this.workflow = workflow;
	this.fullname = fullname;
	this.getStats();
	this.info = path.parse(fullname);
}

FileCursor.prototype = {
	constructor: FileCursor,
	/**
	 * Is file or folder exists
	 */
	exists: function() {
		return this.stats.exists;
	},
	/**
	 * Is directory
	 */
	isDirectory: function() {
		return this.stats.isDirectory();
	},
	/**
	 * Is file
	 */
	isDirectory: function() {
		return this.stats.isFile();
	},
	/**
	 * Returns directory name
	 */
	dirname: function() {
		return this.info.dir;
	},
	/**
	 * Returns extension name
	 */
	extname: function() {
		return this.info.ext;
	},
	/**
	 * Returns file basename
	 */
	basename: function() {
		return this.info.base;
	},
	/**
	 * Returns file name (without extension)
	 */
	name: function() {
		return this.info.name;
	},
	/**
	 * Returns file path
	 */
	path: function() {
		return this.fullname;
	},
	/**
	 * Alias for this.path
	 */
	resolve: function() {
		return this.path();
	},
	/**
	 * Returns file stats
	 * @return {[type]} [description]
	 */
	getStats: function() {
		try {
			this.stats = fs.statSync(this.fullname);
			this.stats.exists = true;
		} catch(e) {
			this.stats = new Unexisten(this.fullname);
		}
		return this.stats;
	},
	/**
	 * Read file contents
	 * @return {[string]}
	 */
	read: function() {
		return this.exists() ? fs.readFileSync(this.fullname, 'utf-8') : '';
	},
	/**
	 * Write file content
	 * @param  {[string]} content
	 */
	write: function(content) {
		if (!this.exists()) {
			var dr = this.workflow.touch(this.dirname());
			if (!dr.exists()) {
				dr.mkdir();
			}
		}
		var res = fs.writeFileSync(this.fullname, content, 'utf-8');
		this.getStats();
		return res;
	},
	/**
	 * Creates directory with at such path
	 */
	mkdir: function() {
	  if (this.exists()) {
	  	if (!this.stats.isDirectory()) {
	  		return false;
	  	} else {
	  		return this.fullname;
	  	}
	  }
	  var parts = this.fullname.split(path.sep),
		tpath;
	  for( var i = 1; i <= parts.length; i++ ) {
			tpath = '/'+path.join.apply(null, parts.slice(0, i));
	    if (!fs.existsSync(tpath)) {
				fs.mkdirSync(tpath);
			}
	  }
	},
	/**
	 * Write file content with confirmion on exists
	 * @param  {[string]} content
	 * @return {[Promise]}
	 */
	safeWrite: function(content) {
		return new Promise(function(resolve, reject) {

			if (this.exists()) {
				this.workflow.run('confirm', {
					question: 'Override file '+path.basename(this.fullname)+'?'
				})
				.then(function(a) {
					if (a) {
						this.write(content);
						resolve(true);
					} else {
						resolve(false);
					}
				}.bind(this))
				.catch(reject);
			} else {
				this.write(content);
				resolve(true);
			}
		}.bind(this));
	},
	/**
	 * Parse file content with ejs templater
	 * @param  {[object]} data
	 * @param  {[object]} options
	 * @return {[string]}
	 */
	ejs: function(data, options) {

		return ejs.render(this.read(), data||{}, options||{});
	},
	/**
	 * Requires file through NODE.js require function
	 */
	require: function() {
		return require(this.fullname);
	}
}

module.exports = FileCursor;
