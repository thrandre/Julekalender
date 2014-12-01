var isPalindrome = function(digitStr) {
  return digitStr === digitStr.split('').reverse().join('');
};

var toBase8Str = function(number) {
  return number.toString('8');
};

var count = 0;

for (var i = 1; i < 1000000; i++) {
  var base10 = i + '';
  var base8 = toBase8Str(i);
  if (isPalindrome(base10) && isPalindrome(base8)) {
    count++;
    console.log(base10 + ' && ' + base8);
  }
}

console.log(count);
