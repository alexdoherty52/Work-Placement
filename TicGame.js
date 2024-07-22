let currentPlayer = 'X'; // Player X starts first
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Represents the game board

// Function to handle a player's move
function playerMove(index) {
    if (gameBoard[index] === '' && !isGameOver()) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        if (isGameWon()) {
            document.getElementById('status').textContent = `Player ${currentPlayer} Wins!`;
        } else if(isGameOver()){
            document.getElementById('status').textContent = `Nobody Wins!`;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.getElementById('status').textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

// Function to check if the game is over (win or draw)
function isGameWon() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true; // Found a winning combination
        }
    }

    return false; // No empty cells means a draw
}

//Function to check if the game ended in a draw
function isGameOver(){
    return !gameBoard.includes(''); // No empty cells with no winner means a draw
}
// Function to render the game board
function renderBoard() {
    const boardElement = document.querySelector('.board');
    boardElement.innerHTML = ''; // Clear the board

    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => playerMove(index));
        boardElement.appendChild(cellElement);
    });
}

// Function to reset the game
function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    renderBoard();
    document.getElementById('status').textContent = `Player ${currentPlayer}'s Turn`;
}

// Initial render of the game board
renderBoard();
document.getElementById('status').textContent = `Player ${currentPlayer}'s Turn`;
