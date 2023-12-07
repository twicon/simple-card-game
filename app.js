let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;

const cardObjects = [
    { id: 'A1', pair: 'A', matched: false, image: 'images/bild1.webp'},
    { id: 'A2', pair: 'A', matched: false, image: 'images/bild1.webp'},
    { id: 'B1', pair: 'B', matched: false, image: 'images/bild2.webp' },
    { id: 'B2', pair: 'B', matched: false, image: 'images/bild2.webp' },
    { id: 'C1', pair: 'C', matched: false, image: 'images/bild3.webp' },
    { id: 'C2', pair: 'C', matched: false, image: 'images/bild3.webp' },
    { id: 'D1', pair: 'D', matched: false, image: 'images/bild4.webp' },
    { id: 'D2', pair: 'D', matched: false, image: 'images/bild4.webp' },
    { id: 'E1', pair: 'E', matched: false, image: 'images/bild5.webp' },
    { id: 'E2', pair: 'E', matched: false, image: 'images/bild5.webp' },
    { id: 'F1', pair: 'F', matched: false, image: 'images/bild6.webp' },
    { id: 'F2', pair: 'F', matched: false, image: 'images/bild6.webp' },
    { id: 'G1', pair: 'G', matched: false, image: 'images/bild7.webp' },
    { id: 'G2', pair: 'G', matched: false, image: 'images/bild7.webp' },
    { id: 'H1', pair: 'H', matched: false, image: 'images/bild8.webp' },
    { id: 'H2', pair: 'H', matched: false, image: 'images/bild8.webp' }
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
    cardObjects.forEach(card => card.matched = false);

    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';

    for (let card of cardObjects) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-id', card.id);

        const imgElement = document.createElement('img');
        imgElement.src = card.image; // Corrected image path
        imgElement.style.display = 'none';
        imgElement.classList.add('card-image');

        cardElement.appendChild(imgElement);

        cardElement.addEventListener('click', function() {
            flipCard(card, cardElement, imgElement);
        });

        gameBoard.appendChild(cardElement);
    }
}

let firstCard = null;
let firstCardElement = null;
let lockBoard = false;

function flipCard(card, cardElement, imgElement) {
    if (lockBoard || card.matched || cardElement === firstCardElement) {
        return;
    }

    imgElement.style.display = 'block';

    if (!firstCard) {
        firstCard = card;
        firstCardElement = cardElement;
    } else {
        checkForMatch(card, cardElement, imgElement);
    }
}

function checkForMatch(secondCard, secondCardElement, secondImgElement) {
    lockBoard = true;

    if (firstCard.pair === secondCard.pair) {
        firstCard.matched = secondCard.matched = true;
        updateScore(true);
        resetBoard();
        checkGameOver();
    } else {
        setTimeout(() => {
            firstCardElement.firstChild.style.display = 'none';
            secondImgElement.style.display = 'none';
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
        initGame();
    }
}

function updateScores() {
    document.getElementById('player1Score').textContent = player1Score;
    document.getElementById('player2Score').textContent = player2Score;
}

initGame();
