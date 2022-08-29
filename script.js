console.log('Civil War Game');

score = 0;
cross = true;

music = new Audio('music.mp3');
musicGameOver = new Audio('gameover.mp3');

setTimeout(() => {
    music.play();
}, 1000);

document.onkeydown = function (e) {
    console.log('The key code is ', e.keyCode);
    if (e.keyCode == 38) {
        cap = document.querySelector('.cap');
        cap.classList.add('animateCap');
        setTimeout(() => {
            cap.classList.remove('animateCap');
        }, 1000);
    }
    else if (e.keyCode == 39) {
        cap = document.querySelector('.cap');
        capX = parseInt(window.getComputedStyle(cap, null).getPropertyValue('left'));
        cap.style.left = capX + 112 + "px";
    }
    else if (e.keyCode == 37) {
        cap = document.querySelector('.cap');
        capX = parseInt(window.getComputedStyle(cap, null).getPropertyValue('left'));
        cap.style.left = (capX - 112) + "px";
    }
}

setInterval(() => {
    cap = document.querySelector('.cap');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    cx = parseInt(window.getComputedStyle(cap, null).getPropertyValue('left'));
    cy = parseInt(window.getComputedStyle(cap, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(cx - ox);
    offsetY = Math.abs(cy - oy);
    // console.log(offsetX, offsetY);

    if (offsetX < 110 && offsetY < 100) {
        gameOver.innerHTML = "Game Over - Reload To Play The Game Again";
        obstacle.classList.remove('animateOb');
        musicGameOver.play();
        setTimeout(() => {
            musicGameOver.pause();
            music.pause();
        }, 1000);
    }

    else if (offsetX < 150 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        setTimeout(() => {
            aniDur = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 1;
            obstacle.style.animationDuration = newDur + "s"
        }, 1000);
    }
}, 10);

function updateScore(score) {
    scoreContainer = document.querySelector('.scoreContainer')
    scoreContainer.innerHTML = "Your Score : " + score;
}