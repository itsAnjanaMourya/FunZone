score = 0;
cross = true;
start=new Audio('start.mp3');
audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
over = true;
setTimeout(() => {
    start.play()
}, 1000);
setTimeout(() => {
    
    audio.pause()
}, 1000);
setTimeout(() => {
    
    audio.play()
}, 1000);



document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)

    if(over){
        if (e.keyCode == 38) {
            dino = document.querySelector('.dino');
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino')
                
            }, 700);

        }
        if (e.keyCode == 39) {
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = dinoX + 100 + "px";
        }
        if (e.keyCode == 37) {
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = (dinoX - 100) + "px";
        }
    }
}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');
    obstacle2 = document.querySelector('.obstacle2');
    game = document.getElementById('game');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    ox2 = parseInt(window.getComputedStyle(obstacle2, null).getPropertyValue('left'));
    oy2 = parseInt(window.getComputedStyle(obstacle2, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);

    offsetX2 = Math.abs(dx - ox2);
    offsetY2 = Math.abs(dy - oy2);

    audio.play();
    // console.log(offsetX, offsetY)
    if ((offsetX < 60 && offsetY < 50) || (offsetX2 < 60 && offsetY2 < 50)) 
    {
        
        gameOver.innerHTML = "Press F5 to Play Again"
        setTimeout(() => {
            audio.pause();
        }, 1000);
        
        obstacle.classList.remove('obstacleAni')
        obstacle2.classList.remove('obstacle2Ani')
        dino.classList.remove('dino')
        if(over){
            setTimeout(() => {
                audiogo.play();
            }, 10);  
            var gameOverImage = document.createElement('img')
            gameOverImage.src = 'giphy.gif'
            document.getElementById('game').append(gameOverImage)
            over = false
            audiogo.pause();
            dino.classList.add('shinchan')
            obstactle2.style.left = 1000;
        }
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }
    else if (offsetX2 < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle2, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle2.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}