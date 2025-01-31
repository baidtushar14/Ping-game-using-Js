const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");
const current0 = document.getElementById("current--0");
const current1 = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currScore, activePlayer, playing;

const init = function () {
    scores = [0, 0];
    currScore = 0;
    activePlayer = 0;
    playing = true;

    current0.textContent = 0;
    current1.textContent = 0;

    score0.textContent = 0;
    score1.textContent = 0;
    diceEl.classList.add('hidden');

    player0.classList.remove('player--winner')
    player1.classList.remove('player--winner')

    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}
init();

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currScore = 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');

}

btnRoll.addEventListener("click", function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;

        if (dice !== 1) {
            currScore = currScore + dice;
            document.getElementById(`current--${activePlayer}`).textContent = currScore;
        } else {
            switchPlayer();
        }
    }

})

btnHold.addEventListener('click', function () {
    if (playing) {
        scores[activePlayer] += currScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 50) {
            playing = false;
            diceEl.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

        }
        else {
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click', init);