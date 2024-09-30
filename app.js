/*-------------------------------- Constants --------------------------------*/
// this array saves all the winning combos
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


/*---------------------------- Variables (state) ----------------------------*/
// this saves variables for the boxes in board, for who's turn it is in turn, for if there is a winner or not
// and if there is a tie or not
let board, turn, winner, tie


/*------------------------ Cached Element References ------------------------*/
// functionality caches
// this const caches all the boxes together
const squareElement = document.querySelectorAll(".sqr");
// this const caches the status message
const messageElement = document.querySelector("#message");
// this const caches the reset button
const resetButtonElement = document.querySelector("#reset")

// css caches
// this const caches the body
const bodyElement = document.body;

/*-------------------------------- Functions --------------------------------*/
// this is the beginning function, the boxes are empty, it's x's turn, there is no winner not a tie
const init = () => {
  board = ['', '', '', '', '', '', '', '', '']
  turn = "x"
  winner = false
  tie = false
}

// this one is the one that marks the boxes
const updateBoard = () => {
  squareElement.forEach((square, index) => {
    square.textContent=board[index]
  });
}

// this one changes the status and tells who the winner is
const updateMessage = () =>{
  if (!winner && !tie){
    messageElement.textContent=`it's ${turn}'s turn`
  }

  else if(!winner && tie){
    messageElement.textContent=`it's a tie`
    bodyElement.style.background="#FFFFFF"
  }

  else {
    messageElement.textContent=`${turn} has won`
  }
}

// this function calls for visual updates
const render = () =>{
  updateBoard();
  updateMessage();
}

// this one fills the board array with appropriate values
const placePiece = (index) =>{
  board[index]=turn
}

// this one checks if there is a winner based on the winning combos
const checkForWinner = () =>{
  winningCombos.forEach((combo)=>{
    if (board[combo[0]]==="" || board[combo[1]]==="" || board[combo[2]]===""){
    }

    else if (board[combo[0]]==="x" && board[combo[1]]==="x" && board[combo[2]]==="x"){
      winner=true
    }

    else if (board[combo[0]]==="o" && board[combo[1]]==="o" && board[combo[2]]==="o"){
      winner=true
    } 
  })
}

// this one checks if there is a tie
const checkForTie = () =>{
  if(winner){
    return;
  }

  else {for(i=0; i<board.length; i++){
    if(board[i]===""){
      return;
    }
  }
  
  tie = true
  }
}

// this one changes the turn of the player
const switchPlayerTurn = () =>{
  if(winner){
    return
  }

  else{
    if(turn==="x"){
      turn="o"
      bodyElement.style.background="#D09CC0"
      resetButtonElement.style.background="#CC49C6"
    }
    else{
      turn="x"
      bodyElement.style.background="#E2EBD1"
      resetButtonElement.style.background="#1E4127"
    }
  }
}

// this is the function that decides what to do when a box is clicked
const handleClick = (event) => {
  
  // don't work if there's a winner or a tie
  if(winner || tie){
    return;
  }

  // don't allow clicking something that's already been clicked
  const squareIndex = event.target.id
  if(board[squareIndex]!=""){
    return;
  }

  // if it's safe, continue
  placePiece(squareIndex)
  checkForWinner()
  checkForTie()
  switchPlayerTurn()
  render()
}

// this is the call for the start function
init ();
/*----------------------------- Event Listeners -----------------------------*/
squareElement.forEach(square => {
  square.addEventListener('click', (event)=>{
    handleClick(event);
  })
});

resetButtonElement.addEventListener('click', init)