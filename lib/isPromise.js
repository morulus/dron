module.exports = function isPromise(o) {
	return o!==null&&"object"===typeof o&&"function"===typeof o.then&&"function"===typeof o['catch'];
}