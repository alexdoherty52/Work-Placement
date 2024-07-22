let fullPuzzle = document.getElementById('puzzle-full');


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