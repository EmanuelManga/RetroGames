import "../public/css/style.css";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const $score = document.querySelector("span");

let score = 0;

$score.innerHTML = score;

const BLOCK_SIZE = 5;
const BOARD_WIDTH = 100;
const BOARD_HEIGHT = 100;

const CONFIG = {
    SPEED_FOOD: 150,
    SPEED_SNAKE: 1000,
};

// const SPEED_SNAKE = 250;
// const SPEED_FOOD = 150;

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

context.scale(BLOCK_SIZE, BLOCK_SIZE);

const board = Array.from({ length: BOARD_HEIGHT }, () => new Array(BOARD_WIDTH).fill(0));

// const board = [
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];

const movement = {
    eje: "x",
    operation: "+",
};

const food = {
    position: { x: Math.floor(Math.random() * BOARD_WIDTH), y: Math.floor(Math.random() * BOARD_HEIGHT) },
    shape: [[1]],
    color: "red",
};

const snake = {
    bodyParts: [
        { position: { x: BOARD_WIDTH / 2, y: BOARD_HEIGHT / 2 }, shape: [[1]] },
        // { position: { x: BOARD_WIDTH / 2 - 1, y: BOARD_HEIGHT / 2 }, shape: [[1]] },
        // { position: { x: BOARD_WIDTH / 2 - 2, y: BOARD_HEIGHT / 2 }, shape: [[1]] },
        // { position: { x: BOARD_WIDTH / 2 - 3, y: BOARD_HEIGHT / 2 }, shape: [[1]] },
        // { position: { x: BOARD_WIDTH / 2 - 4, y: BOARD_HEIGHT / 2 }, shape: [[1]] },
    ],
    color: "blue",
};
const snakeOld = {
    position: { x: BOARD_WIDTH / 2, y: BOARD_HEIGHT / 2 },
    shape: [[1]],
    color: "green",
};

// function update() {
//     draw();
//     window.requestAnimationFrame(update);
// }

let dropCounter = 0;
let dropCounterFood = 0;
let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;
    dropCounterFood += deltaTime;

    if (dropCounterFood > CONFIG.SPEED_FOOD) {
        pulsateFood(food.color);
        dropCounterFood = 0;
    }

    if (dropCounter > CONFIG.SPEED_SNAKE) {
        moveSnake(movement.eje, movement.operation);
        if (checkCollision(snake.bodyParts[0])) {
            moveSnake(movement.eje, movement.operation);
        }
        dropCounter = 0;
    }

    draw();
    window.requestAnimationFrame(update);
}

function draw() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    food.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                context.fillStyle = food.color;
                context.fillRect(food.position.x + x, food.position.y + y, 1, 1);
            }
        });
    });

    snake.bodyParts.forEach((bodyPart) => {
        bodyPart.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    context.fillStyle = snake.color;
                    context.fillRect(bodyPart.position.x + x, bodyPart.position.y + y, 1, 1);
                }
            });
        });
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        moveSnake("x", "-");
    }
    if (event.key === "ArrowRight") {
        moveSnake("x", "+");
    }
    if (event.key === "ArrowDown") {
        moveSnake("y", "+");
    }
    if (event.key === "ArrowUp") {
        moveSnake("y", "-");
    }
});

function moveSnake(eje, operation) {
    setMovement(eje, operation);
    let aux = 0;
    let last_x;
    let last_y;
    let actual_x;
    let actual_y;
    // let hasFood = false;
    snake.bodyParts.forEach((bodyPart) => {
        if (aux == 0) {
            last_x = bodyPart.position.x;
            last_y = bodyPart.position.y;
            operation == "+" ? (bodyPart.position[eje] += 1) : (bodyPart.position[eje] -= 1);
            checkCollisionFood(bodyPart) ? growSnake() : null;
            if (eatItself(bodyPart) && snake.bodyParts.length > 2) {
                endGame();
            }
        } else {
            actual_x = last_x;
            actual_y = last_y;

            last_x = bodyPart.position.x;
            last_y = bodyPart.position.y;

            bodyPart.position.x = actual_x;
            bodyPart.position.y = actual_y;
        }
        aux++;
        if (checkCollision(bodyPart)) {
            invertSide(bodyPart);
        }
    });
}

function checkCollision(bodyPart) {
    return board[bodyPart.position.y]?.[bodyPart.position.x] != 0;
}

function checkCollisionFood(bodyPart) {
    return food.position.x == bodyPart.position.x && food.position.y == bodyPart.position.y;
}

function eatItself(bodyPart) {
    for (let i = 1; i < snake.bodyParts.length; i++) {
        let bodyPartIndex = snake.bodyParts[i];
        if (bodyPartIndex.position.x == bodyPart.position.x && bodyPartIndex.position.y == bodyPart.position.y) {
            return true;
        }
    }
    return false;
}

function invertSide(bodyPart) {
    if (bodyPart.position.x <= 0) {
        bodyPart.position.x = BOARD_WIDTH - 1;
    } else if (bodyPart.position.x == BOARD_WIDTH) {
        bodyPart.position.x = 0;
    }

    if (bodyPart.position.y < 0) {
        bodyPart.position.y = BOARD_HEIGHT - 1;
    } else if (bodyPart.position.y == BOARD_HEIGHT) {
        bodyPart.position.y = 0;
    }
}

function setMovement(eje, operation) {
    movement.eje = eje;
    movement.operation = operation;
}

function pulsateFood(color) {
    if (color == "red") {
        food.color = "black";
    } else {
        food.color = "red";
    }
}

function growSnake() {
    const lastBodyPart = snake.bodyParts[snake.bodyParts.length - 1];
    const newBodyPart = {
        position: { x: lastBodyPart.position.x, y: lastBodyPart.position.y },
        shape: [[1]],
    };

    snake.bodyParts.push(newBodyPart);

    score += 10;

    $score.innerHTML = score;

    switch (score) {
        case 100:
            CONFIG.SPEED_SNAKE = 800;
            break;
        case 200:
            CONFIG.SPEED_SNAKE = 500;
            break;
        case 300:
            CONFIG.SPEED_SNAKE = 100;
            break;

        default:
            break;
    }

    newFood();
}

function newFood() {
    food.position = { x: Math.floor(Math.random() * BOARD_WIDTH), y: Math.floor(Math.random() * BOARD_HEIGHT) };
}

function endGame() {
    window.alert("Game Over");
    score = 0;
    CONFIG.SPEED_SNAKE = 1000;
    snake.bodyParts = [{ position: { x: BOARD_WIDTH / 2, y: BOARD_HEIGHT / 2 }, shape: [[1]] }];
}

update();
