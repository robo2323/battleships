import $ from '../utils/$';

export default function() {
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
      Carrier: { hits: [], strength: 5 },
      Battleship: { hits: [], strength: 4 },
      Cruiser: { hits: [], strength: 3 },
      Destroyer_One: { hits: [], strength: 2 },
      Destroyer_Two: { hits: [], strength: 2 },
      Sub_One: { hits: [], strength: 1 },
      Sub_Two: { hits: [], strength: 1 }
    },
    playerTwoShips: {
      Carrier: { hits: [], strength: 5 },
      Battleship: { hits: [], strength: 4 },
      Cruiser: { hits: [], strength: 3 },
      Destroyer_One: { hits: [], strength: 2 },
      Destroyer_Two: { hits: [], strength: 2 },
      Sub_One: { hits: [], strength: 1 },
      Sub_Two: { hits: [], strength: 1 }
    },

    selectRandomSquare: function() {
      const x = Math.floor(Math.random() * 10) + 1;
      const y = Math.floor(Math.random() * 10) + 1;
      return [x, y];
    },
    checkSquare: function(board, [x, y]) {
      x = +x;
      y = +y;

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
      x = +x;
      y = +y;
      for (let i = 0; i < ship.strength; i++) {
        if (
          direction === false &&
          ship.strength < 10 - y &&
          this.checkSquare(board, [x, y + i])
        ) {
          return true;
        } else if (
          direction === true &&
          ship.strength < 10 - x &&
          this.checkSquare(board, [x + i, y])
        ) {
          return true;
        }
      }
      return false;
    },

    resetBoard: function(board) {
      for (let i = 1; i < 11; i++) {
        for (let c = 1; c < 11; c++) {
          this[board][i][c] = 0;
        }
      }
    },
    setBoard: function(board = 'playerTwoBoard', ships = 'playerTwoShips') {
      this.resetBoard(board);

      const setStartSquare = function(that, ship, shipName) {
        let square = that.selectRandomSquare();
        let direction = Math.round(Math.random() * 1) === 0 ? false : true;
        while (
          that.checkSquareInDirection(that[board], [...square], direction, ship)
        ) {
          square = that.selectRandomSquare();
        }

        if (direction === false && ship.strength < 10 - square[1]) {
          for (let i = 0; i < ship.strength; i++) {
            that[board][square[0]][square[1] + i] = shipName;
          }
        } else if (direction === true && ship.strength < 10 - square[0]) {
          for (let i = 0; i < ship.strength; i++) {
            that[board][square[0] + i][square[1]] = shipName;
          }
        } else {
          setStartSquare(that, ship, shipName);
        }
      };
      for (const shipKey in this[ships]) {
        const ship = this[ships][shipKey];

        setStartSquare(this, ship, shipKey, board, ships);
      }
    },
    aiTurn: function() {
      let square = this.selectRandomSquare();

      return square;
    }
  };
}
