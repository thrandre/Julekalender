var _ = require('lodash');

var dim = 10;

var board = Array.apply(null, Array(dim)).map(function() {
  return Array.apply(null, Array(dim)).map(function() {
    return false;
  });
});

var mapToSquareNumber = function(x, y) {
  return x * 10 + y;
};

var isBlack = function(x, y) {
  return board[x][y];
};

var toggleBlack = function(x, y) {
  board[x][y] = board[x][y] ? false : true;
};

var applyMove = function(position, move) {
  return {
    x: position.x + move.x,
    y: position.y + move.y
  };
};

var isLegalPosition = function(position) {
  return position.x >= 0 && position.x <= dim - 1 && position.y >= 0 && position.y <= dim - 1;
};

var getPossibleMoves = function(position) {
  var moves = [{
    x: 1,
    y: 2
  }, {
    x: 1,
    y: -2
  }, {
    x: -1,
    y: 2
  }, {
    x: -1,
    y: -2
  }, {
    x: 2,
    y: 1
  }, {
    x: 2,
    y: -1
  }, {
    x: -2,
    y: 1
  }, {
    x: -2,
    y: -1
  }];

  return moves
    .map(
      function(m) {
        return applyMove(position, m);
      })
    .filter(
      function(p) {
        return isLegalPosition(p);
      });
};

var selectMove = function(position) {
  var sortedMoves = _.sortBy(getPossibleMoves(position), function(move) {
    return mapToSquareNumber(move.x, move.y);
  });

  var sameColor = sortedMoves.filter(function(m) {
    return isBlack(position.x, position.y) === isBlack(m.x, m.y);
  });

  return sameColor.length > 0 ? _.first(sameColor) : _.last(sortedMoves);
};

var move = function(position, move) {
  toggleBlack(position.x, position.y);
  return move;
};

var position = {
  x: 0,
  y: 0
};

console.time();

for (var i = 0; i < 200; i++)
  position = move(position, selectMove(position));

var blacks = board.reduce(function(p, n) {
  return p + n.reduce(function(p, n) {
    return p + (n ? 1 : 0);
  }, 0);
}, 0);

console.timeEnd();
console.log(blacks);