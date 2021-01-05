const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "BLUE";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

/* Determine win conditions via array */
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

/* Activate cell clicked on */
function handleCellPlayed(clickedCell, clickedCellIndex) {
    if (currentPlayer == "BLUE") {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.style.backgroundColor = "blue";
    } else {
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.style.backgroundColor = "orange";
    }
}

/* Determine which player's turn it is */
function handlePlayerChange() {
    currentPlayer = currentPlayer === "BLUE" ? "ORANGE" : "BLUE";
    statusDisplay.innerHTML = currentPlayerTurn();
}

/* Determine if round has been won */
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    /*Display winner */
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    /* Display if round is a draw */
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

/* Get cell clicked */
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

/* Restart game */
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "BLUE";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.style.backgroundColor = "white");
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    ;
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);