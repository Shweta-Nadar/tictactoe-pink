let boxes = document.querySelectorAll(".box");
let output = document.querySelector(".result");
let winnerText = document.getElementById("winnerText");
let resetBtn = document.getElementById("resetBtn");
let nextBtn = document.getElementById("nextBtn");
let turnText = document.getElementById("turnText");

let turn0 = true;

let winningpattern = [
  [0, 1, 2], [0, 4, 8], [0, 3, 6],
  [1, 4, 7], [2, 4, 6],
  [2, 5, 8], [3, 4, 5], [6, 7, 8]
];

winnerText.innerHTML = "";
nextBtn.classList.add("hide");

boxes.forEach((box) => {
  box.addEventListener("click", function () {
    if (box.innerHTML === "") {
      box.innerHTML = turn0 ? "O" : "X";
      turn0 = !turn0;
      turnText.innerHTML = turn0 ? "Player 2's turn" : "Player 1's turn";
      winner();
    }
  });
});

let winner = () => {
  for (let pattern of winningpattern) {
    let pos1 = boxes[pattern[0]].innerHTML;
    let pos2 = boxes[pattern[1]].innerHTML;
    let pos3 = boxes[pattern[2]].innerHTML;

    if (pos1 && pos2 && pos3 && pos1 === pos2 && pos2 === pos3) {
      winnerText.innerHTML = `🎉 Winner: ${pos1}`;
      resetBtn.classList.add("hide");
      nextBtn.classList.remove("hide");
      disable();
      return;
    }
  }

  let isDraw = true;
  boxes.forEach((box) => {
    if (box.innerHTML === "") {
      isDraw = false;
    }
  });

  if (isDraw) {
    winnerText.innerHTML = "😅 It's a Draw!";
    resetBtn.classList.add("hide");
    nextBtn.classList.remove("hide");
    disable();

  }
};

let disable = () => {
  boxes.forEach((box) => {
    box.disabled = true;
    turn0=true;
  });
};

let reset = () => {
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.disabled = false;
  });
  winnerText.innerHTML = "";
  turnText.innerHTML = turn0 ? "Player 2's turn" : "Player 1's turn";
  nextBtn.classList.add("hide");
  resetBtn.classList.remove("hide");
  turn0 = true;
};

nextBtn.addEventListener("click", reset);
resetBtn.addEventListener("click", reset);
