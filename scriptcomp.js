let boxes = document.querySelectorAll(".boxcomp");
let winnerText = document.getElementById("winnerText");
let resetBtn = document.getElementById("resetBtn");
let nextBtn = document.getElementById("nextBtn");
let turntext=document.getElementById("turn");

let board = Array(9).fill("");
let gameOver = false;

let winningpattern = [
  [0, 1, 2], [0, 4, 8], [0, 3, 6],
  [1, 4, 7], [2, 4, 6],
  [2, 5, 8], [3, 4, 5], [6, 7, 8]
];

winnerText.innerHTML = "";
nextBtn.classList.add("hide");

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (box.innerHTML === "" && !gameOver) {
      box.innerHTML = "X";
      board[index] = "X";
      checkWinner();
      if (!gameOver) {
        turntext.innerHTML = "Computer's turn";
        setTimeout(computerMove, 400);
      }
    }
  });
});

function computerMove() {
  let bestMove = findBestMove();
  if (bestMove !== -1) {
    boxes[bestMove].innerHTML = "O";
    board[bestMove] = "O";
    checkWinner();
  }
  if (!gameOver) {
    turntext.innerHTML = "Player 1's turn";
  }
}


function findBestMove() {

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "O";
      if (checkPotentialWin("O")) {
        board[i] = "";
        return i;
      }
      board[i] = "";
    }
  }

  
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "X";
      if (checkPotentialWin("X")) {
        board[i] = "";
        return i;
      }
      board[i] = "";
    }
  }

  
  if (board[4] === "") return 4;

  
  let corners = [0, 2, 6, 8].filter(i => board[i] === "");
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  
  let remaining = board
    .map((val, i) => (val === "" ? i : null))
    .filter(i => i !== null);
  return remaining.length ? remaining[Math.floor(Math.random() * remaining.length)] : -1;
}


function checkPotentialWin(player) {
  return winningpattern.some(pattern => {
    let [a, b, c] = pattern;
    return (
      board[a] === player &&
      board[b] === player &&
      board[c] === player
    );
  });
}


function checkWinner() {
  for (let pattern of winningpattern) {
    let [a, b, c] = pattern;
    if (
      board[a] && board[a] === board[b] && board[b] === board[c]
    ) {
      winnerText.innerHTML = `🎉 Winner: ${board[a]}`;
      
      resetBtn.classList.add("hide");
      nextBtn.classList.remove("hide");
      disableBoxes();
      gameOver = true;
      return;
    }
  }

  
  if (!board.includes("") && !gameOver) {
    winnerText.innerHTML = "😅 It's a Draw!";
    resetBtn.classList.add("hide");
    nextBtn.classList.remove("hide");
    disableBoxes();
    gameOver = true;
  }
}


function disableBoxes() {
  boxes.forEach(box => {
    box.disabled = true
});
}


function resetGame() {
  boxes.forEach(box => {
    box.innerHTML = "";
    turntext.innerHTML="Player 1's turn";
    box.disabled = false;
  });
  board = Array(9).fill("");
  winnerText.innerHTML = "";
  resetBtn.classList.remove("hide");
  nextBtn.classList.add("hide");
  gameOver = false;
}


resetBtn.addEventListener("click", resetGame);
nextBtn.addEventListener("click", resetGame);
