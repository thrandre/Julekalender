var isPalindrome = function(digitStr) {
  var length = digitStr.length,
    firstChunk,
    secondChunk;

  if (length === 1)
    return true;

  firstChunk = digitStr.substr(0, Math.floor(length / 2));
  secondChunk = digitStr.substr(Math.floor(length / 2) + (length % 2), Math.floor(length / 2)).split('').reverse().join('');

  return firstChunk === secondChunk;
};

var toBase8Str = function(number) {
  return number.toString('8');
};

var count = 0;

for (var i = 1; i < 1000000; i++) {
  if (isPalindrome(i + '') && isPalindrome(toBase8Str(i))) {
    count++;
    console.log(i + ' && ' + toBase8Str(i));
  }
}

console.log(count);