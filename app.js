// GAME RULES:

// - The game has 2 players, plalying in rounds
// - In each turn, a player rolls a dice as many times as he wishes. Each result gets addes to his ROUND score
// - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn.
// - The player can choose to 'Hold', which means that his ROUND score gets addes to his GLOBAL score. After
// that, it's the next player's turn.
// - The first player to reach 1-- points on GLOBAL score wins the game.

var gameIsPlaying, scores, roundScore, activePlayer, previousRoll;

function initialize() {
    gameIsPlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    hideDice();
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

function hideDice() {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function showDice() {
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
}

initialize();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gameIsPlaying) {
        // 1. random number generation and previous dice roll
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // 2. display the result
        showDice();
        document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'img/dice-' + dice2 + '.png';
        
        if (dice1 !== 1 && dice2 !== 1) { // 3. Update the round score IF the rolled number was NOT a 1
            // add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            resetBoard();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gameIsPlaying) {
        // add current score to players global score
        scores[activePlayer] += roundScore;

        // update the UI 
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var finalScoreInput = document.querySelector('.final-score').value;
        var winningScore;
        if (finalScoreInput) {
            winningScore = finalScoreInput;
        } else {
            winningScore = 100;
        }

        // check if player won the game
        if (scores[activePlayer] >= winningScore) {
            // player wins
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameIsPlaying = false;
        } else {
            resetBoard();
        }
    }
});

function resetBoard() {
    // resets board and sets it up for next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    hideDice();
}

document.querySelector('.btn-new').addEventListener('click', function () {
    initialize();
});