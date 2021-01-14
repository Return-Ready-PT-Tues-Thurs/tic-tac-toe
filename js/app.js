const boxes = Array.from(document.getElementsByClassName('box'));
const playText = document.getElementById('playText');
const restartBtn = document.getElementById('restartB');
const spaces = [];
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer;

const drawboard = () => {
    boxes.forEach((box, index) => {
        let styleString = '';
        if (index <3) {
            styleString += `border-bottom: 5px solid var(--midnightgreen);`;
        }
        if(index % 3 === 0){
            styleString += `border-right: 5px solid var(--midnightgreen);`;
        }
        if(index % 3 === 2){
            styleString += `border-left: 5px solid var(--midnightgreen);`;
        }
        if (index > 5) {
            styleString += `border-top: 5px solid var(--midnightgreen);`;
        }
        box.style = styleString;
        box.addEventListener('click', boxClicked) 
    });
};

const boxClicked = (e) => { 
    const id = e.target.id;
    if(!spaces[id]){
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
      
        if(playerHasWon()){
            playText.innerText = `${currentPlayer} has won!`;
            return;
        }       
        changeBackGround(id, currentPlayer);
        currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
    }
};

function changeBackGround(id, currentPlayer){
  let elem = document.getElementById(id);
  let color = "";
  let orange = "#f1871b"; 
  let blue = "#2b7fb0";
  
  if(currentPlayer === O_TEXT){
     color = orange;
     elem.style.background = color;
  } else if(currentPlayer === X_TEXT){
     color = blue; 
     elem.style.background = color;
  }
}

const playerHasWon = () => {
    if(spaces[0] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
            console.log(`${currentPlayer} wins up top`)
            return true;
        }
        if(spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
            console.log(`${currentPlayer} wins on the left`)
            return true;
        }
        if(spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
            console.log(`${currentPlayer} wins diagnally`)
            return true;
        }
    }
    if(spaces[8] === currentPlayer){
        if(spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins on the right`)
            return true;
        }
        if(spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins on the bottom`)
            return true;
        }
    }
    if(spaces[4] === currentPlayer){
        if(spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
            console.log(`${currentPlayer} wins vertically in the middle`)
            return true;
        }        
        if(spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
            console.log(`${currentPlayer} wins horizontally in the middle`)
            return true;
        }    
    } if(spaces[6] === currentPlayer){
        if(spaces[4] === currentPlayer && spaces[2] === currentPlayer) {
            return true;
        }            
    }
};

function restart() {
    spaces.forEach((space, index) => {
        spaces[index] = null;
    });
    boxes.forEach((box) => {
        box.innerText = '';
    });
    playText.innerText = `Let's Play!`;
    currentPlayer = X_TEXT;

}
restartBtn.addEventListener('click', restart);
restart();
// changeBackGround();
drawboard(); 

