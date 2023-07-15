// Game Constants

const direction = { x: 0, y: 0 }
const foodSound = new Audio('music/food.mp3')
const gameOverSound = new Audio('music/gameover.mp3')
const moveSound = new Audio('music/move.mp3')
const musicSound = new Audio('music/music.mp3')
let speed = 2;
let lastPaint_time = 0;
let snakeArray = [
    {
        x: 13,
        y: 15
    }
]

let food = { x: 6, y: 16 }

// Game Functions

const main = (current_time) => {
    window.requestAnimationFrame(main)
    console.log(current_time);
    if ((current_time - lastPaint_time) / 1000 < 1 / speed) {
        return;
    }
    lastPaint_time = current_time
    gameEngine()
}

const gameEngine = () => {
    //Part 1: Updating the Snake Array & food

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

