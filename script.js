// Game Constants

let direction = { x: 0, y: 0 }
const foodSound = new Audio('music/food.mp3')
const gameOverSound = new Audio('music/gameover.mp3')
const moveSound = new Audio('music/move.mp3')
const musicSound = new Audio('music/music.mp3')
let score = 0;
let speed = 2;
let lastPaint_time = 0;
let snakeArray = [{ x: 13, y: 15 }]

// let food = { x: 6, y: 16 }
// min = 2 and max = 17
// var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
let food = {
    x: Math.floor(Math.random() * (17 - 2 + 1)) + 2,
    y: Math.floor(Math.random() * (17 - 2 + 1)) + 2
}

// Game Functions

const main = (current_time) => {
    window.requestAnimationFrame(main)
    // console.log(current_time);
    if ((current_time - lastPaint_time) / 1000 < 1 / speed) {
        return;
    }
    lastPaint_time = current_time
    gameEngine()
}

function isCollide(sarr) {
    return false;
}

const gameEngine = () => {
    //Part 1: Updating the Snake Array & food
    if (isCollide(snakeArray)) {
        gameOverSound.play()
        musicSound.pause()
        direction = { x: 0, y: 0 }
        alert("Game Over. Press any key to play again")
        snakeArray = [{ x: 13, y: 15 }]
        musicSound.play()
        score = 0;
    }

    // If snake have eaten the food, increment the score and regenerate the food
    if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
        snakeArray.unshift({ x: snakeArray[0].x + direction.x, y: snakeArray[0].y + direction.y })
        food = {
            x: Math.floor(Math.random() * (17 - 2 + 1)) + 2,
            y: Math.floor(Math.random() * (17 - 2 + 1)) + 2
        }
    }

    // Part 2: Display the Snake & Food
    // Display the Snake
    board.innerHTML = ""
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index == 0) {
            snakeElement.classList.add('head')
        }
        else {
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })
    // Display the Food
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}

// Main Logic

window.requestAnimationFrame(main)
window.addEventListener('keydown', (e) => {
    direction = { x: 0, y: 1 }  // Start the Game
    moveSound.play()
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp Key Pressed");
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown Key Pressed");
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft Key Pressed");
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight Key Pressed");
            direction.x = 1;
            direction.y = 0;
            break;
        default:
            break;
    }
})

