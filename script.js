document.addEventListener('DOMContentLoaded', () => {
    const GRID = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const SCOREDISPLAY = document.querySelector('#score');
    const STARTBTN = document.querySelector('#start-btn');
    const WIDTH = 10;

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
    }
    draw()
    function undraw() {
        currentTetrad.forEach(index =>
            squares[currentPos + index].classList.remove('tetrad'))
    }

    //assing functions to keyCodes
    function control(e) {
        if(e.keyCode === 37 || e.keyCode === 65) {
            moveLeft()
        } else if (e.keyCode === 38 || e.keyCode === 32) {
            rotate()
        } else if (e.keyCode === 39 || e.keyCode === 68) {
            moveRight();
        } else if (e.keyCode === 40 || e.keyCode === 83) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)

    //Timer for Tetrad go down
    let timerId = setInterval(moveDown,500);

    function moveDown() {
        undraw();
        currentPos += WIDTH;
        console.log(currentPos);
        draw();
        freeze();
    }
    function freeze() {
        if(currentTetrad.some(index => squares[currentPos + index + WIDTH].classList.contains('end'))) {
            currentTetrad.forEach(index => squares[currentPos + index].classList.add('end'));
            rTetrad = Math.floor(Math.random() * TETRADS.length);
            currentTetrad = TETRADS[rTetrad][tRotation];
            currentPos = 3;
            draw();
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
    function rotate() {
        undraw();
        tRotation++;
        if (tRotation === currentTetrad.length) {
            tRotation = 0;
        }
        currentTetrad = TETRADS[rTetrad][tRotation];
        draw();
    }
});