const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const boxSize = 20;
let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let dx = boxSize, dy = 0;
let score = 0;
let speed = 150;
let gameInterval;

function startGame() {
    document.getElementById('playButton').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    document.getElementById('controls').style.display = 'flex';
    document.getElementById('endScreen').style.display = 'none';
    resetGame();
}

function spawnFood() {
    food.x = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
    food.y = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
}

function update() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || 
        snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 1;  // Score incremented by 1 instead of 10
        document.getElementById('score').textContent = `Score: ${score}`;
        spawnFood();
    } else {
        snake.pop();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#4CAF50" : "#45a049";
        ctx.fillRect(segment.x + 1, segment.y + 1, boxSize - 2, boxSize - 2);
    });

    ctx.fillStyle = "#ff4444";
    ctx.fillRect(food.x + 1, food.y + 1, boxSize - 2, boxSize - 2);
}

function gameLoop() {
    update();
    draw();
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    dx = boxSize;
    dy = 0;
    score = 0;
    speed = 150;
    document.getElementById('score').textContent = "Score: 0";
    spawnFood();
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, speed);
}

function gameOver() {
    document.getElementById('finalScore').textContent = score;
    document.getElementById('endScreen').style.display = 'block';
    document.getElementById('gameContainer').style.display = 'none';
    document.getElementById('controls').style.display = 'none';
    clearInterval(gameInterval);
}

function turnUp() {
    if (dy === 0) { dx = 0; dy = -boxSize; }
}

function turnDown() {
    if (dy === 0) { dx = 0; dy = boxSize; }
}

function turnLeft() {
    if (dx === 0) { dx = -boxSize; dy = 0; }
}

function turnRight() {
    if (dx === 0) { dx = boxSize; dy = 0; }
}

window.addEventListener('keydown', (e) => {
    if (e.key === "ArrowUp") turnUp();
    if (e.key === "ArrowDown") turnDown();
    if (e.key === "ArrowLeft") turnLeft();
    if (e.key === "ArrowRight") turnRight();
});

spawnFood();