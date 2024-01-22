// algorithme de melange de fisher-yates
function shuffleChildren(parent) {
  let children = parent.children;
  let i = children.length,
    k,
    temp;
  while (--i > 0) {
    k = Math.floor(Math.random() * (i + 1));
    temp = children[k];
    children[k] = children[i];
    parent.appendChild(temp);
  }
}

// gestion des messages
function showReaction(type, clickedBox) {
  clickedBox.classList.add(type);
  if (type !== "success") {
    setTimeout(function () {
      clickedBox.classList.remove(type);
    }, 800);
  }
}

const box = document.createElement("div");
box.classList.add("box");
// board.appendChild(box);
const board = document.querySelector("#board");

let nombreBoite = prompt("nombre de boites?");
let nb = 1;

for (let i = 1; i <= nombreBoite; i++) {
  const newbox = box.cloneNode();
  newbox.innerText = i;
  board.appendChild(newbox);
  // startTimer();
  resetStopwatch();
  startStopwatch();

  newbox.addEventListener("click", function () {
    if (i == nb) {
      newbox.classList.add("box-clicked");
      shuffleChildren(board);
      if (nb == board.children.length) {
        board.querySelectorAll(".box").forEach(function (box) {
          showReaction("success", box);
        });
        stopStopwatch();
        alert(
          `bravo ! vous avez terminé(e) en ${result}, c'est impressionant !`
        );
      }

      nb++;
    } else if (i > nb) {
      showReaction("error", newbox);
      nb = 1;
      board.querySelectorAll(".box-clicked").forEach(function (validBox) {
        validBox.classList.remove("box-clicked");
      });
      shuffleChildren(board);
      resetStopwatch();
      startStopwatch();
    } else {
      showReaction("notice", newbox);
    }

    console.log("Boite n°" + i + ", click !");
  });
}

shuffleChildren(board);

// function startTimer() {
//   let count = 60;
//   document.getElementById("timer").innerHTML = count;
//   const timer = setInterval(function () {
//     count--;
//     // console.log(count);
//     document.getElementById("timer").innerHTML = count;
//     if (nb == board.children.length) {
//       clearInterval(timer);
//       alert(`bravo ! il vous restait ${count} secondes !`);
//     } else if (count === 0) {
//       clearInterval(timer);
//       alert("Temps écoulé !");
//     }
//   }, 1000);
// }

var startTime; // to keep track of the start time
var stopwatchInterval; // to keep track of the interval
var elapsedPausedTime = 0; // to keep track of the elapsed time while stopped

function startStopwatch() {
  if (!stopwatchInterval) {
    startTime = new Date().getTime() - elapsedPausedTime; // get the starting time by subtracting the elapsed paused time from the current time
    stopwatchInterval = setInterval(updateStopwatch, 1000); // update every second
  }
}

function stopStopwatch() {
  clearInterval(stopwatchInterval); // stop the interval
  elapsedPausedTime = new Date().getTime() - startTime; // calculate elapsed paused time
  stopwatchInterval = null; // reset the interval variable
}

function resetStopwatch() {
  stopStopwatch(); // stop the interval
  elapsedPausedTime = 0; // reset the elapsed paused time variable
  document.getElementById("timer").innerHTML = "00:00:00"; // reset the display
}

var result = "0 min 0 seconde3s"; // Initialize result variable

function updateStopwatch() {
  var currentTime = new Date().getTime(); // get current time in milliseconds
  var elapsedTime = currentTime - startTime; // calculate elapsed time in milliseconds
  var seconds = Math.floor(elapsedTime / 1000) % 60; // calculate seconds
  var minutes = Math.floor(elapsedTime / 1000 / 60) % 60; // calculate minutes
  var hours = Math.floor(elapsedTime / 1000 / 60 / 60); // calculate hours

  document.getElementById("timer").innerHTML =
    pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
  result = minutes + " min " + seconds + " secondes";
}

function pad(number) {
  // add a leading zero if the number is less than 10
  return (number < 10 ? "0" : "") + number;
}
