// Elements
const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-square');

//Constants
const xsymbol = 'x';
const osymbol = 'o';



// Game Variables
let gameisReady = true;
let xisnext = true;
let winner = null;

//Functions
const lettertosymbol = (letter) => letter === 'x' ? xsymbol : osymbol;

const handlewin = (letter) => {
    gameisReady = false; 
    winner = letter;
    if (winner === 'x') {
        statusDiv.innerHTML = `${lettertosymbol(winner)} is the winner!`;
    } else {
    statusDiv.innerHTML = `<span>${lettertosymbol(winner)} is the winner!</span>`;
    }
}

const updategamestatus = () => {
   const topleft = cellDivs[0].classList[2]; 
   const topmiddle = cellDivs[1].classList[2]; 
   const topright = cellDivs[2].classList[2]; 
   const middleleft = cellDivs[3].classList[2]; 
   const middlemiddle = cellDivs[4].classList[2]; 
   const middleright = cellDivs[5].classList[2]; 
   const bottomleft = cellDivs[6].classList[2]; 
   const bottommiddle = cellDivs[7].classList[2]; 
   const bottomright = cellDivs[8].classList[2]; 

   console.log(topleft, topmiddle, topright, middleleft, 
   middlemiddle, middleright, bottomleft, bottommiddle, bottomright);


   //Who is the Winner?
   if (topleft && topleft === topmiddle && topleft === topright) {
     handlewin(topleft); 
   } else if (middleleft && middleleft === middlemiddle && middleleft 
   === middleright) {
     handlewin(middleleft);
   } else if (bottomleft && bottomleft === bottommiddle && bottomleft
   === bottomright) {
     handlewin(bottomleft);
   } else if (topleft && topleft === middleleft && topleft 
   === bottomleft) {
     handlewin(topleft);
   } else if (topmiddle && topmiddle === middlemiddle && topmiddle
   === bottommiddle) {
     handlewin(topmiddle);
   } else if (topright && topright === middleright && topright 
   === bottomright) {
     handlewin(topright);
   } else if (topleft && topleft === middlemiddle && topleft
   === bottomright) {
     handlewin(topleft);
   } else if (topright && topright === middlemiddle && topright
   === bottomleft) {
     handlewin(topright);
   } else if (topleft && topmiddle && topright && middleleft && middlemiddle && middleright && bottomleft && bottommiddle && bottomright) {
     gameisReady = false; 
     statusDiv.innerHTML = 'CAT GAME!!';
   } else {
     xisnext = !xisnext;
     if (xisnext) {
        statusDiv.innerHTML = `${xsymbol} is next`;
     } else {
       statusDiv.innerHTML = `<span>${osymbol} is next</span>`;
     }
   }
 
};

//Event Handlers
const handleReset = () => {
    xisnext = true;
    statusDiv.innerHTML = `${xsymbol} is next`;
    winner = null;
    for (const cellDiv of cellDivs) {
      cellDiv.classList.remove('x');
      cellDiv.classList.remove('o');
    }
    
};

const handleCellClick = (e) => {
    const classList = e.target.classList;
    const location = classList[1];
    

    if(classList[2] === 'x' || classList[2] === 'o') {
        return;
    }

    if (xisnext) {
      classList.add('x');
      updategamestatus();
    } else {
      classList.add('o');
      updategamestatus  
    }

};

// Event Listeners
resetDiv.addEventListener('click', handleReset);

for (const cellDiv of cellDivs) {
    cellDiv.addEventListener('click', handleCellClick)
}