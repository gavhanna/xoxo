
(function(){
  let human = "X";
  let ai = "O";
  let modal = document.querySelector(".modal");
  let squares = document.querySelectorAll(".square");
  let replayButton = document.getElementById("replayButton");
  let currentBoard = [0, 1, 2, 
    3, 4, 5, 
    6, 7, 8];
    // icons
    let X = document.getElementById("X");
    let O = document.getElementById("O");
    
  replayButton.addEventListener("click", restartGame, false);
  X.addEventListener("click", iconSelect, false);
  O.addEventListener("click", iconSelect, false);

  function iconSelect(e) {
    human = e.target.id;
    ai = human === "X" ? "O" : "X";
    squares.forEach(el => {
      el.addEventListener("click", clickSquare, false);
    });
    document.getElementById("choose-icon").style.display = "none";
  }

  function removeEventListeners() {
    squares.forEach(el => {
      el.removeEventListener("click", clickSquare, false);
    });
  }

  function clickSquare(e) {
    const id = e.target.id;
    takeTurn(id, human);
    document.getElementById(id).removeEventListener("click", clickSquare, false);
    if (checkForWin(human, currentBoard)) {
      popupModal("You won!");
      removeEventListeners();
    } else if (checkForWin(ai, currentBoard)) {
      popupModal("You lost :(");
      removeEventListeners();
    } else if (checkForDraw()) {
      popupModal("It's a draw!");
      removeEventListeners();
    }
    
  }

  function takeTurn(square, player) {
    const el = document.getElementById(square).childNodes[0];
    el.innerText = player;
    currentBoard[square] = player;
    AITurn();
  }

  function AITurn() {
    let empties = getEmptySquares(currentBoard);
    if (empties.length === 0) return;
    let guess = minimax(currentBoard, ai).index;
    console.log(guess);
    
    let square = document.getElementById(guess).childNodes[0];
    document.getElementById(guess).removeEventListener("click", clickSquare, false);
    square.innerText = ai;
    
    currentBoard[guess] = ai;
  }

  function getEmptySquares(newBoard) {
    let emptySquares = [];
    for (let i = 0; i < newBoard.length; i++) {
      if (!isNaN(newBoard[i])) {
        emptySquares.push(i);
      }
    }
    return emptySquares;
  }

  function checkForWin(player, board) {
    if (board[0] === player && board[1] === player && board[2] === player) {
      return true;
    } else if (board[3] === player && board[4] === player && board[5] === player) {
      return true;    
    } else if (board[6] === player && board[7] === player && board[8] === player) {
      return true;    
    } else if (board[0] === player && board[3] === player && board[6] === player) {
      return true;
    } else if (board[1] === player && board[4] === player && board[7] === player) {
      return true;
    } else if (board[2] === player && board[5] === player && board[8] === player) {
      return true;
    } else if (board[2] === player && board[4] === player && board[6] === player) {
      return true;
    } else if (board[0] === player && board[4] === player && board[8] === player) {
      return true;
    } else {
      return false;
    }
  }

  function checkForDraw() {
    let emptySquares = getEmptySquares(currentBoard);
    if (emptySquares.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  function minimax(newBoard, player) {
    let empties = getEmptySquares(newBoard);

    if (checkForWin(human, newBoard)) {
      return {score: -10}
    } else if (checkForWin(ai, newBoard)) {
      return {score: 10}
    } else if (empties.length === 0) {
      return {score: 0}
    }

    let moves = [];
    for (let i = 0; i < empties.length; i++) {
      let move = {};
      move.index = newBoard[empties[i]];
      
      newBoard[empties[i]] = player;

      if (player === ai) {
        let result = minimax(newBoard, human);
        move.score = result.score;
      } else {
        let result = minimax(newBoard, ai);
        move.score = result.score;
      }

      newBoard[empties[i]] = move.index;
      moves.push(move);
    }

    let bestMove;
    if (player === ai) {
      let bestScore = -1000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
          
        }
      }
    } else {
      let bestScore = 1000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
          
        }
      }
    }
    
    return moves[bestMove];
  }

  function popupModal(message) {
    modal.childNodes[1].innerText = message;
    modal.style.display = "block";
  }

  function restartGame() {
    currentBoard = [0, 1, 2, 
                    3, 4, 5, 
                    6, 7, 8];
    squares.forEach(el => {
      el.childNodes[0].innerText = "";
    })
    modal.style.display = "none";
    document.getElementById("choose-icon").style.display = "block";
  }
})();