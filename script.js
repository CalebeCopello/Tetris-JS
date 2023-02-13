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
    ]
    //lTetrad
    const LTETRAD = [
        [WIDTH, WIDTH+1, WIDTH+2, 2],
        [1, WIDTH+1, WIDTH*2+1, WIDTH*2+2],
        [WIDTH, WIDTH+1, WIDTH+2, WIDTH*2],
        [0, 1, WIDTH+1, WIDTH*2+1]
    ]
    //iTetrad
    const ITETRAD = [
        [WIDTH, WIDTH+1, WIDTH+2, WIDTH+3],
        [2, WIDTH+2, WIDTH*2+2, WIDTH*3+2],
        [WIDTH, WIDTH+1, WIDTH+2, WIDTH+3],
        [2, WIDTH+2, WIDTH*2+2, WIDTH*3+2]
    ]
    //oTetrad
    const OTETRAD = [
        [0, 1, WIDTH, WIDTH+1],
        [0, 1, WIDTH, WIDTH+1],
        [0, 1, WIDTH, WIDTH+1],
        [0, 1, WIDTH, WIDTH+1]
    ]
    //sTetrad
    const STETRAD = [
        [1, 2,WIDTH,WIDTH+1],
        [1, WIDTH+1, WIDTH+2, WIDTH*2+2],
        [WIDTH*2, WIDTH+1, WIDTH*2+1, WIDTH+2],
        [0, WIDTH, WIDTH+1, WIDTH*2+1]
    ]
    //zTetrad
    const ZTETRAD = [
        [0, 1, WIDTH+1, WIDTH+2],
        [2, WIDTH+1, WIDTH+2, WIDTH*2+1],
        [WIDTH, WIDTH+1, WIDTH*2+1, WIDTH*2+2],
        [1, WIDTH, WIDTH+1, WIDTH*2]
    ]
    //tTetrad
    const TTETRAD = [
        [1, WIDTH, WIDTH+1, WIDTH+2],
        [1, WIDTH+1, WIDTH+2, WIDTH*2+1],
        [WIDTH, WIDTH+1, WIDTH+2, WIDTH*2+1],
        [1, WIDTH, WIDTH+1, WIDTH*2+1]
    ]


    const  TETRADS = [JTETRAD, LTETRAD, ITETRAD, OTETRAD, STETRAD, ZTETRAD, TTETRAD]

    let currentPos = 0
    let currentTetrad = TETRADS[0][0]

    //draw The Tetrads
    function draw() {
        currentTetrad.forEach(index =>
            squares[currentPos + index].classList.add('tetrad'))
    }
    draw()
    function undraw() {
        currentTetrad.forEach(index =>
            squares[currentPos + index].classList.remove('tetrad'))
    }
});