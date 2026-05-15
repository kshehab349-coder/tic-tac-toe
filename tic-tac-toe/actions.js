const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", cellClick);
});

function cellClick() {

    if (this.textContent !== "" || !gameActive) {
        return;
    }

    this.textContent = currentPlayer;
    this.classList.add(currentPlayer.toLowerCase());

    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer} Turn`;
    }
}

function checkWinner() {

    let winnerFound = false;

    winningConditions.forEach(condition => {

        const a = cells[condition[0]].textContent;
        const b = cells[condition[1]].textContent;
        const c = cells[condition[2]].textContent;

        if (a === "" || b === "" || c === "") {
            return;
        }

        if (a === b && b === c) {
            winnerFound = true;
        }

    });

    if (winnerFound) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    let draw = true;

    cells.forEach(cell => {
        if (cell.textContent === "") {
            draw = false;
        }
    });

    if (draw) {
        statusText.textContent = "Draw!";
        gameActive = false;
    }
}

function restartGame() {

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });

    currentPlayer = "X";
    gameActive = true;

    statusText.textContent = "Player X Turn";
}