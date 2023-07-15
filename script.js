// Game Constants
let direction = { x: 0, y: 0 }
const foodSound = new Audio('music/food.mp3')
const gameOverSound = new Audio('music/gameover.mp3')
const moveSound = new Audio('music/move.mp3')
let score = 0;
let speed = 2;
let lastPaint_time = 0;
let snakeArray = [{ x: 9, y: 9 }]
let food = {
    x: Math.floor(Math.random() * (17 - 2 + 1)) + 2,
    y: Math.floor(Math.random() * (17 - 2 + 1)) + 2
}
// Game Functions
const main = (current_time) => {
    window.requestAnimationFrame(main)
    if ((current_time - lastPaint_time) / 1000 < 1 / speed) {
        return;
    }
    lastPaint_time = current_time
    gameEngine()
}
function isCollide(snake) {
    // if you collide with yourself
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }
    // Collision with wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true
    }
}
const gameEngine = () => {
    //Part 1: Updating the Snake Length & food
    if (isCollide(snakeArray)) {
        gameOverSound.play()
        direction = { x: 0, y: 0 }
        alert("Game Over. Press any key to play again")
        snakeArray = [{ x: 13, y: 15 }]
        scoreBox.innerHTML = `Socre : 0`
        speed = 2;
    }
    // If snake have eaten the food, increment the score and regenerate the food
    if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
        foodSound.play()
        score++;
        speed++;
        scoreBox.innerHTML = `Score : ${score}`
        if (score > hiScoreVal) {
            hiScoreVal = score
            localStorage.setItem('hiscore', JSON.stringify(hiScoreVal))
            highScoreBox.innerHTML = "HiScore : " + hiScoreVal
        }
        snakeArray.unshift(
            {
                x: snakeArray[0].x + direction.x,
                y: snakeArray[0].y + direction.y
            }
        )
        food = {
            x: Math.floor(Math.random() * (17 - 2 + 1)) + 2,
            y: Math.floor(Math.random() * (17 - 2 + 1)) + 2
        }
    }
    // Moving the Snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] }
    }
    snakeArray[0].x = snakeArray[0].x + direction.x
    snakeArray[0].y = snakeArray[0].y + direction.y
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
// Login for High Score by using local Storage
let hiscore = localStorage.getItem("hiscore")
if (hiscore === null) {
    hiScoreVal = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiScoreVal))
}
else {
    hiScoreVal = JSON.parse(hiscore)
    highScoreBox.innerHTML = `HiScore : ${hiscore}`
}
window.requestAnimationFrame(main)
window.addEventListener('keydown', (e) => {
    direction = { x: 0, y: 1 }  // Start the Game
    moveSound.play()
    switch (e.key) {
        case "ArrowUp":
            direction.x = 0;
            direction.y = -1;
            break;
        case "ArrowDown":
            direction.x = 0;
            direction.y = 1;
            break;
        case "ArrowLeft":
            direction.x = -1;
            direction.y = 0;
            break;
        case "ArrowRight":
            direction.x = 1;
            direction.y = 0;
            break;
        default:
            break;
    }
})

