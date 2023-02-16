document.addEventListener('DOMContentLoaded', () => {
    const GRID = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const SCOREDISPLAY = document.querySelector('#score');
    const STARTBTN = document.querySelector('#start-btn');
    const WIDTH = 10;
    let nextRTetrad = 0;
    let timer;
    let score = 0;
    //Tetrads
    //jTetrad
    const JTETRAD = [
        [0, WIDTH, WIDTH+1, WIDTH+2],
        [1, WIDTH+1, WIDTH*2+1, 2],
        [WIDTH, WIDTH+1, WIDTH+2, WIDTH*2+2],
        [1, WIDTH+1, WIDTH*2+1, WIDTH*2]
    ];
    //lTetrad
    const LTETRAD = [
        [WIDTH, WIDTH+1, WIDTH+2, 2],
        [1, WIDTH+1, WIDTH*2+1, WIDTH*2+2],
        [WIDTH, WIDTH+1, WIDTH+2, WIDTH*2],
        [0, 1, WIDTH+1, WIDTH*2+1]
    ];
    //iTetrad
    const ITETRAD = [
        [WIDTH, WIDTH+1, WIDTH+2, WIDTH+3],
        [2, WIDTH+2, WIDTH*2+2, WIDTH*3+2],
        [WIDTH, WIDTH+1, WIDTH+2, WIDTH+3],
        [2, WIDTH+2, WIDTH*2+2, WIDTH*3+2]
    ];
    //oTetrad
    const OTETRAD = [
        [0, 1, WIDTH, WIDTH+1],
        [0, 1, WIDTH, WIDTH+1],
        [0, 1, WIDTH, WIDTH+1],
        [0, 1, WIDTH, WIDTH+1]
    ];
    //sTetrad
    const STETRAD = [
        [1, 2,WIDTH,WIDTH+1],
        [1, WIDTH+1, WIDTH+2, WIDTH*2+2],
        [WIDTH*2, WIDTH+1, WIDTH*2+1, WIDTH+2],
        [0, WIDTH, WIDTH+1, WIDTH*2+1]
    ];
    //zTetrad
    const ZTETRAD = [
        [0, 1, WIDTH+1, WIDTH+2],
        [2, WIDTH+1, WIDTH+2, WIDTH*2+1],
        [WIDTH, WIDTH+1, WIDTH*2+1, WIDTH*2+2],
        [1, WIDTH, WIDTH+1, WIDTH*2]
    ];
    //tTetrad
    const TTETRAD = [
        [1, WIDTH, WIDTH+1, WIDTH+2],
        [1, WIDTH+1, WIDTH+2, WIDTH*2+1],
        [WIDTH, WIDTH+1, WIDTH+2, WIDTH*2+1],
        [1, WIDTH, WIDTH+1, WIDTH*2+1]
    ];
    const  TETRADS = [JTETRAD, LTETRAD, ITETRAD, OTETRAD, STETRAD, ZTETRAD, TTETRAD];
    //randomly select a Tetrad 
    let rTetrad = Math.floor(Math.random()*TETRADS.length);
    let tRotation = 0;
    let currentPos = 3;
    let currentTetrad = TETRADS[rTetrad][tRotation];
    //draw and undraw The Tetrads
    function draw() {
        currentTetrad.forEach(index =>
            squares[currentPos + index].classList.add('tetrad'))
    };
   // draw()
    function undraw() {
        currentTetrad.forEach(index =>
            squares[currentPos + index].classList.remove('tetrad'))
    };
    //assing functions to keyCodes
    function control(e) {
        if(e.keyCode === 37 || e.keyCode === 65) {
            moveLeft();
        } else if (e.keyCode === 38 || e.keyCode === 32) {
            rotate();
        } else if (e.keyCode === 39 || e.keyCode === 68) {
            moveRight();
        } else if (e.keyCode === 40 || e.keyCode === 83) {
            moveDown();
        }
    };
    document.addEventListener('keyup', control)
    function moveDown() {
        undraw();
        currentPos += WIDTH;
        draw();
        freeze();
    }
    function freeze() {
        if(currentTetrad.some(index => squares[currentPos + index + WIDTH].classList.contains('end'))) {
            currentTetrad.forEach(index => squares[currentPos + index].classList.add('end'));
            rTetrad = nextRTetrad;
            nextRTetrad = Math.floor(Math.random() * TETRADS.length);
            currentTetrad = TETRADS[rTetrad][tRotation];
            currentPos = 3;
            draw();
            displayNextTetrad();
            scoreUpdate();
            gameOver();
        }
    }
    //move Tetrad, if it's not at the edge or blocked
    function moveLeft() {
        undraw();
        const ISATLEDGE = currentTetrad.some(index => (currentPos + index) % WIDTH === 0)
        if(!ISATLEDGE) currentPos -= 1;
        if(currentTetrad.some(index => squares[currentPos + index].classList.contains('end'))) {
            currentPos +=1;
        }
        draw();
    }
    function moveRight() {
        undraw();
        const ISATLEDGE = currentTetrad.some(index => (currentPos + index) % WIDTH === WIDTH -1)
        if(!ISATLEDGE) currentPos += 1;
        if(currentTetrad.some(index => squares[currentPos + index].classList.contains('end'))) {
            currentPos -=1;
        }
        draw();
    }
    //move Tetrad
    //FIXME: Tetrads overflowing when moved on edge
    function rotate() {
        undraw();
        tRotation++;
        if (tRotation === currentTetrad.length) {
            tRotation = 0;
        }
        currentTetrad = TETRADS[rTetrad][tRotation];
        draw();
    }
    //showing next Tetrad
    const SHOWCASE = document.querySelectorAll('.showcase div');
    const SHOWCASEWIDTH = 4;
    let displayIndex = 0;
    //FIXME: *AESTHETIC* center display the Tetrads
    const NEXTTETRAD = [
        [0, SHOWCASEWIDTH, SHOWCASEWIDTH+1, SHOWCASEWIDTH+2],
        [SHOWCASEWIDTH, SHOWCASEWIDTH+1, SHOWCASEWIDTH+2, 2],
        [SHOWCASEWIDTH, SHOWCASEWIDTH+1, SHOWCASEWIDTH+2, SHOWCASEWIDTH+3],
        [0, 1, SHOWCASEWIDTH, SHOWCASEWIDTH+1],
        [1, 2,SHOWCASEWIDTH,SHOWCASEWIDTH+1],
        [0, 1, SHOWCASEWIDTH+1, SHOWCASEWIDTH+2],
        [1, SHOWCASEWIDTH, SHOWCASEWIDTH+1, SHOWCASEWIDTH+2]
    ];
    function displayNextTetrad() {
        SHOWCASE.forEach(tetrad => {
            tetrad.classList.remove('tetrad');
        });
        NEXTTETRAD[nextRTetrad].forEach(index => {
            SHOWCASE[displayIndex + index].classList.add('tetrad');
        });
    };
    //TODO: change the content of the botton: when pause change to start, when paused to pause
    //FIXME: when paused the game changes next Tetrad
    STARTBTN.addEventListener('click', () => {
        if (timer) {
            clearInterval(timer);
            timer = null;
        } else {
            draw();
            timer = setInterval(moveDown,500);
            nextRTetrad = Math.floor(Math.random() * TETRADS.length);
            displayNextTetrad();
        }
    });
    function scoreUpdate() {
        for (let c = 0; c < 199; c +=WIDTH) {
            const row = [c, c+1, c+2, c+3, c+4, c+5, c+6, c+7, c+8, c+9]
            if (row.every(index => squares[index].classList.contains('end'))) {
                score +=10;
                SCOREDISPLAY.innerHTML = score;
                row.forEach(index => {
                    squares[index].classList.remove('end')
                    squares[index].classList.remove('tetrad')
                });
                const SQUARESREMOVED = squares.splice(c, WIDTH);
                squares = SQUARESREMOVED.concat(squares);
                squares.forEach(block => GRID.appendChild(block));
            };
        };
    };
    function gameOver() {
        if(currentTetrad.some(index => squares[currentPos + index].classList.contains('end'))) {
            SCOREDISPLAY.innerHTML = 'GAME OVER';
            clearInterval(timer);
        }
    }
});