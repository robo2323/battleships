document.addEventListener('DOMContentLoaded', function() {
  let newGame = new Game();
  newGame.initGame();
  newGame.setAiBoard();
  // console.log(newGame.playerTwoBoard);
  const paper = $.id('paper-container');

  let clicked = true,
    clickedSquare = [],
    direction = false,
    pickedShip = 'ca';
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
  const boardSquareClick = function(e) {
    e.preventDefault();
    
    clicked = !clicked;
    if (!clicked) {
      const placedShipSquares = document.querySelectorAll('.placing-ship');
      for (let i = 0; i < placedShipSquares.length; i++) {
        const y = placedShipSquares[i].getAttribute('data-y');
        const x = placedShipSquares[i].getAttribute('data-x');
        console.log(`${pickedShip}`);
        

        newGame.playerOneBoard[x][y] = `x`;
      }
    }
    // this.style.background = 'tomato';
    clickedSquare = getXY(this);
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
    const pickedShipLength = pickedShip.length;
    const relativeShipLengthY = y + pickedShipLength - 1,
      relativeShipLengthX = x + pickedShipLength - 1;
    // rotate ship piece if no room against edge

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
  };
  const boardSquareHover = function(e) {
    if (clicked) {
      const area = this.getAttribute('data-area');
      const xy = getXY(this);

      const allSquares = document.querySelectorAll(`#${area} > div`);
      removeClass(allSquares, 'placing-ship');
      this.classList.add('placing-ship');

      drawShipToPlace(area, xy);
    }
  };

  // draw grids/create board squares for play and tracking areas
  const drawBoardArea = (area) => {
    const areaEl = $.id(area);
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
            div.addEventListener('click', boardSquareClick);
            div.addEventListener('mousemove', boardSquareHover);
          }
          if (
            area === 'play-area' &&
            newGame.checkSquare(newGame.playerTwoBoard, [i, c])
          ) {
            div.textContent = newGame.playerTwoBoard[i][c];
            div.style.background = 'tomato';
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
  };
  drawBoardArea('track-area');
  drawBoardArea('play-area');
  for (let i = 0; i < playerShips.length; i++) {
    playerShips[i].addEventListener('click', clickPlayerShipHandeler);
  }
  document.addEventListener('keydown', () => {
    direction = !direction;
  });

  // $.('track-area').addEventListener('mousemove')
});
