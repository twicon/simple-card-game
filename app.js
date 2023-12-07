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

// Shuffle the cardObjects
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function initGame() {
    shuffle(cardObjects);
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
let lockBoard = false; // Used to lock the board during checks

function flipCard(card, cardElement) {
    if (lockBoard || card.matched || cardElement === firstCardElement) {
        return; // Ignore clicks if the board is locked, card is already matched, or it's the same card
    }

    cardElement.textContent = card.pair; // Show card value

    if (!firstCard) {
        firstCard = card;
        firstCardElement = cardElement;
    } else {
        checkForMatch(card, cardElement);
    }
}

function checkForMatch(secondCard, secondCardElement) {
    lockBoard = true; // Lock the board to prevent further flips

    if (firstCard.pair === secondCard.pair) {
        // It's a match
        firstCard.matched = secondCard.matched = true;
        updateScore(true); // Pass true for a match
        resetBoard();
    } else {
        // No match
        setTimeout(() => {
            firstCardElement.textContent = '';
            secondCardElement.textContent = '';
            updateScore(false); // Pass false for no match
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
        // Player gets another turn, so no need to call updateTurn()
    } else {
        updateTurn(); // Switch turn only if there's no match
    }
}

function updateTurn() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function resetBoard() {
    // Reset board and card variables
    [firstCard, firstCardElement] = [null, null];
    lockBoard = false;
}

initGame();