var playerRed="R";
var playerYell="Y";
var currPlayer=playerRed;
var gameOver=false;
var rows=6;
var columns=7;
var board;
var emptyRounds=[];
var winRounds=[];
window.onload=function(){
    setGame();
}
function setGame(){
    winner.innerText="Red Turn";
    winner.style.color="red";
    board=[];
    emptyRounds=[5, 5, 5, 5, 5, 5, 5];
    for(let r=0;r<rows;r++){
        let row=[];
        for(let c=0;c<columns;c++){
        row.push(' ');
        let round=document.createElement("div");
        //html
        //<div id="round">"0-0"</div>
        round.id=r.toString()+"-"+c.toString();
        round.classList.add("round");
        round.addEventListener("click",setColor);
        document.getElementById("board").append(round);

       }
       board.push(row);
    }
}


function setColor(){
    if(gameOver){
        return;
    }
    //splitting cooardinates of board from "0-0" -> [0][0]
    let coordinates=this.id.split("-");
    let r=parseInt(coordinates[0]);
    let c=parseInt(coordinates[1]);
    r= emptyRounds[c];
    console.log(r);
    if(r<0){
        return;
    }
    board[r][c]=currPlayer;
    let round=document.getElementById(r.toString()+ "-" +c.toString());
    if(currPlayer == playerRed){
       round.classList.add("redPiece");
       currPlayer=playerYell;
       winner.innerText="Yellow Turn";
       winner.style.color="yellow";
    }
    else
    {
        round.classList.add("yellowPiece");
        currPlayer=playerRed;
        winner.innerText="Red Turn";
        winner.style.color="red";
    }
    r-=1;
    emptyRounds[c]=r;
    checkWinner();
    checkTie(board);

}
function checkWinner(){
    //checking horizontallay
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns-3;c++)
        {
            if(board[r][c]!=' '){
               if(board[r][c]==board[r][c+1] && board[r][c+1]==board[r][c+2] && board[r][c+2]==board[r][c+3]){
                winRounds=[ [r,c],[r,c+1],[r,c+2],[r,c+3] ];
                setWinner(r,c);
                return;
               }
            }
        }
    }

    //checking vertically

    for(let r=0;r<rows-3;r++){
        for(let c=0;c<columns;c++){
            if(board[r][c]!=' '){
                if(board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c]==board[r+3][c]){
                    winRounds=[ [r,c],[r+1,c],[r+2,c],[r+3,c] ];
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //checking diagonally
    for(let r=3;r<rows;r++){
        for(let c=0;c<columns-3;c++){
            if(board[r][c]!=' '){
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3] ){
                    winRounds=[ [r,c],[r-1,c+1],[r-2,c+2],[r-3,c+3] ];
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

    //Anti-diagonally(from left to right)
    for(let r=0;r<rows-3;r++){
        for(let c=0;c<columns-3;c++){
            if(board[r][c]!=' '){
                if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3] ){
                    winRounds=[ [r,c],[r+1,c+1],[r+2,c+2],[r+3,c+3] ];
                    setWinner(r,c);
                    return;
                }
               

        }
    }
}
}


function setWinner(row,col){
    if(board[row][col]==playerRed){
        setWinColor(winRounds);
        winner.innerText="Red Wins";
        winner.style.color="red";
    }
    else
    {
        setWinColor(winRounds);
        winner.innerText="Yellow Wins";
        winner.style.color="yellow";
    }
     gameOver=true;
     setTimeout(resetBoard,3000);
}
function checkTie(board) {
    if (isBoardFull(board)) {
        winner.innerText = "TIE!";
        winner.style.color="red";
        gameOver = true;
        setTimeout(resetBoard,3000);
    }
}

function isBoardFull(board) {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === ' ') {
                return false;
            }
        }
    }
    return true; 
}
function setWinColor(winRounds){
    for(let i=0;i<winRounds.length;i++){
        let [row,col]=winRounds[i];
        let round=document.getElementById(row.toString()+"-"+col.toString());
        round.classList.add("goldpiece");
    }
}
function resetBoard() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            board[r][c] = ' ';
            let round = document.getElementById(r.toString() + "-" + c.toString());
            round.classList.remove("redPiece", "yellowPiece");
            round.classList.remove("goldpiece");
        }
    }
    emptyRounds = [5, 5, 5, 5, 5, 5, 5];
  
    gameOver = false;
    if(currPlayer==playerRed){
        winner.innerText="Red Turn";
        winner.style.color="red";
    }
    else {
        winner.innerText="Yellow Turn";
        winner.style.color="yellow";
      }

}
