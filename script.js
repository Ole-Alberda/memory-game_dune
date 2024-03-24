const cards = document.querySelectorAll('.memory-card');
const restartButton = document.getElementById('restart-button');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let lives = 6;
let matchedPairs = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');


if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
}

    secondCard = this;

    checkForMatch();

}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework ===
    secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
        matchedPairs++;
        checkWinCondition();
    } else {
        unflipCards();

        lives--;
        updateLivesUI();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
      }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false,false];
    [firstCard, secondCard] = [null,null];

    if (lives === 0) {
        alert('Game over! Your lives are up. Try again');
        restartGame();
    }
}

function restartGame() {
    location.reload();
}

function updateLivesUI() {
    const livesDisplay = document.getElementById('lives');
    livesDisplay.textContent = `Lives: ${lives}`;
}

function checkWinCondition() {
    if (matchedPairs === cards.length / 2) {
        alert('Congratulations! You are the Lisan Al-Gaib!');
    }
}

 restartButton.addEventListener('click', restartGame);

updateLivesUI();

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

//https://www.youtube.com/playlist?list=PLLX1I3KXZ-YH-woTgiCfONMya39-Ty8qw
//ChatGPT
cards.forEach(card => card.addEventListener('click', flipCard));