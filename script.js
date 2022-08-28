const tiles = document.querySelectorAll(".tile");
const status = document.querySelector("#status");

const Board = function() {
  const gameboard = [];
  
  const clear = function() {
    gameboard.splice(0, gameboard.length);
    [...tiles].forEach((tile) => {
      tile.className = "tile";
      tile.addEventListener('click', tileListener)
    })
    status.textContent = "X goes first!"
  }
  
  const isFull = function() {
    for (let i = 0; i < 9; i++) {
      if (!getTile(i)) {
        return false;
      }
    }
    return true;
  }
  
  const tileListener = function(e) {
    g.playTurn(parseInt(e.currentTarget.id));
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
    tiles[t].classList.add(val);
    tiles[t].removeEventListener('click', tileListener);
  }

  return {clear, isFull, getTile, setTile};
}();

const Game = function() {
  Board.clear();
  const players = ["x", "o"];
  
  let turn = 0;
  
  const whoseTurn = function() {
    return players[turn % 2];
  }
  
  const playTurn = function(pos) {
    if (over()) {
      throw `game is over, ${over()} won`;
    }
    Board.setTile(pos, players[turn % 2]);
    turn += 1;
    if (!over()) {
      status.textContent = `${whoseTurn().toUpperCase()}, it's your turn!`;
    }
  }
  
  const over = function() {
    const winStates = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                       [0, 3, 6], [1, 4, 7], [2, 5, 8],
                       [0, 4, 8], [2, 4, 6]];
    for (const state of winStates) {
      if (Board.getTile(state[0]) === Board.getTile(state[1]) &&
        Board.getTile(state[1]) === Board.getTile(state[2])) {
        let winner = Board.getTile(state[0]);
        if (winner) {
          status.textContent = `${winner.toUpperCase()} wins!`;
          newGame();
        }
        return winner;
      }
      if (Board.isFull()) {
        status.textContent = 'Draw!';
        newGame();
        return 'no one';
      }
    }
  }
  
  const newGame = function() {
    let newGame = document.createElement('button');
    newGame.textContent = "New game?";
    newGame.id = "new-game";
    newGame.addEventListener('click', () => {
      g = Game();
    });
    status.appendChild(newGame);
  }

  return {whoseTurn, playTurn, over};
}

g = Game();
