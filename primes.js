var _ = require('lodash');

var str = function(obj) {
  return obj + '';
};

var startsWith = function(haystack, needle) {
  return haystack.slice(0, needle.length) === needle;
};

var takeLowestStartingWith = function(numbers, n) {
  return _.find(numbers, function(num, i) {
    if (startsWith(str(num), str(n))) {
      numbers.splice(i, 1);
      return num;
    }
  });
};

var findN = function(primes, n) {
  var ret = str(n);
  while (ret.length < n) {
    ret += str(takeLowestStartingWith(primes, ret[ret.length - 1]))[1];
  }

  return ret;
};

var primes = _.range(10, 100).filter(
  function(n) {
    return _.range(2, n).every(
      function(d) {
        return (n % d) !== 0;
      });
  });

console.log(findN(primes, 9));