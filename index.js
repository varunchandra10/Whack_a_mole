const cursor = document.querySelector('.cursor');

// Mouse over event listener (function for moving mouse)
window.addEventListener('mouseover', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
});

// Mouse down event listener ( function for mouse down while clicking it)
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
});


window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
});


const holes = [...document.querySelectorAll('.hole')]
const scoreEl = document.querySelector('.score span')
let score = 0;

let gameOver = false;

function run(){
    if(gameOver) return;

    const i = Math.floor(Math.random() * holes.length);
    const hole = holes[i];
    let timer = null;

    const img = document.createElement('img');
    img.classList.add('mole');

    if(Math.random() < 0.5) {
        img.src = 'assets/mole.png';
        img.addEventListener('click', () => {
            score += 10;
            scoreEl.textContent = score;
            img.src = 'assets/mole-whacked.png';
            clearTimeout(timer);
            setTimeout(()=>{
                hole.removeChild(img);
                run();
            }, 500);
        });
        
    } else {
        img.src = 'assets/piranha-plant.png';
        img.addEventListener('click', () => {
            gameOver = true;
            alert('Game Over! Your final score is: ' + score);
        });
    }

    hole.appendChild(img);

    timer = setTimeout(()=>{
        hole.removeChild(img);
        run();
    }, 1500)
};

run();
