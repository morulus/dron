var _ = require('lodash');
/**
 * UniqArray - Array that can`t takes a values which already have.
 *
 * @return {type}  description
 */
function UniqArray(defaultValues) {
  Array.constructor.call(this);
  if (defaultValues instanceof Array) {
    defaultValues.forEach(function(val) {
      this.push(val);
    }.bind(this));
  }
}

UniqArray.prototype = Object.create(Array.prototype, {
  concat: {
    writable: false,
    value: function() {
      return new UniqArray(_.uniq(Array.prototype.concat.apply(Array.from(this), Array.from(arguments))));
    }
  },
  push: {
    writable: false,
    value: function(item) {
      if (!~this.indexOf(item)) {
        return Array.prototype.push.apply(this, Array.from(arguments));
      } else {
        return this.length;
      }
    }
  }
});

module.exports = UniqArray;
