var Display = function(displayElement) {
  var memo = displayElement;
  function setText(message) {
    memo.innerText = message;
  }
    return {setMessage: setText};
}

function checkValid(btn) {
  return btn.innerText.length === 0;
}

function mark(btn, players, turn) {
  btn.innerText = players[turn];
}

function draw(box) {
  for (var a = 0; a < box.length; a++) {
    if (box[a].innerText.length === 0)
      return false;
  }
  return true;
}

function checkWinner(box, players, turn) {
 
  if (box[0].innerText === players[turn] &&
      box[1].innerText === players[turn] &&
      box[2].innerText === players[turn])
      return true;
  
  if (box[3].innerText === players[turn] &&
      box[4].innerText === players[turn] &&
      box[5].innerText === players[turn])
      return true;
  
  if (box[6].innerText === players[turn] &&
      box[7].innerText === players[turn] &&
      box[8].innerText === players[turn])
      return true;
  
  if (box[0].innerText === players[turn] &&
      box[4].innerText === players[turn] &&
      box[8].innerText === players[turn])
      return true;
  
  if (box[2].innerText === players[turn] &&
      box[4].innerText === players[turn] &&
      box[6].innerText === players[turn])
      return true;
  
  if (box[0].innerText === players[turn] &&
      box[3].innerText === players[turn] &&
      box[6].innerText === players[turn])
      return true;
  
  if (box[1].innerText === players[turn] &&
      box[4].innerText === players[turn] &&
      box[7].innerText === players[turn])
      return true;
  
  if (box[2].innerText === players[turn] &&
      box[5].innerText === players[turn] &&
      box[8].innerText === players[turn])
      return true;
  
  return false;
}

function game() {
  var box = document.querySelectorAll("#game button");
  var players = ["X", "O"];
  var turn = 0; // 0 = X, 1 = O;
  var gameOver = false;
  var memo = new Display(document.querySelector("#memo"));

  memo.setMessage("X starts");

  for (var a = 0; a < box.length; a++)
    box[a].addEventListener('click', function(){
                            
    if (gameOver) // skip if game is over
      return;
  
    if (!checkValid(this)) { // check if box has already been marked
      memo.setMessage("Already marked!");
    } 
      
    else {
      // 1. mark box with X or O
      mark(this, players, turn); 
     
      // 2. check for winner (true/false)
      gameOver = checkWinner(box, players, turn);
      
      // game ends in win
      if (gameOver) {  
        memo.setMessage(players[turn] + " wins!\n(seriously?)");
        return;
      }
      
       // game ends in draw
      if (draw(box)) { 
        memo.setMessage("Draw! I'm totally surprised.");
        return;
      }

      turn++;  // game not over. continue playing.
      turn = (turn % 2);
    
      memo.setMessage(players[turn] + "'s move");
    }
  });  

}

game();