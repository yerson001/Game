const width = 20
let pacIndex = 250
let scoreNumber = 0

let time = 0
let pacSoundId
let highScoreNumber = 0
let highScoreTime = 0
const death = new Audio('pacman_death.wav')

const layout = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 2, 2, 2, 2, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 1,
    1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1,
    1, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 1, 2, 1,
    1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 1, 1, 2, 1, 2, 1, 1, 1, 0, 0, 1, 1, 1, 2, 1, 2, 1, 1, 1,
    1, 6, 6, 2, 1, 2, 1, 1, 0, 0, 0, 0, 1, 1, 2, 1, 2, 6, 6, 1,
    1, 1, 1, 2, 1, 2, 1, 1, 8, 7, 4, 9, 1, 1, 2, 1, 2, 1, 1, 1,
    1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 1, 2, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1, 2, 1,
    1, 2, 1, 2, 5, 2, 2, 1, 2, 2, 2, 2, 1, 2, 2, 5, 2, 1, 2, 1,
    1, 2, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
]

document.addEventListener('DOMContentLoaded', () => {

    const grid = document.querySelector('.grid')

    for (let i = 0; i < layout.length; i++) {
        const div = document.createElement('div')
        div.classList.add('gridSquare')
        grid.appendChild(div)
    }

    const gridSquare = document.querySelectorAll('.gridSquare')
    const infoBox = document.querySelector('.infoBox')
    const start = document.querySelector('.start')


    //document.addEventListener('keydown', preventDefultScroll)

    start.addEventListener('click', () => {

        if (start.innerHTML === 'Start') {
            startGame()
            document.addEventListener('keyup', movePacMan)
            start.innerHTML = 'RUN!'
            infoBox.innerHTML = 'nice m8'
            start.style.backgroundColor = 'red'

        } else if (start.innerHTML === 'Play Again?') {
            for (let i = 0; i < 16; i++) {
                clearInterval(caughtIdOne)
                clearInterval(caughtIdTwo)
                clearInterval(caughtIdThree)
                clearInterval(caughtIdFour)
            }
        }
    })

    function assignGrid() {
        infoBox.innerHTML = 'Click ↑'
        for (let i = 0; i < layout.length; i++) {
            if (layout[i] === 1) {
                gridSquare[i].classList.add('wall')
            } else if (layout[i] === 2) {
                gridSquare[i].classList.add('food')
            } else if (layout[i] === 3) {
                gridSquare[i].classList.add('pacmanRight')
            } else if (layout[i] === 5) {
                gridSquare[i].classList.add('pill')
            } else if (layout[i] === 6) {
                gridSquare[i].classList.add('warp')
            }
        }
    }

    assignGrid()

    function pacSound() {
        const move = new Audio('pacman_chomp.wav')
        move.play()
    }

    function movePacMan(e) {
        gridSquare[pacIndex].classList.remove('pacmanUp')
        gridSquare[pacIndex].classList.remove('pacmanRight')
        gridSquare[pacIndex].classList.remove('pacmanDown')
        gridSquare[pacIndex].classList.remove('pacmanLeft')
            //console.log("this-->" + e.keyCode);
        switch (e.keyCode) {
            //switch (num) {
            case 37: // left arrow
                if (gridSquare[pacIndex - 1].classList.contains('wall')) pacIndex += 0
                else if (pacIndex % width !== 0) pacIndex -= 1
                gridSquare[pacIndex].classList.add('pacmanLeft')
                break
            case 38: // upp arrow
                if (gridSquare[pacIndex - width].classList.contains('wall')) pacIndex += 0
                else if (pacIndex - width >= 0) pacIndex -= width
                gridSquare[pacIndex].classList.add('pacmanUp')
                break
            case 39: // right arrow
                if (gridSquare[pacIndex + 1].classList.contains('wall')) pacIndex += 0
                else if (pacIndex % width < width - 1) pacIndex += 1
                gridSquare[pacIndex].classList.add('pacmanRight')
                break
            case 40: //down arrow
                if (gridSquare[pacIndex + width].classList.contains('wall')) pacIndex += 0
                else if (pacIndex + width < width * width) pacIndex += width
                gridSquare[pacIndex].classList.add('pacmanDown')
                break
        }
        // colliding with food -----------------------
        if (gridSquare[pacIndex].classList.contains('food')) {
            gridSquare[pacIndex].classList.remove('food')
            scoreNumber = scoreNumber + 10
                //score.innerHTML = scoreNumber
        }
        // The next 2 if statments allow for warping from each side of the map
        if (pacIndex === 141) {
            gridSquare[pacIndex].classList.remove('pacmanUp')
            gridSquare[pacIndex].classList.remove('pacmanRight')
            gridSquare[pacIndex].classList.remove('pacmanDown')
            gridSquare[pacIndex].classList.remove('pacmanLeft')
            pacIndex = 157
            gridSquare[pacIndex].classList.add('pacmanLeft')
        }
        if (pacIndex === 158) {
            gridSquare[pacIndex].classList.remove('pacmanUp')
            gridSquare[pacIndex].classList.remove('pacmanRight')
            gridSquare[pacIndex].classList.remove('pacmanDown')
            gridSquare[pacIndex].classList.remove('pacmanLeft')
            pacIndex = 142
            gridSquare[pacIndex].classList.add('pacmanRight')
        }
    }

    function startGame() {
        pacSoundId = setInterval(pacSound, 650)
    }


})