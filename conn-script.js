const COLS = 7;
const ROWS = 6;
let currentPlayer = 'red';
let gameBoard = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

function createBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', () => makeMove(col));
            board.appendChild(cell);
        }
    }
}

function makeMove(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (!gameBoard[row][col]) {
            gameBoard[row][col] = currentPlayer;
            updateBoard();
            if (checkWin(row, col)) {
                document.getElementById('game-status').textContent = `Player ${currentPlayer === 'red' ? 1 : 2} Wins!`;
                disableBoard();
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
                document.getElementById('game-status').textContent = `Player ${currentPlayer === 'red' ? 1 : 2}'s Turn (${currentPlayer === 'red' ? 'Red' : 'Yellow'})`;
            }
            return;
        }
    }
}

function updateBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            if (gameBoard[row][col]) {
                cell.classList.add(gameBoard[row][col]);
            } else {
                cell.classList.remove('red', 'yellow');
            }
        }
    }
}

function checkWin(row, col) {
    return (
        checkDirection(row, col, 1, 0) || // Horizontal
        checkDirection(row, col, 0, 1) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal 
        checkDirection(row, col, 1, -1)   // Diagonal
    );
}

function checkDirection(row, col, rowDelta, colDelta) {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        const r = row + i * rowDelta;
        const c = col + i * colDelta;
   if (r >= 0 && r < ROWS && c >= 0 && c < COLS && gameBoard[r][c] === currentPlayer) {
            count++;
            if (count === 4) {
                        return true;
            }
      } else {
            count = 0;
        }
    }
    return false;
}

function disableBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.removeEventListener('click', makeMove));
}

function resetGame() {
    gameBoard = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    currentPlayer = 'red';
    createBoard();
    document.getElementById('game-status').textContent = `Player 1's Turn (Red)`;
}

// Initialize the game board when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    createBoard();
    document.getElementById('game-status').textContent = `Player 1's Turn (Red)`;
});
