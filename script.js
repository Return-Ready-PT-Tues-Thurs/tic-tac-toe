// variables for x and o
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

// must call start game function to initate game.
startGame()

// each time the restart button is clicked, it will call the startGame() function.
restartButton.addEventListener('click', startGame)

// only want { once: true } to happen once. cirlceTurn is set to false. X will play first.
function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

// placeMark
// check for win
// check for draw
// swap turns

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

// if it's not a draw, we select the winning message. Winning message checks to see if X or O's wins and prints out string.
// we need to ('show') winning message.
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

// make sure every cell has and x or o class, we want to return true because its a draw.
function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

// will keep placing x until fuction's condition is false

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

// circle's turn will be set to the oppostie of cirlce's turn. "!" means "the opposite of". 
// So if the variable contains "false", then putting "!" in front will make the result "true".. 
function swapTurns() {
  circleTurn = !circleTurn
}

// hover function removes x and o. If user is hovering over cell and it's cricle's turn add circle class else add x class.
function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

// will loop over all winning combinations. If the current class is in all 3 three cells for one of the winning combinations, we have a winner.
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}