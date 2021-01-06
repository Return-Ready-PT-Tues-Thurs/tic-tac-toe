let board_data = document.querySelectorAll(".board_data");
let title = document.querySelector('#title');
let button = document.querySelector('.button');
let player1 = [];
let player2 = [];
let currentPlayer = 0;
let play = function(){document.getElementById("audio").play()}
let end = function(){document.getElementById("winnerAudio").play()}

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
                end();
            }
            else{
                title.innerHTML = 'Blue wins!';
                end();
            }
            endGame();
            break;
        }
        
    }
   const isTie = checkTie();
   if(isTie){
    changeTextToIsTie();
   }
}

function color (event){
    if(event.target.innerHTML == ""){
        if(currentPlayer == 0){
            let p1Score = event.target.id;
            player1.push(parseInt(p1Score)); 
            event.target.style.backgroundColor ="#F29E4C";
            title.innerHTML = "Blue's turn"
            event.target.innerHTML = 'x';
            event.target.classList.add("board_data_style");
            play();
            checkWinner();
            currentPlayer = 1;
           
        }
        else {
            let p2Score = event.target.id;
            player2.push(parseInt(p2Score));
            event.target.style.backgroundColor ="#048BA8";
            event.target.innerHTML = 'o';
            event.target.classList.add("board_data_style");
            title.innerHTML = "Orange's turn";
            play();
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
        board_data[i].style.backgroundColor ="#dae0df";
        if (board_data[i].classList.contains("board_data_style")) {
            board_data[i].classList.remove("board_data_style");
        
          }
    }
    player1 = [];
    player2 = [];
    currentPlayer = 0;
    startGame();
}

function checkTie(){
    const isTie = [...board_data].every(({innerText}) => innerText.length !==0);
    return isTie;
}
function changeTextToIsTie(){
    title.innerText = "It's a tie, try again"
}

startGame();