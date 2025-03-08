const gameBoard = document.querySelector('.gameContainer');

gridList = [];
 
function loadGrid() {
  gridList = [];
  gameBoard.innerHTML="";
  for(let i = 0; i <= 99; i++) {
    const grid = document.createElement('span');
    grid.classList.add('tile')

    armMines(grid)
   
    gameBoard.appendChild(grid)
    gridList.push(grid);
}
}

function armMines(grid) {
  const fuse = Math.floor(Math.random() * 100);
    if (fuse > 75) {
      grid.style.cssText="background-color: red;"
      grid.setAttribute('status', 'Armed');
      console.log(grid)
    } else {
        grid.setAttribute('status', 'Unarmed');
}
}

let checkList = [];
let perimeterCount = [];
let perimeterZeros = [];

function checkPerimeter(grid) {
  checkList = [];
  const check = gridList.indexOf(grid)
  const checkL = check -1;
  const checkR = check +1;
  const checkTR = check -9;
  const checkTC = check -10;
  const checkTL = check -11;
  const checkBL = check +9;
  const checkBC = check +10;
  const checkBR = check +11;

// If the tile selected is an edge tile, prevent wrap to other side of the grid.

  if (check % 10 == 0) {
    checkList.push(checkTC, checkTR, checkR, checkBC, checkBR);

    perimeterCount = [];
    perimeterZeros = [];

    checkList.forEach(tile => {
      checkArmedList(tile);
    })

// If the tile selected is an edge tile, prevent wrap to other side of the grid.

  } else if (check % 10 == 9) {
      checkList.push(checkTC, checkTL, checkL, checkBC, checkBL);

    perimeterCount = [];
    perimeterZeros = [];

    checkList.forEach(tile => {
      checkArmedList(tile);
    })
  } else {
   
    checkList.push(checkTL, checkTC, checkTR, checkL, checkR, checkBL, checkBC, checkBR);

    perimeterCount = [];
    perimeterZeros = [];
 
    checkList.forEach(tile => {
      checkArmedList(tile);
  })  
}  
}

 function checkArmedList(index) {
    let targetIndex = checkList.indexOf(index);
    let targetTile = checkList[targetIndex]

    if (targetTile < 0 || targetTile > 99) {
       console.log('Out of Range');
    } else if (gridList[targetTile].getAttribute('status') == 'Armed') {
         perimeterCount.push(gridList[targetTile]);
}
}


function unarmedEvent(grid) {
  grid.innerText= `${perimeterCount.length}`;
  grid.classList.add('unarmed')
}

gameBoard.addEventListener('click', function(event) {
  if(event.target.getAttribute('status') == 'Armed') {
    alert('Game Over! You lose.')
    loadGrid();
  } else if (event.target.getAttribute('status') == 'Unarmed') {
      checkPerimeter(event.target);
      unarmedEvent(event.target);
     
  } else {
      console.log('fail')
}  
})


loadGrid();