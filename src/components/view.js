//TODO:  get enemy ships to display once destroyed, win/lose state - display and tehn reset player ships , AI, salvos
/*globals $*/
import $ from '../utils/$';
import Game from '../controllers/logic';
import renderLines from './renderLines';
import getXY from './getXY';
import removeClass from './removeClass';

export default function() {
  let clicked = true,
    clickable = true,
    direction = false,
    pickedShip = 'Carrier';
  // draw blue lines on paper
  renderLines();
  const startNewGame = function() {
    let newGame = new Game();
    newGame.setBoard();
    return newGame;
  };
  let newGame = startNewGame();
  const trackBoardSquareClick = function(e) {
    e.preventDefault();

    clicked = clickable ? !clicked : clicked;
    if (!clicked && clickable) {
      // place ship
      const placedShipSquares = document.querySelectorAll('.placing-ship');

      const y = placedShipSquares[0].getAttribute('data-y');
      const x = placedShipSquares[0].getAttribute('data-x');

      const cantPlace = newGame.checkSquareInDirection(
        'playerOneBoard',
        [y, x],
        direction,
        'playerTwoShips',
        pickedShip
      );

      if (!cantPlace) {
        const playerShip = document.querySelector(
          `.ship[data-ship="${pickedShip}"]`
        );
        for (let i = 0; i < placedShipSquares.length; i++) {
          let x = placedShipSquares[i].getAttribute('data-y');
          let y = placedShipSquares[i].getAttribute('data-x');

          // placedShipSquares[i].classList.add('placed-ship');

          newGame.playerOneBoard[x][y] = `${
            newGame.playerOneShips[pickedShip].display[i]
          }-${pickedShip}${direction && '-rot'}`;
          drawBoardArea('track-area');
        }
        if (
          document.querySelectorAll('.ship[data-placed="false"]').length > 0
        ) {
          playerShip.setAttribute('data-placed', 'true');
          playerShip.classList.remove('clickable');
          playerShip.style.opacity = '0.2';

          if (pickedShip !== 'Sub_Two') {
            const newPickedShip = playerShip.nextElementSibling;
            const placed = newPickedShip.getAttribute('data-placed');

            if (placed) {
              pickedShip = newPickedShip.getAttribute('data-ship');
            }
          }
          clicked = !clicked;
        } else {
          clicked = false;
          clickable = false;
        }
      }
    }
    console.log(newGame);
  };

  const checkShot = function(board, [x, y], ships, that) {
    x = +x;
    y = +y;

    const square = newGame[board][x][y];

    if (square === 'X' || (square === '/' && board === 'playerOneBoard')) {
      aiPlay();
    } else if (square === 'X' || square === '/') {
      return true;
    }

    const shot = newGame.checkSquare(board, [x, y]);

    if (shot) {
      const ship = newGame[ships][square.split('-')[1]];

      ship.hits.push(x, y);

      if (ship.hits.length === ship.strength * 2) {
        console.log(square.split('-')[1], 'destroyed');
        if (board === 'playerOneBoard') {
          newGame.pOneSunkShips++;
        } else {
          newGame.pTwoSunkShips++;
        }
        console.log('p1' + newGame.pOneSunkShips + newGame.pTwoSunkShips);
      }
      newGame[board][x][y] = 'X';
      if (board === 'playerOneBoard') {
        newGame.pTwoScore++;
        if (newGame.pTwoScore === 18) {
          console.log('computer wins');
          drawBoardArea('play-area');
          drawBoardArea('track-area');
          newGame = startNewGame();
        }
      } else {
        newGame.pOneScore++;
        if (newGame.pOneScore === 18) {
          drawBoardArea('play-area');
          drawBoardArea('track-area');
          console.log('you win!');
          newGame = startNewGame();
        }
      }
    } else {
      newGame[board][x][y] = '/';
    }

    board === 'playerTwoBoard'
      ? drawBoardArea('play-area')
      : drawBoardArea('track-area');
  };
  const aiPlay = function() {
    let aiTurn = newGame.selectRandomSquare();
    const x = aiTurn[0];
    const y = aiTurn[1];

    setTimeout(() => {
      const shot = checkShot(
        'playerOneBoard',
        [...aiTurn],
        'playerOneShips',
        $.id(`track-area-${x}-${y}`)
      );
      newGame.consultBrain();
    }, 500);
  };
  // make a shot/guess
  const playBoardSquareClick = function(e) {
    e.preventDefault();
    const x = this.getAttribute('data-y');
    const y = this.getAttribute('data-x');

    const shotNotTaken = checkShot(
      'playerTwoBoard',
      [x, y],
      'playerTwoShips',
      this
    );
    if (!shotNotTaken) {
      aiPlay();
    }
  };

  const drawShipToPlace = function(area, xy) {
    let y = xy[0];
    let x = xy[1];

    const pickedShipLength = newGame.playerOneShips[pickedShip].strength;
    const relativeShipLengthY = y + pickedShipLength - 2,
      relativeShipLengthX = x + pickedShipLength - 2;
    newGame.pOneStyles = [];

    // rotate ship piece if no room against edge
    try {
      if (relativeShipLengthY > 9 && relativeShipLengthX > 9) {
        if (!direction) {
          for (let i = 0; i < pickedShipLength; i++) {
            // $.id(`${area}-${x}-${y - i}`).classList.add('placing-ship');

            newGame.pOneStyles.push([x, y - i, 'placing-ship']);
            // newGame.playerOneBoard[x][y - i] =
            //   newGame.playerOneShips[pickedShip].display[i];
          }
        } else if (direction) {
          for (let i = 0; i < pickedShipLength; i++) {
            // $.id(`${area}-${x - i}-${y}`).classList.add('placing-ship');

            newGame.pOneStyles.push([x - i, y, 'placing-ship']);
            // newGame.playerOneBoard[x - i][y] =
            //   newGame.playerOneShips[pickedShip].display[i];
          }
        }
      } else if (!direction) {
        if (!direction && relativeShipLengthY > 9) {
          direction = !direction;
        } else if (direction && relativeShipLengthX > 9) {
          direction = !direction;
        }
        for (let i = 0; i < pickedShipLength; i++) {
          // $.id(`${area}-${x}-${y + i}`).classList.add('placing-ship');

          newGame.pOneStyles.push([x, y + i, 'placing-ship']);
          // newGame.playerOneBoard[x][y + i] =
          //   newGame.playerOneShips[pickedShip].display[i];
        }
      } else if (direction) {
        if (!direction && relativeShipLengthY > 9) {
          direction = !direction;
        } else if (direction && relativeShipLengthX > 9) {
          direction = !direction;
        }
        for (let i = 0; i < pickedShipLength; i++) {
          // $.id(`${area}-${x + i}-${y}`).classList.add('placing-ship');

          newGame.pOneStyles.push([x + i, y, 'placing-ship']);
          // newGame.playerOneBoard[x + i][y] =
          //   newGame.playerOneShips[pickedShip].display[i];
        }
      }
    } catch (err) {
      return;
    }
    drawBoardArea('track-area');
  };
  const trackBoardSquareHover = function() {
    if (clicked) {
      const area = this.getAttribute('data-area');
      const xy = getXY(this);

      // this.classList.add('placing-ship');

      drawShipToPlace(area, xy);
    }
  };

  const drawBoardArea = (area) => {
    const areaEl = $.id(area);
    areaEl.innerHTML = '';
    // set char code to print letters along x axis
    const charCode = 64;

    // nested loops to create board squares
    for (let i = 0; i < 11; i++) {
      for (let c = 0; c < 11; c++) {
        const div = document.createElement('DIV');

        // adds letters to top row of squares
        if (i === 0 && c > 0) {
          div.textContent = String.fromCharCode(charCode + c);
          div.style.borderBottom = '2px solid black';
          div.classList = `board-square`;
        } else if (c === 0 && i > 0) {
          // adds numbers to left hand column of squares
          div.textContent = i;
          div.style.borderRight = '2px solid black';
          div.classList = `board-square`;
        } else if (i !== 0 && c !== 0) {
          //add id, data attr and class to current board square
          div.setAttribute('data-y', `${i}`);
          div.setAttribute('data-x', `${c}`);
          div.setAttribute('data-area', `${area}`);
          div.id = `${area}-${i}-${c}`;
          div.classList = 'board-square clickable';

          const board =
            area === 'play-area' ? 'playerTwoBoard' : 'playerOneBoard';
          let squareContent = newGame.checkSquare(board, [i, c]);

          if (area === 'track-area') {
            div.classList.add('track-board-square');

            newGame.pOneStyles.forEach((element) => {
              if (element[0] === i && element[1] === c) {
                div.classList.add(element[2]);
              }
            });
            div.addEventListener('click', trackBoardSquareClick);
            div.addEventListener('mousemove', trackBoardSquareHover);

            if (squareContent) {
              if (squareContent === '/') {
                div.textContent = squareContent;

                div.classList.add('miss');
              } else if (squareContent === 'X') {
                div.textContent = squareContent;

                div.classList.add('hit');
              } else {
                squareContent = squareContent.split('-');
                div.textContent = squareContent[0];
                div.style.background = 'rgba(30, 200, 50, 0.23)';
                if (squareContent[2]) {
                  div.style.transform = 'rotateZ(90deg)';
                }
              }
            }
          }

          if (area === 'play-area') {
            div.classList.add('play-board-square');
            div.addEventListener('click', playBoardSquareClick);

            if (squareContent) {
              if (squareContent === '/') {
                div.textContent = squareContent;

                div.classList.add('miss');
              } else if (squareContent === 'X') {
                div.textContent = squareContent;

                div.classList.add('hit');
              }
            }
          }
        }
        areaEl.appendChild(div);
      }
    }
  };
  const playerShips = document.querySelectorAll('.ship');

  const clickPlayerShipHandeler = function(e) {
    const currentShip = e.target.parentNode;
    pickedShip = currentShip.getAttribute('data-ship');
    removeClass(playerShips, 'current-ship-selected');
    currentShip.classList.add('current-ship-selected');
    clicked = true;
  };

  drawBoardArea('track-area');
  drawBoardArea('play-area');

  for (let i = 0; i < playerShips.length; i++) {
    playerShips[i].addEventListener('click', clickPlayerShipHandeler);
  }

  document.addEventListener('keydown', () => {
    direction = !direction;
  });
  document.querySelector('#place-randomly').addEventListener('click', () => {
    newGame.setBoard('playerOneBoard', 'playerOneShips');
    clicked = false;
    clickable = false;
    newGame.pOneStyles = [];

    for (let i = 0; i < playerShips.length; i++) {
      playerShips[i].setAttribute('data-placed', 'true');
      playerShips[i].classList.remove('clickable');
      playerShips[i].style.opacity = '0.2';
      playerShips[i].removeEventListener('click', clickPlayerShipHandeler);
    }

    drawBoardArea('track-area');
  });
}
