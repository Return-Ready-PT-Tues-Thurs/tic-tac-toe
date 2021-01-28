
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
 
  let board;
  let turn = "X";
  let win;
  

  const squares = Array.from(document.querySelectorAll("#board div"));
  const messages = document.querySelector("h2");
  
  document.getElementById("board").addEventListener("click", handleTurn);
  document.getElementById("reset-button").addEventListener("click", init);
  

  function init() {
    board = ["", "", "", "", "", "", "", "", ""];
  
    render();
  }

  init();
  
  function render() {
    for (let i = 0; i < board.length; i++) {
      squares[i].textContent = board[i];
    }

    if (win === "T") {
      messages.textContent = `That's a tie!`;
    } else if (win) {
      messages.textContent = `${turn} wins the game!`;
    } else {
      messages.textContent = `It's ${turn}'s turn!`;
    }
  }
  
  function handleTurn(event) {
    let idx = squares.findIndex(function (square) {
      return square === event.target;
    });

    board[idx] = turn;
  
    const playerPositions = getPlayerPosition(turn, board);
    let isWin = playerPositionIncludesWinningCombo(
      playerPositions,
      winningCombos
    );
    let isTie = board.every((cell) => cell !== "") && !win;
    if (win) {
      win = isWin;
    } else if (isTie) {
      win = "T";
    } else {
      if (turn === "X") {
        turn = "O";
      } else {
        turn = "X";
      }
    }
  

    render();
  }
  
  function getPlayerPosition(currentTurn, board) {
    const playerPositions = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] == currentTurn) {
        playerPositions.push(i);
      }
    }
    return playerPositions;
  }
  
  function playerPositionIncludesWinningCombo(playerPositions, winningCombos) {
    return winningCombos.some((winningCombo) => {
      const isWin = winningCombo.every((position) =>
        playerPositions.includes(position)
      );
      return isWin;
    });
  }