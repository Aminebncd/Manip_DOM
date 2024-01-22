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
  startTimer();

  newbox.addEventListener("click", function () {
    if (i == nb) {
      newbox.classList.add("box-clicked");
      shuffleChildren(board);
      if (nb == board.children.length) {
        board.querySelectorAll(".box").forEach(function (box) {
          showReaction("success", box);
        });
      }

      nb++;
    } else if (i > nb) {
      showReaction("error", newbox);
      nb = 1;
      board.querySelectorAll(".box-clicked").forEach(function (validBox) {
        validBox.classList.remove("box-clicked");
      });
      shuffleChildren(board);
    } else {
      showReaction("notice", newbox);
    }

    console.log("Boite n°" + i + ", click !");
  });
}

shuffleChildren(board);

function startTimer() {
  let count = 60;
  document.getElementById("timer").innerHTML = count;
  const timer = setInterval(function () {
    count--;
    // console.log(count);
    document.getElementById("timer").innerHTML = count;
    if (count === 0) {
      clearInterval(timer);
      alert("Temps écoulé !");
      //   console.log("Time's up!");
    }
  }, 1000);
}
