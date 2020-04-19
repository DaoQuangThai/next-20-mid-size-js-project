const rollBtn = document.querySelector('.roll-dice');
const holdBtn = document.querySelector('.hold-score');
const newGameBtn = document.querySelector('.new-game');
const dice1 = document.querySelector('.dice1');
const dice2 = document.querySelector('.dice2');
const renderCurrentScore = document.querySelectorAll('.current__score');
const renderTotalScore = document.querySelectorAll('.total-score');
const renderWinner = document.querySelectorAll('.player-name');
const isPlaying = document.querySelectorAll('.player');

let currentScore = 0;
let currentPlayer = 0;
let totalScore = [0, 0];
let gamePlaying = true;

function changePlayer() {
  isPlaying.forEach(player => {
    if (player.classList.contains('active')) {
      currentScore = 0;
      renderCurrentScore[currentPlayer].innerText = currentScore;
      currentPlayer = currentPlayer === 0 ? 1 : 0;

      player.classList.remove('active');
    } else {
      player.classList.add('active');
    }
  });
}

function rollDice() {
  dice1.classList.add('rolling');
  dice2.classList.add('rolling');

  const diceNum1 = createRandomNumber(6);
  const diceNum2 = createRandomNumber(6);

  if (diceNum1 === 1 || diceNum2 === 1) {
    setTimeout(() => {
      dice1.src = `./imgs/dice-${diceNum1}.png`;
      dice2.src = `./imgs/dice-${diceNum2}.png`;
      dice1.classList.remove('rolling');
      dice2.classList.remove('rolling');

      changePlayer();
    }, 1000);
  } else {
    setTimeout(() => {
      dice1.src = `./imgs/dice-${diceNum1}.png`;
      dice2.src = `./imgs/dice-${diceNum2}.png`;
      dice1.classList.remove('rolling');
      dice2.classList.remove('rolling');

      isPlaying.forEach(player => {
        if (player.classList.contains('active')) {
          currentScore += diceNum1 + diceNum2;
          renderCurrentScore[currentPlayer].innerText = currentScore;
        }
      });
    }, 1000);
  }
}

function holdDice() {
  totalScore[currentPlayer] = totalScore[currentPlayer] + currentScore;

  renderTotalScore[currentPlayer].innerText = totalScore[currentPlayer];

  if (totalScore[currentPlayer] >= 100) {
    renderWinner[currentPlayer].innerText = 'WINNER';
    renderWinner[currentPlayer].style.color = '#eb4d4d';
    gamePlaying = false;
  }

  changePlayer();
}

function newGame() {
  // This is the fastest way ^_^ but reloat the page
  window.location.reload();

  // With no reload
  //   currentScore = 0;
  //   currentPlayer = 0;
  //   totalScore = [0, 0];
  //   gamePlaying = true;

  //   isPlaying[0].classList = 'player active';
  //   isPlaying[1].classList = 'player';

  //   renderTotalScore.forEach(player => {
  //     player.innerText = 0;
  //   });

  //   renderWinner.forEach((player, index) => {
  //     player.innerText = `player ${index}`;
  //     player.style.color = '#333';
  //   });
}

// Add event listener
rollBtn.addEventListener('click', () => {
  if (gamePlaying) {
    rollDice();
  }
});
holdBtn.addEventListener('click', () => {
  if (gamePlaying) {
    holdDice();
  }
});
newGameBtn.addEventListener('click', newGame);

// Show and Hide rule
const showRule = document.querySelector('.show-rule');
const hideRule = document.querySelector('.hide-rule');
const rule = document.querySelector('.rule');

showRule.addEventListener('click', () => {
  rule.classList.add('show');
});

hideRule.addEventListener('click', () => {
  rule.classList.remove('show');
});
