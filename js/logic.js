const Game = function() {
  return {
    playerOneBoard: [
      ['', '', '', '', '', '', '', '', '', '', ''],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    playerTwoBoard: [
      ['', '', '', '', '', '', '', '', '', '', ''],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],

    playerOneShips: {
      ca: [[], [], [], [], []],
      ba: [[], [], [], []],
      cr: [[], [], []],
      de1: [[], []],
      de2: [[], []],
      su1: [[]],
      su2: [[]]
    },
    playerTwoShips: {
      ca: [[], [], [], [], []],
      ba: [[], [], [], []],
      cr: [[], [], []],
      de1: [[], []],
      de2: [[], []],
      su1: [[]],
      su2: [[]]
    },

    selectRandomSquare: function() {
      const x = Math.floor(Math.random() * 10) + 1;
      const y = Math.floor(Math.random() * 10) + 1;
      return [x, y];
    },
    checkSquare: function(board, [x, y]) {
      return board[x][y] ? true : false;
    },
    checkAdjacentSquares: function(board, [x, y]) {
      x = +x;
      y = +y;
      const up = this.checkSquare(board, [x, y - 1]);
      const down = this.checkSquare(board, [x, y + 1]);
      const left = this.checkSquare(board, [x - 1, y]);
      const right = this.checkSquare(board, [x + 1, y]);
      if (up || down || left || right) {
        return true;
      } else {
        return false;
      }
    },
    checkSquareInDirection: function(board, [x, y], direction, ship) {
      for (let i = 0; i < ship.length; i++) {
        if (
          direction === 'x' &&
          ship.length < 10 - y &&
          this.checkSquare(board, [x, y + i])
        ) {
          return true;
        } else if (
          direction === 'y' &&
          ship.length < 10 - x &&
          this.checkSquare(board, [x + i, y])
        ) {
          return true;
        }
      }
      return false;
    },
    setAiBoard: function() {
      const setStartSquare = function(that, ship, shipName) {
        let square = that.selectRandomSquare();
        let direction = Math.round(Math.random() * 1) === 0 ? 'x' : 'y';
        while (
          that.checkSquareInDirection(
            that.playerTwoBoard,
            [...square],
            direction,
            ship
          )
        ) {
          square = that.selectRandomSquare();
        }

        if (direction === 'x' && ship.length < 10 - square[1]) {
          for (let i = 0; i < ship.length; i++) {
            that.playerTwoBoard[square[0]][square[1] + i] = shipName;
          }
        } else if (direction === 'y' && ship.length < 10 - square[0]) {
          for (let i = 0; i < ship.length; i++) {
            that.playerTwoBoard[square[0] + i][square[1]] = shipName;
          }
        } else {
          setStartSquare(that, ship, shipName);
        }
      };
      for (const shipKey in this.playerTwoShips) {
        const ship = this.playerTwoShips[shipKey];

        setStartSquare(this, ship, shipKey);
      }
    }
  };
};
