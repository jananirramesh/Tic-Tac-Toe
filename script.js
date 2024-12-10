const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const winCaptions = [
  "Yay! You did it! 🎉",
  "Woop Woop! You win! 😎",
  "Victory is yours! 💖",
  "Yasss! You are the winner! 😍"
];

function handleClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");

  if (gameBoard[index] !== "" || !gameActive) return;

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkWinner();
  switchPlayer();
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  for (const condition of winConditions) {
    const [a, b, c] = condition;

    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      showWinMessage();
      highlightWinningCells([a, b, c]);
      return;
    }
  }

  if (!gameBoard.includes("")) {
    gameActive = false;
    statusText.textContent = "It's a draw! 😔";
    setTimeout(() => alert("Aww... It's a draw! 😢"), 300);
  }
}

function highlightWinningCells(cellsToHighlight) {
  cellsToHighlight.forEach(index => {
    cells[index].style.backgroundColor = "#ffb3cc";
  });
}

function showWinMessage() {
  const caption = winCaptions[Math.floor(Math.random() * winCaptions.length)];
  statusText.innerHTML = `${caption} <span class="win-caption">Player ${currentPlayer} wins!</span>`;
}

function resetGame() {
  gameBoard.fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.backgroundColor = "#fff";
  });
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);

// Initialize game
statusText.textContent = `Player ${currentPlayer}'s turn`;
