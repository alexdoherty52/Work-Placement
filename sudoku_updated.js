document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('sudokuCanvas');
    const ctx = canvas.getContext('2d');
    const size = 450;
    const cellSize = size / 9;
    let puzzle = generatePuzzle();

    function drawGrid() {
        ctx.clearRect(0, 0, size, size);
        ctx.beginPath();
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                ctx.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
                if (puzzle[i][j] !== 0) {
                    ctx.fillText(puzzle[i][j], j * cellSize + cellSize / 3, i * cellSize + 2 * cellSize / 3);
                }
            }
        }
        ctx.stroke();
    }

    function generatePuzzle() {
        // Initialize a blank grid
        let grid = Array.from({ length: 9 }, () => Array(9).fill(0));
        try {
            fillGrid(grid);
            removeNumbers(grid, 20); // Adjust the number of removed cells for difficulty
        } catch(e) {
            console.error('Failed to generate puzzle: ', e);
        }
        return grid;
    }

    function fillGrid(grid) {
        for (let i = 0; i < 81; i++) {
            let row = Math.floor(i / 9);
            let col = i % 9;
            if (grid[row][col] === 0) {
                let numbers = shuffle([1,2,3,4,5,6,7,8,9]);
                for (let number of numbers) {
                    if (isValidPlacement(grid, number, row, col)) {
                        grid[row][col] = number;
                        if (fillGrid(grid)) {
                            return true;
                        } 
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
        return true;
    }

    function removeNumbers(grid, count) {
        while (count > 0) {
            let cell = Math.floor(Math.random() * 81);
            let row = Math.floor(cell / 9);
            let col = cell % 9;
            if (grid[row][col] !== 0) {
                grid[row][col] = 0;
                count--;
            }
        }
    }

    function isValidPlacement(grid, number, row, col) {
        // Check row, column, and box constraints
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === number || grid[i][col] === number) {
                return false;
            }
        }
        let startRow = Math.floor(row / 3) * 3;
        let startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i + startRow][j + startCol] === number) {
                    return false;
                }
            }
        }
        return true;
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function handleInput(event) {
        const x = event.offsetX;
        const y = event.offsetY;
        const col = Math.floor(x / cellSize);
        const row = Math.floor(y / cellSize);

        const num = prompt("Enter a number (1-9):");
        if (num >= 1 && num <= 9) {
            if (isValidPlacement(puzzle, parseInt(num), row, col)) {
                puzzle[row][col] = parseInt(num);
                drawGrid();
            } else {
                alert("Invalid number for this position.");
            }
        }
    }

    canvas.addEventListener('mousedown', handleInput);
    drawGrid();
});
