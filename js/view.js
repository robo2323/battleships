/*globals $*/
document.addEventListener('DOMContentLoaded', function() {
  let newGame = new Game();
  newGame.setBoard();
  console.log(newGame);
  const paper = $.id('paper-container');
  let clicked = true,
    clickedSquare = [],
    direction = false,
    pickedShip = 'Carrier';
  // draw blue lines on paper
  for (let i = 20; i < 820; i += 20) {
    const currentDivId = `line ${i}`;
    paper.innerHTML += `<div id='${currentDivId}'></div>`;
    const currentDiv = document.getElementById(currentDivId);
    currentDiv.style.position = 'relative';
    currentDiv.style.top = `${i}px`;
    currentDiv.style.height = '2px';
    currentDiv.style.width = '100%';
    currentDiv.style.backgroundColor = 'rgba(0,0,120,0.08';
    currentDiv.style.zIndex = '1';
  }
  const getXY = function(that) {
    return [+that.getAttribute('data-x'), +that.getAttribute('data-y')];
  };
  const trackBoardSquareClick = function(e) {
    e.preventDefault();

    clicked = !clicked;
    if (!clicked) {
      // place ship

      const placedShipSquares = document.querySelectorAll('.placing-ship');

      const cantPlace = newGame.checkSquareInDirection(
        newGame.playerOneBoard,
        [
          placedShipSquares[0].getAttribute('data-y'),
          placedShipSquares[0].getAttribute('data-x')
        ],
        direction,
        newGame.playerOneShips[pickedShip]
      );
      if (!cantPlace) {
        for (let i = 0; i < placedShipSquares.length; i++) {
          let x = placedShipSquares[i].getAttribute('data-y');
          let y = placedShipSquares[i].getAttribute('data-x');
          const playerShip = document.querySelector(
            `.ship[data-ship="${pickedShip}"`
          );
          playerShip.setAttribute('data-placed', 'true');
          playerShip.classList.remove('clickable');
          playerShip.style.opacity = '0.2';

          placedShipSquares[i].classList.add('placed-ship');

          newGame.playerOneBoard[x][y] = `${pickedShip}`;
        }
      }
    }
    clickedSquare = getXY(this);
  };
  const playBoardSquareClick = function(e) {

  };
  const removeClass = function(elements, classToRm) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].classList.contains(classToRm) &&
        elements[i].classList.remove(classToRm);
    }
  };

  const drawShipToPlace = function(area, xy) {
    let y = xy[0];
    let x = xy[1];
    const pickedShipLength = newGame.playerOneShips[pickedShip].length;
    const relativeShipLengthY = y + pickedShipLength - 1,
      relativeShipLengthX = x + pickedShipLength - 1;

    // rotate ship piece if no room against edge
    try {
      if (relativeShipLengthY > 9 && relativeShipLengthX > 9) {
        if (!direction) {
          for (let i = 0; i < pickedShipLength; i++) {
            $.id(`${area}-${x}-${y - i}`).classList.add('placing-ship');
          }
        } else if (direction) {
          for (let i = 0; i < pickedShipLength; i++) {
            $.id(`${area}-${x - i}-${y}`).classList.add('placing-ship');
          }
        }
      } else if (!direction) {
        if (!direction && relativeShipLengthY > 9) {
          direction = !direction;
        } else if (direction && relativeShipLengthX > 9) {
          direction = !direction;
        }
        for (let i = 0; i < pickedShipLength; i++) {
          $.id(`${area}-${x}-${y + i}`).classList.add('placing-ship');
        }
      } else if (direction) {
        if (!direction && relativeShipLengthY > 9) {
          direction = !direction;
        } else if (direction && relativeShipLengthX > 9) {
          direction = !direction;
        }
        for (let i = 0; i < pickedShipLength; i++) {
          $.id(`${area}-${x + i}-${y}`).classList.add('placing-ship');
        }
      }
    } catch (err) {}
  };
  const trackBoardSquareHover = function() {
    if (clicked) {
      const area = this.getAttribute('data-area');
      const xy = getXY(this);

      const allSquares = document.querySelectorAll(`#${area} > div`);
      removeClass(allSquares, 'placing-ship');
      this.classList.add('placing-ship');

      drawShipToPlace(area, xy);
    }
  };

  //-------------------------------
  // draw grids/create board squares for play and tracking areas
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
          //add id to current board square
          div.setAttribute('data-y', `${i - 1}`);
          div.setAttribute('data-x', `${c - 1}`);
          div.setAttribute('data-area', `${area}`);
          div.id = `${area}-${i - 1}-${c - 1}`;
          div.classList = 'board-square clickable';
          if (area === 'track-area') {
            div.addEventListener('click', trackBoardSquareClick);
            div.addEventListener('mousemove', trackBoardSquareHover);
          }
          if (area === 'play-area') {
            div.classList.add('play-board-square');

            if (newGame.checkSquare(newGame.playerTwoBoard, [i, c])) {
              div.textContent = newGame.playerTwoBoard[i][c].slice(0, 2);
              div.style.background = 'tomato';
              div.style.color = 'black';
            }
          }

          if (
            area === 'track-area' &&
            newGame.checkSquare(newGame.playerOneBoard, [i, c])
          ) {
            div.textContent = newGame.playerOneBoard[i][c].slice(0, 2);
            div.style.background = 'steelblue';
            div.style.color = 'black';
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
    drawBoardArea('track-area');
    removeClass(playerShips, 'clickable'); //TODO: make ships completely unclickable and fade them, make an addClass function
  });
});
