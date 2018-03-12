const Game = function() {
  return {
    boardMatrix: [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    playerOneBoard: [],
    playerTwoBoard: [],
    ships: {
      ca: [[], [], [], [], []],
      ba: [[], [], [], []],
      cr: [[], [], []],
      de1: [[], []],
      de2: [[], []],
      su1: [[]],
      su2: [[]]
    },
    playerOneShips: {},
    playerTwoShips: {},
    initGame: function() {
      this.playerOneBoard = this.boardMatrix;
      this.playerTwoBoard = this.boardMatrix;
      this.playerOneShips = this.ships;
      this.playerTwoShips = this.ships;
    },
    selectRandomSquare: function() {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      return [x, y];
    },
    checkSquare: function(board, [x, y]) {
      return board[x][y] !== 0 ? true : false;
    },
    checkSquareSurround: function(board, [x, y]) {},
    checkSquareInDirection: function(board, [x, y], direction, ship) {
      for (let i = 0; i < ship.length; i++) {
        if (direction === 'x' && ship.length < 10 - x) {
          if (this.checkSquare(board, [x + i, y])) {
            return true;
          }
        } else if (direction === 'y' && ship.length < 10 - y) {
          if (this.checkSquare(board, [x, y + i])) {
            return true;
          }
        }
      }
      return false;
    },
    aiBoardSet: function() {
      const getStartSquare = function(that) {
        return that.selectRandomSquare();
      };
      const getDirection = function(that, ship) {
        const startSquare = getStartSquare(that);
        const direction = Math.floor(Math.random() * 2) === 0 ? 'x' : 'y';
        const notClearToPlace = that.checkSquareInDirection(
          that.playerTwoBoard,
          [...startSquare],
          direction,
          ship
        );
        if (notClearToPlace) {
          getDirection(that, ship);
        } else {
          console.log(startSquare);

          return [startSquare, direction];
        }
      };
      const placeShip = function(ship, [x, y], direction, shipName, that) {
        for (let i = 0; i < ship.length; i++) {
          if (direction === 'x') {
            ship[i].push(x + i, y);
            // console.log(x + i, y);

            that.playerTwoBoard[x + i][y] = 2;

            //console.log(shipName);
          } else {
            ship[i].push(x, y + i);
            that.playerTwoBoard[x][y + i] = 2;
          }
        }
      };

      for (const shipKey in this.playerTwoShips) {
        const ship = this.playerTwoShips[shipKey];
        const startAndDirection = getDirection(this, ship);
        // console.log(startAndDirection);

        // console.log(
        //   [...startAndDirection[0]],
        //   ship.length,
        //   startAndDirection[1]
        // );

        placeShip(
          ship,
          [...startAndDirection[0]],
          startAndDirection[1],
          shipKey,
          this
        );
      }
    }
  };
};
let newGame = new Game();
newGame.initGame();
newGame.aiBoardSet();
//consoleconsole.log(newGame);
