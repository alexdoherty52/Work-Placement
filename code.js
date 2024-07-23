// Define variables
var order = [];
var playerOrder = [];
var flash;
var turn;
var good;
var compTurn;
var intervalId;


var on = false;
var win;


// Define variables for game elements
var turnCounter = document.querySelector("#next");
var topLeft = document.querySelector("#tleft");
var topRight = document.querySelector("#tright");
var bottomLeft = document.querySelector("#bleft");
var bottomRight = document.querySelector("#bright");

var onButton = document.querySelector("#on");
var startButton = document.querySelector("#start");




onButton.addEventListener('click', function(event) {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', function(event) {
  if (on || win) {
    play();
  }
});


//  play function
function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  
  for (var i = 0; i < turn; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  
  compTurn = true;
  intervalId = setInterval(gameTurn, 800);
}

//  gameTurn function
function gameTurn() {
  on = false;

  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
    flash = 0;
  }

  if (compTurn) {
    clearColor();
    setTimeout(function() {
      if (order[flash] == 1) {
        one();
      } else if (order[flash] == 2) {
        two();
      } else if (order[flash] == 3) {
        three();
      } else if (order[flash] == 4) {
        four();
      }
      flash++;
    }, 
    200);
  }
}

//  color functions
function one() {
  topLeft.style.backgroundColor = "lightgreen";
}

function two() {
  topRight.style.backgroundColor = "tomato";
}

function three() {
  bottomLeft.style.backgroundColor = "yellow";
}

function four() {
  bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomLeft.style.backgroundColor = "goldenrod";
  bottomRight.style.backgroundColor = "darkblue";
}

function flashColor() {
  topLeft.style.backgroundColor = "lightgreen";
  topRight.style.backgroundColor = "tomato";
  bottomLeft.style.backgroundColor = "yellow";
  bottomRight.style.backgroundColor = "lightskyblue";
}

// Add event listeners for game elements
topLeft.addEventListener('click', function(event) {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(function() {
        clearColor();
      }, 300);
    }
  }
});

topRight.addEventListener('click', function(event)
{
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(function() {
      clearColor();
      }, 300);
      }
      }
      });

    bottomLeft.addEventListener('click', function(event) {
      if (on) {
      playerOrder.push(3);
      check();
      three();
      if(!win) {
      setTimeout(function() {
      clearColor();
      }, 300);
      }
      }
      });
      
      bottomRight.addEventListener('click', function(event) {
      if (on) {
      playerOrder.push(4);
      check();
      four();
      if (!win) {
      setTimeout(function() {
      clearColor();
      }, 300);
      }
      }
      });
      
      
 //  check function
function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
    good = false;
  }

  if (playerOrder.length == turn && good) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    order = order.slice();
    var randomIndex = Math.floor(Math.random() * 4) + 1;
    order.push(randomIndex);
    intervalId = setInterval(gameTurn, 800);
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(function() {
      turnCounter.innerHTML = turn;
      clearColor();
      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
      // Update personal high score if current score is higher
      updatePersonalHighScore(turn - 1);
      // Reset the game if player loses
      if (!strict) {
        play();
      }
    }, 800);
  }

  if (turn == playerOrder.length && good && !win) {
    if (turn == 20) {
      winGame();
    } else {
      turn++;
      playerOrder = [];
      compTurn = true;
      flash = 0;
      turnCounter.innerHTML = turn;
      order = order.slice();
      var randomIndex = Math.floor(Math.random() * 4) + 1;
      order.push(randomIndex);
      intervalId = setInterval(gameTurn, 800);
    }
  }
}


  
  //  winGame function
  function winGame() {
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;
  
    // Call updatePersonalHighScore with the current score
    updatePersonalHighScore(turn - 1);
  }

  // Set the initial personal high score to 0
  let personalHighScore = 0;

  const highScoreElement = document.getElementById("high-score");

  // Function to update the personal high score
  function updatePersonalHighScore(score) {
    if (score > personalHighScore) {
      personalHighScore = score;
      highScoreElement.textContent = personalHighScore;
    }
  }
  
  

  


  