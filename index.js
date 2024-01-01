const cursor = document.querySelector('.cursor');
const holes = [...document.querySelectorAll('.hole')];
const scoreEl = document.querySelector('.score span');
let score = 0;
let gameOver = false;

// Mouse move event listener (function for moving mouse)
window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});

// Mouse down event listener (function for mouse down while clicking)
window.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

// Mouse up event listener (function for mouse up)
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

function restartGame() {
    location.reload();
}

function run() {
    if (gameOver) return;

    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];
    let timer = null;

    const img = document.createElement('img');
    img.classList.add('mole');

    if (Math.random() < 0.5) {
        img.src = 'assets/mole.png';
        img.addEventListener('click', () => {
            score += 10;
            scoreEl.textContent = score.toString().padStart(2, '0');
            img.src = 'assets/mole-whacked.png';
            clearTimeout(timer);
            setTimeout(() => {
                hole.removeChild(img);
                run();
            }, calculateTimeout());
        });
    } else {
        img.src = 'assets/piranha-plant.png';
        img.addEventListener('click', () => {
            gameOver = true;
            const result = confirm('Game Over! Your final score is: ' + score + '\nDo you want to play again?');
            if (result) {
                restartGame();
            }
        });
    }

    hole.appendChild(img);

    timer = setTimeout(() => {
        hole.removeChild(img);
        run();
    }, calculateTimeout());
}

function calculateTimeout() {
    const baseTimeout = 1500;
    const reductionFactor = Math.floor(score / 100);
    return Math.max(baseTimeout - reductionFactor * 200, 500);
}

run();
