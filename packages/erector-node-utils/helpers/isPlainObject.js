module.exports = function isPlainObject(o) {
  return typeof o === 'object' && o.constructor === Object;
}
