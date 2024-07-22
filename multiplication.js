let score = 0;
let highscore = 0;
let q1, q2, ans;
let answer1, answer2;

function initGame() {
  score = 0;
  highscore = 0;
  updateScore();
  generateQuestion();
}

function generateQuestion() {
  q1 = getRandomInt(-12, 12);
  q2 = getRandomInt(-12, 12);
  ans = q1 * q2;
  
  document.getElementById('question').textContent = `${q1} x ${q2}`;
  
  // Randomly assign answers to buttons
  let correctButton = Math.random() < 0.5 ? 'answer1' : 'answer2';
  let incorrectButton = correctButton === 'answer1' ? 'answer2' : 'answer1';
  
  document.getElementById(correctButton).textContent = ans;
  document.getElementById(incorrectButton).textContent = getRandomInt(-144, 144); // Ensure the incorrect answer is different
}

function answerClicked(buttonId) {
  let selectedAnswer = parseInt(document.getElementById(buttonId).textContent);
  
  if (selectedAnswer === ans) {
    score++;
    if (score > highscore) {
      highscore = score;
    }
    playSound('positive.mp3');
  } else {
    score = 0;
    playSound('negative.mp3');
  }
  
  updateScore();
  generateQuestion();
}

function updateScore() {
  document.getElementById('score').textContent = `Score: ${score}`;
  document.getElementById('highscore').textContent = `Highscore: ${highscore}`;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

function playSound(soundFile) {
  let audio = new Audio(soundFile);
  audio.play();
}

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
  initGame();
  
  document.getElementById('answer1').addEventListener('click', function() {
    answerClicked('answer1');
  });
  
  document.getElementById('answer2').addEventListener('click', function() {
    answerClicked('answer2');
  });
});
