const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
let lastHole;
let timeUp = false;
let score = 0;

function randTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];

    if (hole === lastHole) {
        return randHole(holes);
    }

    lastHole = hole;

    return hole;
}

function peep() {
    const time = randTime(200, 1000);
    const hole = randHole(holes);

    hole.classList.add("up");

    setTimeout(() => {
        hole.classList.remove("up");

        if (!timeUp) peep();
    }, time);
}

function bonk(e) {
    if (!e.isTrusted) return; // CHEATER!

    scoreBoard.textContent = ++score;

    this.classList.remove("up");
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();

    setTimeout(() => (timeUp = true), 10000);
}

moles.forEach(mole => mole.addEventListener("click", bonk));
