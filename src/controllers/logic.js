import $ from '../utils/$';
import brain from './brain';

// game state object constructor
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
    // stores some specific styles for game board squares
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
    // stores some specific styles for game board squares
    pTwoStyles: [],
    // player ship objects
    playerOneShips: {
      Carrier: { display: ['<=', '=', '=', '=', '=]'], hits: [], strength: 5 }, //strength is actually ship length
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
    pOneSunkShips: 0,
    pTwoSunkShips: 0,
    pOneShotsLeft: 7,
    pTwoShotsLeft: 7,
    pOneScore: 0,
    pTwoScore: 0,
    pOneMoves: 0,
    pTwoMoves: 0,
    selectRandomSquare: function() {
      const x = Math.floor(Math.random() * 10) + 1;
      const y = Math.floor(Math.random() * 10) + 1;
      return [x, y];
    },
    // check if square is empty or not
    checkSquare: function(board, [x, y]) {
      x = +x;
      y = +y;
      return this[board][x][y];
    },
    // give co ordinates of squares adjacent to input square
    checkAdjacentSquares: function(
      [x, y],
      direction,
      board = 'playerOneBoard'
    ) {
      x = +x;
      y = +y;
      const up = y - 1 > 1 ? y - 1 : 1;
      const down = y + 1 < 10 ? y + 1 : 10;
      const left = x - 1 > 1 ? x - 1 : 1;
      const right = x + 1 < 10 ? x + 1 : 10;

      switch (direction) {
      case 0:
        return [x, up];
      case 1:
        return [x, down];
      case 2:
        return [left, y];
      case 3:
        return [right, y];
      }
    },
    //check weather (n)squares in a particualr direction are emoty
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
    // randomly place ships in playerBoard object
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
    // create new brain object, brain stores some info about prevous shot if it was a hit
    newBrain: brain(),
    // get brain object
    consultBrain: function(x, y) {
      return this.newBrain;
    },
    // update brain object
    updateBrain: function(key, value) {
      this.newBrain[key] = value;
    }
  };
}
