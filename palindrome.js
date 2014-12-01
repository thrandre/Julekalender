var isPalindrome = function(digitStr) {
  var len = digitStr.length,
    chunkLen = Math.floor(length / 2),
    firstChunk,
    secondChunk;

  if (len === 1)
    return true;

  firstChunk = digitStr.substr(0, chunkLen);
  secondChunk = digitStr.substr(chunkLen + (length % 2), chunkLen).split('').reverse().join('');

  return firstChunk === secondChunk;
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
