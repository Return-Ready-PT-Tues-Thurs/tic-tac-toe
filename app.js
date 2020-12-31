let board_data = document.querySelectorAll(".board_data");
console.log(board_data);

for (let i=0; i < board_data.length; i++){
    board_data[i].addEventListener('click', function(event){
        event.target.style.backgroundColor ="black";
        console.log(event);
    });
}