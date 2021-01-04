let board_data = document.querySelectorAll(".board_data");
let title = document.querySelector('#title');
let button = document.querySelector('.button');
let player1 = [];
let player2 = [];
let currentPlayer = 0;

button.addEventListener('click', reset);

const winningValue = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];
function checkWinner(){
    for ( let i=0; i<winningValue.length; i++){
          const isWin =  winningValue[i].every(function(positionInWinningCombination){
              if(currentPlayer == 0){
            return player1.includes(positionInWinningCombination);
              }
              else {
                return player2.includes(positionInWinningCombination);
              }
            })
        if (isWin){
            if (currentPlayer == 0){
                title.innerHTML = "Orange wins!";
            }
            else{
                title.innerHTML = 'Blue wins!';
            }
            endGame();
            break;
        }
        
    }
}

function color (event){
    if(event.target.innerHTML == ""){
        if(currentPlayer == 0){
            let p1Score = event.target.id;
            player1.push(parseInt(p1Score)); 
            event.target.style.backgroundColor ="orange";
            title.innerHTML = "Blue's turn"
            event.target.innerHTML = 'x';
            checkWinner();
            currentPlayer = 1;
           
        }
        else {
            let p2Score = event.target.id;
            player2.push(parseInt(p2Score));
            event.target.style.backgroundColor ="blue";
            event.target.innerHTML = 'o';
            title.innerHTML = "Orange's turn";
            checkWinner();
            currentPlayer = 0;
            
        }
    }
}

function startGame(){
    title.innerHTML = "Tic Tac Toe";
    for (let i=0; i < board_data.length; i++){
        board_data[i].addEventListener('click', color);
    }
}

function endGame(){
    for (let i=0; i < board_data.length; i++){
        board_data[i].innerHTML = "";
        board_data[i].removeEventListener('click', color);
    }
}
function reset (){
    console.log('hello');
    endGame();
    for (let i=0; i < board_data.length; i++){
        board_data[i].style.backgroundColor ="white";
    }
    player1 = [];
    player2 = [];
    currentPlayer = 0;
    startGame();
}


startGame();

