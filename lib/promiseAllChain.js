Promise.allChain = function(promises) {
  return new Promise(function(resolve, reject) {
    var results = [];
    var iterator = promises[Symbol.iterator]();
    var next = function() {
      var item = iterator.next();
      if (item.done) {
        resolve(results);
        return;
      };
      ("function"===typeof item.value ?
      item.value() : item.value)
      .then(function(val) {
        results.push(val);
        next();

      })
      .catch(function(e) {
        reject(e);
      });
    }
    next();
  });
}
