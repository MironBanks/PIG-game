/*
PIG DICE GAME

GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaing, dice1, dice2;

init();

/*function to create random number from 0 til 6 +1
dice = Math.floor(Math.random() * 6) + 1;
console.log(dice);
*/

var lastDice;

// BTN ROLL FUNCTION

document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaing) {
    // 1.random number
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    // 2. display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    // 3. Update the round score IF the rolled number was Not a 1

    if (dice1 !== 1 && dice2 !== 1) {
      // Add scores
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      //Next player
      nextPlayer();
    }

/*
    if (dice === 6 && lastDice === 6) {
      //Player loose score
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = '0';
      nextPlayer();
    } else if (dice !== 1) {
      // add score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // Next player function
      nextPlayer();

    }

    lastDice = dice;
*/
  }
});

// BTN HOLD FUNCTION
document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaing) {
    //Add current score to global score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Manual imput winning scores

    var imput = document.querySelector('.final-score').value;
    var winningScore;

    if(imput){
      winningScore = imput;
    } else {
      winningScore = 100;
    }




    //Check if player won the game
    if(scores[activePlayer] >= winningScore){
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      document.getElementById('dice-1').style.display = 'none';
      document.getElementById('dice-2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaing = false;
    } else {
      // NEXT PLAYER AFTER HOLD
      nextPlayer();
    }
  }
});


// NEXT PLAYER FUNCTION
function nextPlayer (){
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  //Reseting scores after hiting 1
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  //Change classes in HTML after hiting 1
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');

  //hiding dice after hiting 1
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}

// BTN NEW GAME FUNCTION
document.querySelector('.btn-new').addEventListener('click', init);

// reset function
function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaing = true;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
