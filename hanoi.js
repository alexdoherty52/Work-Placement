let moveCount = 0;
let gameInProgress = false;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.className);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const sourceDiskClass = data.split(" ")[1]; // Extract disk class name
  const sourceDiskSize = parseInt(sourceDiskClass.replace("disk", "")); // Extract disk size as an integer

  // Get the target tower element based on the drop position
  const targetTower = ev.target.closest('.tower');

  if (targetTower) {
    // Check if the target tower is empty or the dropped disk is smaller than the top disk on the target tower
    if (targetTower.children.length === 0 || sourceDiskSize < parseInt(targetTower.lastChild.className.split(" ")[1].replace("disk", ""))) {
        targetTower.appendChild(document.querySelector(`.${sourceDiskClass}`)); // Append the disk onto the target tower
        moveCount++;
        document.getElementById("moveCount").textContent = `Moves: ${moveCount}`;
        checkWin();
    } else {
        alert("Invalid move!");
    }
  } else {
    alert("Invalid drop area!"); // Alert if the drop occurs outside of any tower
  }
}

function checkWin() {
  if (document.getElementById('towerC').children.length === 3) {
    const disks = document.getElementById('towerC').children;
    if (parseInt(disks[0].classList[1].replace("disk", "")) === 3 && parseInt(disks[1].classList[1].replace("disk", "")) === 2 && parseInt(disks[2].classList[1].replace("disk", "")) === 1) {
      // Display the popup message
      document.getElementById("popupMoveCount").textContent = moveCount;
      document.getElementById("popup").style.display = "block";
      document.getElementById("overlay").style.display = "block";
    }
  }
}

document.getElementById("resetButton").addEventListener("click", () => {
  if (gameInProgress) {
    // Reset the game
    document.querySelectorAll(".tower").forEach(tower => {
      while (tower.firstChild) {
        tower.removeChild(tower.firstChild);
      }
    });
    moveCount = 0;
    document.getElementById("moveCount").textContent = `Moves: ${moveCount}`;
    document.getElementById("resetButton").textContent = "Play";
    gameInProgress = false;
  } else {
      // Start the game
      document.getElementById("towerA").innerHTML = `<div class="disk disk3" draggable="true" ondragstart="drag(event)"></div><div class="disk disk2" draggable="true" ondragstart="drag(event)"></div><div class="disk disk1" draggable="true" ondragstart="drag(event)"></div>`;
      document.getElementById("resetButton").textContent = "Reset";
      gameInProgress = true;
  }
});

// Close the popup when the close button is clicked
document.getElementById("popupCloseButton").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
});