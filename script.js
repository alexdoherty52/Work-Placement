// shapes and passwrpds
const SHAPE_SETS = [
    {
        shapes: ["star", "circle", "triangle", "heart", "square", "ace", "plus", "hexagon"],
        passwords: ["xmtcc", "xwttg", "zbbcr", "bbvct", "zchbc", "fweqx", "qmbsr", "tsvdb"]
    }
];

// random shape sequence and corresponding password index
function generateShapeSequence() {
    const set = SHAPE_SETS[0]; // Only one set for now
    let passwordIndex, passwordLength;
    do {
        passwordIndex = Math.floor(Math.random() * set.passwords.length);
        passwordLength = set.passwords[passwordIndex].length;
    } while (passwordLength < 4 || passwordLength > 6);

    // Get the password
    const password = set.passwords[passwordIndex];

    // Create a map of shapes to letters in the password
    const shapeMap = {};
    for (let i = 0; i < passwordLength; i++) {
        shapeMap[password[i]] = set.shapes[i];
    }

    // Shuffle the shapes for randomness
    const shuffledShapes = shuffleArray(set.shapes.slice());

    // shape sequence based on the password
    const shapeSequence = [];
    for (let i = 0; i < passwordLength; i++) {
        shapeSequence.push(shapeMap[password[i]]);
    }

    return { shapeSequence, passwordIndex };
}


// Display the shape sequence on the screen
function displayShapeSequence(shapeSequence) {
    const shapeContainer = document.getElementById("shapeSequence");
    shapeContainer.innerHTML = "<p>Shape Sequence:</p>";
    shapeSequence.forEach(shape => {
        const shapeDiv = document.createElement("div");
        shapeDiv.classList.add("shape");
        shapeDiv.innerHTML = getShapeSVG(shape);
        shapeContainer.appendChild(shapeDiv);
    });
}

function getShapeSVG(shape) {
    let fillColor;
    switch (shape) {
        case "star":
            fillColor = "#ffcc00"; // Yellow
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fillColor}"><path d="M12 2l2.29 7.07H22l-6.26 4.54 2.29 7.07L12 17.67l-5.74 4.01 2.29-7.07L2 9.07h7.71z"/></svg>`;
        case "circle":
            fillColor = "#ff6384"; // Pink
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fillColor}"><circle cx="12" cy="12" r="10"/></svg>`;
        case "triangle":
            fillColor = "#36a2eb"; // Blue
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fillColor}"><path d="M12 2L1.5 21h21z"/></svg>`;
        case "heart":
            fillColor = "#ff6384"; // Red
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fillColor}"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;
        case "square":
            fillColor = "#4bc0c0"; // Turquoise
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fillColor}"><rect width="24" height="24"/></svg>`;
        case "ace":
            fillColor = "#9966ff"; // Purple
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fillColor}"><path d="M12 2L2 22h20z"/></svg>`;
        case "plus":
            fillColor = "#ffcd56"; // Yellow
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fillColor}"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"/></svg>`;
        case "hexagon":
            fillColor = "#4bc0c0"; // Turquoise
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fillColor}"><path d="M14.2 2.5L5.8 7.5l-3.6 10 8.4 4.9 8.4-4.9-3.6-10-8.2-5z"/></svg>`;
        default:
            return '';
    }
}

// Display on the screen
function displayOptions(options) {
    const optionContainer = document.getElementById("options");
    optionContainer.innerHTML = "<p>Options:</p>";
    
    console.log("Options:", options); // Log options
    
    options.forEach((option, index) => {
        const optionDiv = document.createElement("div");
        optionDiv.classList.add("option");
        optionDiv.textContent = option;
        optionDiv.setAttribute("data-index", index);
        optionDiv.addEventListener("click", () => checkPassword(index));
        optionContainer.appendChild(optionDiv);
    });
}

// shuffle  array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// Check if password matches the correct password
function checkPassword(index) {
    const { passwordIndex } = currentGame;
    const messageElement = document.getElementById("message");
    if (index === passwordIndex) {
        messageElement.textContent = "Congratulations! You've guessed the correct password.";
    } else {
        messageElement.textContent = "Incorrect password. Try again.";
    }
}

// Start a new game
function newGame() {
    currentGame = generateShapeSequence();
    displayShapeSequence(currentGame.shapeSequence);
    displayOptions(SHAPE_SETS[0].passwords); // Since you have only one set defined in SHAPE_SETS
    document.getElementById("message").textContent = "";
}

// Initialize a new game when the page loads
let currentGame;
window.onload = newGame;

