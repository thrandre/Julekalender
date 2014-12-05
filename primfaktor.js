var _ = require('lodash');

var permute = function(items, item, perm, used, perms) {
  for (var i = 0; i < items.length; ++i) {
    if (!used[i]) {
      used[i] = true;
      perm[item] = items[i];
      if (item < (items.length - 1)) {
        permute(items, item + 1, perm, used, perms);
      } else {
        perms.push(Array.prototype.slice.call(perm, 0));
      }
      used[i] = false;
    }
  }
};

var primeFactorization = function(num) {
  var root = Math.sqrt(num),
    result = arguments[1] || [],
    x = 2;

  if (num % x) {
    x = 3;
    while ((num % x) && ((x = x + 2) < root)) {}
  }

  x = (x <= root) ? x : num;

  result.push(x);

  return (x === num) ? result : primeFactorization(num / x, result);
};

var perms = [];

console.time();

permute([1, 2, 3, 4, 5, 6, 7, 8, 9], 0, Array(2), Array(2), perms);

var smallestOfThelargeFactors = _.min(perms.map(function(p) {
  return _.max(primeFactorization(parseInt(p.join(''))));
}));

console.timeEnd();
console.log(smallestOfThelargeFactors);