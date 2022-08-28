const Board = function() {
  const gameboard = [];
  
  const clear = function() {
    gameboard.splice(0, gameboard.length);
  }

  const inRange = function(t) {
    return t >= 0 && t < 9;
  };

  const getTile = function(t) {
    if (!inRange(t)) {
      throw `tile ${t} out of bounds`;
    }
    return gameboard[t];
  };

  const setTile = function(t, val) {
    if (!inRange(t)) {
      throw `tile ${t} out of bounds`;
    } else if (gameboard[t] != undefined) {
      throw `tile ${t} has already been played`;
    }
    gameboard[t] = val;
  }

  const checkWin = function() {
    const winStates = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                       [0, 3, 6], [1, 4, 7], [2, 5, 8],
                       [0, 4, 8], [2, 4, 6]];
    for (const state of winStates) {
      if (gameboard[state[0]] === gameboard[state[1]] &&
        gameboard[state[1]] === gameboard[state[2]]) {
        return gameboard[state[0]];
      }
    }
  }

  return {clear, getTile, setTile, checkWin};
}();

const Player = function(side) {
  const playTurn = function(pos) {
    Board.setTile(pos, side);
  }
  
  const getSide = function() {
    return side;
  }
  
  return {playTurn, getSide}
}

const Game = function() {
  Board.clear();
  const players = [Player("x"), Player("y")];
  
  let turn = 0;
  
  const whoseTurn = function() {
    return players[turn % 2];
  }
  
  const playTurn = function(pos) {
    if (gameOver()) {
      throw `game is over, ${Board.checkWin()} won`
    }
    players[turn % 2].playTurn(pos);
  }
  
  const gameOver = function() {
    return Board.checkWin() ? true : false;
  }
  
  return {whoseTurn, playTurn, gameOver};
}
