import "../public/css/style.css";
import { BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH, canvas, context, $score } from "./global.js";
import { PIECES } from "./pieces.js";
// 3. Board

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

context.scale(BLOCK_SIZE, BLOCK_SIZE);

let score = 0;

$score.innerHTML = score;

const board = Array.from({ length: BOARD_HEIGHT }, () => new Array(BOARD_WIDTH).fill(0));

const piece = {
    position: { x: 5, y: 0 },
    shape: [
        [1, 1],
        [1, 1],
    ],
    color: "red",
};

let dropCounter = 0;
let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    dropCounter += deltaTime;

    if (dropCounter > 1000) {
        piece.position.y++;
        if (checkCollision()) {
            piece.position.y--;
            solidify();
            removeRow();
        }
        dropCounter = 0;
    }

    draw();
    window.requestAnimationFrame(update);
}

function draw() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);

    board.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value == 1) {
                context.fillStyle = "yellow";
                context.fillRect(x, y, 1, 1);
            }
        });
    });

    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                context.fillStyle = piece.color;
                context.fillRect(piece.position.x + x, piece.position.y + y, 1, 1);
            }
        });
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        piece.position.x--;
        if (checkCollision()) {
            piece.position.x++;
        }
    }
    if (event.key === "ArrowRight") {
        piece.position.x++;
        if (checkCollision()) {
            piece.position.x--;
        }
    }
    if (event.key === "ArrowDown") {
        piece.position.y++;
        if (checkCollision()) {
            piece.position.y--;
            solidify();
            removeRow();
        }
    }
    if (event.key === "ArrowUp") {
        piece.shape = rotate(piece.shape);
        if (checkCollision()) {
            if (piece.position.x > BOARD_WIDTH / 2) {
                piece.position.x--;
            } else {
                piece.position.x++;
            }
        }
    }
});

function rotate(shape) {
    const newShape = [];
    for (let y = 0; y < shape[0].length; y++) {
        const newRow = [];
        for (let x = 0; x < shape.length; x++) {
            newRow.push(shape[x][y]);
        }
        newShape.push(newRow.reverse());
    }
    return newShape;
}

function checkCollision() {
    return piece.shape.find((row, y) => {
        return row.find((value, x) => {
            if (value) {
                return value != 0 && board[piece.position.y + y]?.[piece.position.x + x] != 0;
            }
        });
    });
}

function solidify() {
    piece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value == 1) {
                board[piece.position.y + y][piece.position.x + x] = 1;
            }
        });
    });

    //
    // piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)];
    const newPiece = PIECES[Math.floor(Math.random() * PIECES.length)];
    piece.shape = newPiece.shape;
    piece.color = newPiece.color;
    //
    piece.position.x = 5;
    piece.position.y = 0;

    if (checkCollision()) {
        window.alert("Game Over");
        board.forEach((row) => row.fill(0));
    }
}

function removeRow() {
    const rowToRemove = [];

    board.forEach((row, y) => {
        if (row.every((value) => value == 1)) {
            rowToRemove.push(y);
        }
    });

    rowToRemove.forEach((y) => {
        board.splice(y, 1);
        board.unshift(new Array(BOARD_WIDTH).fill(0));
        score += 10;
    });

    $score.innerHTML = score;
}

update();
