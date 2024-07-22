const patterns = [
    { sequence: [2, 3, 5, 7], next: "11", hint: "Think prime numbers." },
    { sequence: [1, 4, 9, 16], next: "25", hint: "These are square numbers." },
    { sequence: [1, 2, 4, 8, 16], next: "32", hint: "Each number is multiplied by two." },
    { sequence: [0, 1, 1, 2, 3, 5], next: "8", hint: "A famous sequence that adds two preceding numbers." },
    { sequence: [3, 1, 4, 1, 5], next: "9", hint: "Digits of a mathematical constant pi." },
    { sequence: ["Jan", "Feb", "Mar", "Apr"], next: "May", hint: "Order of months." },
    { sequence: ["Monday", "Tuesday", "Wednesday", "Thursday"], next: "Friday", hint: "Days of the week." },
    { sequence: ["a", "e", "i", "o"], next: "u", hint: "English vowels in order." },
    { sequence: ["red", "blue", "red", "green", "blue", "red"], next: "green", hint: "Pattern alternates with a twist." },
    { sequence: ["triangle", "square", "circle", "triangle", "square"], next: "circle", hint: "Geometric shapes repeating." },
    { sequence: ["Z", "X", "V", "T"], next: "R", hint: "Reverse alphabetical order skipping one each time." },
    { sequence: ["M", "V", "E", "M", "J"], next: "S", hint: "Planets from the sun, starting from Mercury." },
    { sequence: [2, 10, 30, 68], next: "130", hint: "Each number increases by increasing multiples of 2." },
    { sequence: ["one", "three", "five", "seven"], next: "nine", hint: "Odd numbers in words." }
];

let currentPattern = {};

function loadPattern() {
    feedback.textContent = "";
    document.getElementById('userInput').value = "";
    currentPattern = patterns[Math.floor(Math.random() * patterns.length)];
    const container = document.getElementById('patternContainer');
    container.innerHTML = currentPattern.sequence.join(", ") + ", ?";
    document.getElementById('hint').textContent = "";  // Clear previous hint
}

function showHint() {
    const hintElement = document.getElementById('hint');
    hintElement.textContent = currentPattern.hint;
}

window.onload = function() {
    loadPattern();
};

function submitGuess() {
    const userGuess = document.getElementById('userInput').value;
    const feedback = document.getElementById('feedback');
    if (userGuess.trim().toLowerCase() === currentPattern.next.toLowerCase()) {
        feedback.textContent = "Correct! Well done!";
        setTimeout(() => {
            loadPattern();
        }, 2000);
    } else {
        feedback.textContent = "Incorrect, try again!";
    }
}

var input = document.getElementById('userInput');
input.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        document.getElementById("submit").click();
    }
});