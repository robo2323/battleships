import $ from '../utils/$';
import brain from './brain';

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
    pOneStyles: [],
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
    pTwoStyles: [],
    playerOneShips: {
      Carrier: { display: ['<=', '=', '=', '=', '=]'], hits: [], strength: 5 },
      Battleship: { display: ['<<', '[]', '[]', '>>'], hits: [], strength: 4 },
      Cruiser: { display: ['<<', '[]', '>>'], hits: [], strength: 3 },
      Destroyer_One: { display: ['<[', ']>'], hits: [], strength: 2 },
      Destroyer_Two: { display: ['<[', ']>'], hits: [], strength: 2 },
      Sub_One: { display: ['<^'], hits: [], strength: 1 },
      Sub_Two: { display: ['<^'], hits: [], strength: 1 }
    },
    playerTwoShips: {
      Carrier: { display: ['<=', '=', '=', '=', '=]'], hits: [], strength: 5 },
      Battleship: { display: ['<<', '[]', '[]', '>>'], hits: [], strength: 4 },
      Cruiser: { display: ['<<', '[]', '>>'], hits: [], strength: 3 },
      Destroyer_One: { display: ['<[', ']>'], hits: [], strength: 2 },
      Destroyer_Two: { display: ['<[', ']>'], hits: [], strength: 2 },
      Sub_One: { display: ['<^'], hits: [], strength: 1 },
      Sub_Two: { display: ['<^'], hits: [], strength: 1 }
    },

    selectRandomSquare: function() {
      const x = Math.floor(Math.random() * 10) + 1;
      const y = Math.floor(Math.random() * 10) + 1;
      return [x, y];
    },
    checkSquare: function(board, [x, y]) {
      x = +x;
      y = +y;
      return this[board][x][y];
    },
    checkAdjacentSquares: function(
      board = 'playerOneBoard',
      [x, y],
      direction
    ) {
      x = +x;
      y = +y;
      switch (direction) {
      case 0:
        return [x, y - 1];
      case 1:
        return [x, y + 1];
      case 2:
        return [x - 1, y];
      case 3:
        return [x + 1, y];
      }
    },
    checkSquareInDirection: function(board, [x, y], direction, ships, ship) {
      x = +x;
      y = +y;
      const shipStrength = this[ships][ship].strength;
      for (let i = 0; i < shipStrength; i++) {
        if (
          direction === false &&
          shipStrength < 10 - y &&
          this.checkSquare(board, [x, y + i])
        ) {
          return true;
        } else if (
          direction === true &&
          shipStrength < 10 - x &&
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
        const shipStrength = that[ships][ship].strength;

        while (
          that.checkSquareInDirection(
            board,
            [...square],
            direction,
            ships,
            ship
          )
        ) {
          square = that.selectRandomSquare();
        }

        if (!direction && shipStrength < 10 - square[1]) {
          for (let i = 0; i < shipStrength; i++) {
            that[board][square[0]][square[1] + i] = `${
              that[ships][shipName].display[i]
            }-${shipName}`; //shipName;
          }
        } else if (direction && shipStrength < 10 - square[0]) {
          for (let i = 0; i < shipStrength; i++) {
            that[board][square[0] + i][square[1]] = `${
              that[ships][shipName].display[i]
            }-${shipName}-${direction}`;
            //   newGame.playerOneShips[pickedShip].display[i];;
          }
        } else {
          setStartSquare(that, ship, shipName);
        }
      };
      for (const shipKey in this[ships]) {
        // const ship = this[ships][shipKey];

        setStartSquare(this, shipKey, shipKey);
      }
    },
    newBrain: brain(),
    consultBrain: function(x, y) {
      console.log(this.newBrain);
      
      
    }
  };
}
