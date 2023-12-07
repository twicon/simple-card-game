let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;

const cardObjects = [
    { id: 'A1', pair: 'A', matched: false },
    { id: 'A2', pair: 'A', matched: false },
    { id: 'B1', pair: 'B', matched: false },
    { id: 'B2', pair: 'B', matched: false },
    { id: 'C1', pair: 'C', matched: false },
    { id: 'C2', pair: 'C', matched: false },
    { id: 'D1', pair: 'D', matched: false },
    { id: 'D2', pair: 'D', matched: false },
    { id: 'E1', pair: 'E', matched: false },
    { id: 'E2', pair: 'E', matched: false },
    { id: 'F1', pair: 'F', matched: false },
    { id: 'F2', pair: 'F', matched: false },
    { id: 'G1', pair: 'G', matched: false },
    { id: 'G2', pair: 'G', matched: false },
    { id: 'H1', pair: 'H', matched: false },
    { id: 'H2', pair: 'H', matched: false },
];

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function initGame() {
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;
    updateScores();

    shuffle(cardObjects);
    cardObjects.forEach(card => card.matched = false); // Reset match status

    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear the board

    for (let card of cardObjects) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-id', card.id);

        cardElement.addEventListener('click', function() {
            flipCard(card, cardElement);
        });

        gameBoard.appendChild(cardElement);
    }
}

let firstCard = null;
let firstCardElement = null;
let lockBoard = false;

function flipCard(card, cardElement) {
    if (lockBoard || card.matched || cardElement === firstCardElement) {
        return;
    }

    cardElement.textContent = card.pair;

    if (!firstCard) {
        firstCard = card;
        firstCardElement = cardElement;
    } else {
        checkForMatch(card, cardElement);
    }
}

function checkForMatch(secondCard, secondCardElement) {
    lockBoard = true;

    if (firstCard.pair === secondCard.pair) {
        firstCard.matched = secondCard.matched = true;
        updateScore(true);
        resetBoard();
        checkGameOver(); // Check if game is over after each match
    } else {
        setTimeout(() => {
            firstCardElement.textContent = '';
            secondCardElement.textContent = '';
            updateScore(false);
            resetBoard();
        }, 1000);
    }
}

function updateScore(isMatch) {
    if (isMatch) {
        if (currentPlayer === 1) {
            player1Score++;
            document.getElementById('player1Score').textContent = player1Score;
        } else {
            player2Score++;
            document.getElementById('player2Score').textContent = player2Score;
        }
    } else {
        updateTurn();
    }
}

function updateTurn() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function resetBoard() {
    [firstCard, firstCardElement] = [null, null];
    lockBoard = false;
}

function checkGameOver() {
    if (cardObjects.every(card => card.matched)) {
        const winner = player1Score === player2Score ? 'Tie game!' : player1Score > player2Score ? 'Player 1 wins!' : 'Player 2 wins!';
        alert(winner + ' Click OK to restart.');
        initGame(); // Restart the game
    }
}

function updateScores() {
    document.getElementById('player1Score').textContent = player1Score;
    document.getElementById('player2Score').textContent = player2Score;
}

initGame();
