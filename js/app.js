const width = 20
let pacIndex = 250
let scoreNumber = 0

let time = 0
let countUpid
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
    // Below this all code relies on the Dom
    //accssing the grid
    const grid = document.querySelector('.grid')
        //creating all the small squares within the grid
    for (let i = 0; i < layout.length; i++) {
        const div = document.createElement('div')
        div.classList.add('gridSquare')
        grid.appendChild(div)
    }
    // Acessing the DOM
    const gridSquare = document.querySelectorAll('.gridSquare')
    const infoBox = document.querySelector('.infoBox')
    const score = document.querySelector('.score')
    const timer = document.querySelector('.timer')
    const start = document.querySelector('.start')
    const highScore = document.querySelector('.highScore')
    const left = document.querySelector('.left')
    const up = document.querySelector('.up')
    const right = document.querySelector('.right')
    const down = document.querySelector('.down')
        //This event listener prevents the arrow keys from scrolling
    document.addEventListener('keydown', preventDefultScroll)
        // eventlistner to start the game
    start.addEventListener('click', () => {
        // if it says start run the game for the first time.
        if (start.innerHTML === 'Start') {
            startGame()
            document.addEventListener('keyup', movePacMan)
            start.innerHTML = 'RUN!'
            infoBox.innerHTML = 'nice m8'
            start.style.backgroundColor = 'red'
                // if it says play again? run the game 1st > time
        } else if (start.innerHTML === 'Play Again?') {
            countUpid = setInterval(countUp, 1000)
            for (let i = 0; i < 16; i++) {
                clearInterval(caughtIdOne)
                clearInterval(caughtIdTwo)
                clearInterval(caughtIdThree)
                clearInterval(caughtIdFour)
            }
            for (let i = 0; i < ghosts.length; i++) {

                start.innerHTML = 'RUN!'
                start.style.backgroundColor = 'red'
            }
        }
    })

    function assignGrid() {
        infoBox.innerHTML = 'Click ↑'
        for (let i = 0; i < layout.length; i++) {
            // gridSquare[i].classList.add(layoutClasses[layout[i]])
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
    // Calling the assignGrid fucntion
    assignGrid()
        // This counts to see how much food is left before you complete the level
    function checkWin() {
        // let foodAmount = (layout.filter(x => x === 2)).length
        let foodAmount = 0
        for (let i = 0; i < 400; i++) {
            if (gridSquare[i].classList.contains('food')) {
                foodAmount = foodAmount + 1
            }
        }
        if (foodAmount === 0) {
            clearInterval(pacSoundId)
            for (let i = 0; i < 16; i++) {
                clearInterval(caughtIdOne)
                clearInterval(caughtIdTwo)
                clearInterval(caughtIdThree)
                clearInterval(caughtIdFour)
            }
            start.innerHTML = 'Play Again?'
            infoBox.innerHTML = 'YOU WIN!'
            if (scoreNumber > highScoreNumber) {
                highScoreNumber = scoreNumber
                highScoreTime = time
            }
            highScore.innerHTML = `${highScoreNumber}ps in ${highScoreTime}s`
            time = time + 0
        }
    }
    //Calling the checkWin to run at a set interval 200ms
    setInterval(checkWin, 200)
        // Function to play the Ghost sounds
    function pacSound() {
        const move = new Audio('pacman_chomp.wav')
        move.play()
    }

    //Function that moves packman using the arrow keys
    function movePacMan(e) {
        gridSquare[pacIndex].classList.remove('pacmanUp')
        gridSquare[pacIndex].classList.remove('pacmanRight')
        gridSquare[pacIndex].classList.remove('pacmanDown')
        gridSquare[pacIndex].classList.remove('pacmanLeft')
        switch (e.keyCode) {
            case 37: // left arrow
                left.classList.add('active')
                setTimeout(() => left.classList.remove('active'), 100)
                if (gridSquare[pacIndex - 1].classList.contains('wall')) pacIndex += 0
                else if (pacIndex % width !== 0) pacIndex -= 1
                gridSquare[pacIndex].classList.add('pacmanLeft')
                break
            case 38: // upp arrow
                up.classList.add('active')
                setTimeout(() => up.classList.remove('active'), 100)
                if (gridSquare[pacIndex - width].classList.contains('wall')) pacIndex += 0
                else if (pacIndex - width >= 0) pacIndex -= width
                gridSquare[pacIndex].classList.add('pacmanUp')
                break
            case 39: // right arrow
                right.classList.add('active')
                setTimeout(() => right.classList.remove('active'), 100)
                if (gridSquare[pacIndex + 1].classList.contains('wall')) pacIndex += 0
                else if (pacIndex % width < width - 1) pacIndex += 1
                gridSquare[pacIndex].classList.add('pacmanRight')
                break
            case 40: //down arrow
                down.classList.add('active')
                setTimeout(() => down.classList.remove('active'), 100)
                if (gridSquare[pacIndex + width].classList.contains('wall')) pacIndex += 0
                else if (pacIndex + width < width * width) pacIndex += width
                gridSquare[pacIndex].classList.add('pacmanDown')
                break
        }
        // colliding with food -----------------------
        if (gridSquare[pacIndex].classList.contains('food')) {
            gridSquare[pacIndex].classList.remove('food')
            scoreNumber = scoreNumber + 10
            score.innerHTML = scoreNumber
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


    function preventDefultScroll(e) {
        if ([32, 37, 38, 39, 40, 16].indexOf(e.keyCode) > -1) {
            e.preventDefault()
        }
    }

    function startGame() {
        pacSoundId = setInterval(pacSound, 650)
        countUpid = setInterval(countUp, 1000)
    }

    function countUp() {
        time = time + 1
        timer.innerHTML = time
    }

})