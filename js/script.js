
let currentPlayer = "BLUE";
let board = ["", "", "", "", "", "", "", "", ""];
let playGame = true;

const winner = () => `Player ${currentPlayer} has won!`;
const isDraw = () => `Game ended in a draw!`;
const playersTurn = () => `It's ${currentPlayer}'s turn`;

const message = document.querySelector(".game--status");
message.innerHTML = playersTurn();

document.querySelectorAll(".cell").forEach(cell => cell.addEventListener("click", getCell));


/* Activate cell clicked on */
function cellClicked(cell, click) {
    if (currentPlayer == "BLUE") {
        board[click] = currentPlayer;
        cell.style.backgroundColor = "blue";
    } else {
        board[click] = currentPlayer;
        cell.style.backgroundColor = "orange";
    }
}

/* Determine which player's turn it is */
function changePlayer() {
    if (currentPlayer === "BLUE") {
        currentPlayer = "ORANGE";
    } else {
    currentPlayer = "BLUE";
    }
    message.innerHTML = playersTurn();
}

/* Determine win conditions via array */
const winningBoard = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/* Determine if round has been won */
function gameStatus() {
    let win = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningBoard[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            win = true;
            break
        }
    }


    /*Display winner */
    if (win) {
        message.innerHTML = winner();
        playGame = false;
        return;
    }

    /* Display if round is a draw */
    let draw = !board.includes("");
    if (draw) {
        message.innerHTML = isDraw();
        playGame = false;
        return;
    }

    changePlayer();
}

/* Get cell clicked */
function getCell(cellEvent) {
    const cell = cellEvent.target;
    const click = parseInt(cell.getAttribute("data-cell-index"));

    if (board[click] !== "" || !playGame) {
        return;
    }

    cellClicked(cell, click);
    gameStatus();
}

document.querySelector(".game--restart").addEventListener("click", restartGame);

/* Restart game */
function restartGame() {
    playGame = true;
    currentPlayer = "BLUE";
    board = ["", "", "", "", "", "", "", "", ""];
    message.innerHTML = playersTurn();
    document.querySelectorAll(".cell").forEach(cell => cell.style.backgroundColor = "white");
    document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
    ;
}
