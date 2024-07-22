window.addEventListener("contextmenu", e => e.preventDefault());

/*----- constants -----*/
const solution = [ // 13x13
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 0

        [0,     0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], // row 1
        [0,     0, 0, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0], // row 2
        [0,     0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0], // row 3
        [0,     0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0], // row 4
        [0,     1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1], // row 5
        [0,     1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1], // row 6
        [0,     1, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 1], // row 7
        [0,     1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1], // row 8
        [0,     0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0], // row 9
        [0,     0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], // row 10
        [0,     0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0], // row 11
        [0,     0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0], // row 12
  ];


/*----- app's state letiables -----*/
let board;

/*----- cached element references -----*/
let cells = document.querySelectorAll('div');
let headline = document.getElementById('headline');
let puzzleBoard = document.getElementById('puzzleboard');
let restartButton = document.getElementById('restart');
let fullPuzzle = document.getElementById('puzzle-full');
let fullInstructions = document.getElementById('instructions');

/*----- event listeners -----*/
//puzzleBoard.addEventListener('click', click);
puzzleBoard.addEventListener('mousedown', clicked);
//puzzleBoard.addEventListener('contextmenu', rightClick); 
restartButton.addEventListener('click', reset);


/*----- functions -----*/
initialize();

// Swap gameboard for instructions on click
function toggleInstructions() {
    if (!fullPuzzle.style.display) {
        fullPuzzle.style.display = 'none';
        fullInstructions.style.display = 'block'
    } else if (fullPuzzle.style.display == 'none') {
        fullPuzzle.style.display = 'block';
        fullInstructions.style.display = 'none'
    } else if (fullPuzzle.style.display == 'block') {
        fullPuzzle.style.display = 'none';
        fullInstructions.style.display = 'block'
    }
}

// Make all cells white on restart
function reset() {
    initialize()
    cells.forEach(function (el) {el.style.backgroundColor = ''})
    headline.innerHTML = 'Level 2';
}

// Make tiles toggle white/black AND toggle cell value 0/1

function clicked(evt) {
        if (evt.button === 0) {
            click(evt);
        } else if (evt.button === 2) {
            rightClick(evt);
        }
}

function click(evt) {
    const marker = evt.target;
    let markerString = marker.id;
    let rowArr = markerString.split('r');
    let rowIdx = rowArr[rowArr.length - 1];
    rowArr.pop();
    let colIdx = rowArr.join('').replace('c', '');
    if (colIdx != 0) {
        if (evt.altKey === false) {
            if (!marker.style.backgroundColor) {
                marker.style.backgroundColor = 'grey'
                board[rowIdx][colIdx] = 1;
            } else if (marker.style.backgroundColor = 'grey') {
                marker.style.backgroundColor = ''
                board[rowIdx][colIdx] = 0;
            } 
        } else { //
            marker.style.backgroundColor = 'red'
            board[rowIdx][colIdx] = 0;
        }
    }
    checkWin()
}

function rightClick(evt) {
    evt.preventDefault();
    const marker = evt.target;
    let markerString = marker.id;
    let rowArr = markerString.split('r');
    let rowIdx = rowArr[rowArr.length - 1];
    rowArr.pop();
    let colIdx = rowArr.join('').replace('c', '');
    if (colIdx != 0) {
        if (!marker.style.backgroundColor) {
            marker.style.backgroundColor = 'red'
            board[rowIdx][colIdx] = 2;
        } else if (marker.style.backgroundColor = 'red') {
            marker.style.backgroundColor = ''
            board[rowIdx][colIdx] = 0;
        }
    }
    checkWin()
}

// Check if current board array matches solution array
function checkWin() {
    if (board.toString() == solution.toString()) {
        headline.innerHTML = 'you win!';
    // } else if (board.toString() !== solution.toString()) {
    //     headline.innerHTML = 'nonogram puzzle';
     }
}

// Initialize board
function initialize() {
    board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 0
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 1
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 2
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 3
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 4
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 5
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 6
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 7
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 8
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 9
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // row 10
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // row 11
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // row 12
    ];
}